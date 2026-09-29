import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScoringService } from '../common/scoring.service';
import {
  Evaluation,
  EvaluationConfig,
  EvaluationItem,
  Supplier,
} from '../database/entities';
import { configRelations, EvaluationConfigsService } from '../evaluation-configs/evaluation-configs.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';

@Injectable()
export class EvaluationsService {
  constructor(
    @InjectRepository(Evaluation)
    private readonly evaluations: Repository<Evaluation>,
    @InjectRepository(EvaluationConfig)
    private readonly configs: Repository<EvaluationConfig>,
    @InjectRepository(Supplier)
    private readonly suppliers: Repository<Supplier>,
    private readonly configService: EvaluationConfigsService,
    private readonly scoring: ScoringService,
  ) {}

  findAll(supplierId?: string) {
    return this.evaluations.find({
      where: supplierId ? { supplierId } : {},
      // Only load supplier name for list view; avoid loading all items/criteria (very slow)
      relations: { supplier: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const evaluation = await this.evaluations.findOne({
      where: { id },
      relations: { supplier: true, config: true, items: { criterion: true } },
    });
    if (!evaluation) throw new NotFoundException('Không tìm thấy phiếu đánh giá');
    return evaluation;
  }

  async create(dto: CreateEvaluationDto) {
    const supplier = await this.suppliers.findOneBy({ id: dto.supplierId });
    if (!supplier) throw new NotFoundException('Không tìm thấy nhà cung cấp');

    const config = dto.configId
      ? await this.configs.findOne({ where: { id: dto.configId }, relations: configRelations })
      : await this.configService.getDefault();
    if (!config) throw new NotFoundException('Không tìm thấy cấu hình đánh giá');
    if (!config.isActive) throw new BadRequestException('Bộ tiêu chí đã ngừng áp dụng');
    if (config.scoringMethod === 'layered' && !config.weightsConfirmed) throw new BadRequestException('Cần xác nhận trọng số trên trang quản trị trước khi chấm chính thức');
    if (config.scoringMethod === 'layered' && !/^\d{4}$/.test(dto.period)) throw new BadRequestException('Kỳ đánh giá phải là năm gồm 4 chữ số');

    this.configService.sortConfig(config);
    const result = this.scoring.calculate(config, dto.items, { procurementField: dto.procurementField ?? '', contracts: dto.contracts ?? [] });

    const evaluation = this.evaluations.create({
      supplierId: supplier.id,
      configId: config.id,
      period: dto.period,
      evaluator: dto.evaluator,
      procurementField: dto.procurementField,
      procurementTypes: [...new Set((dto.contracts ?? []).map(c => c.procurementType))],
      configSnapshot: JSON.parse(JSON.stringify(config)),
      contracts: 'contracts' in result ? result.contracts : undefined,
      calculationDetails: 'calculationDetails' in result ? result.calculationDetails : undefined,
      totalScore: result.totalScore,
      rankCode: result.rank.code,
      rankName: result.rank.name,
      rankColor: result.rank.color,
      groupScores: result.groupScores,
      items: result.itemScores.map((item) =>
        Object.assign(new EvaluationItem(), {
          criterionId: item.criterionId,
          score: item.score,
          note: item.note,
          normalizedScore: item.normalizedScore,
        }),
      ),
    });

    const saved = await this.evaluations.manager.transaction(async manager => {
      // Serialize updates to the supplier's cached latest result.
      await manager.findOneOrFail(Supplier, { where: { id: supplier.id }, lock: { mode: 'pessimistic_write' } });
      const currentConfig = await manager.findOneOrFail(EvaluationConfig, { where: { id: config.id }, lock: { mode: 'pessimistic_read' } });
      if (currentConfig.updatedAt.getTime() !== config.updatedAt.getTime()) throw new BadRequestException('Cấu hình vừa thay đổi, vui lòng tải lại phiếu');
      const saved = await manager.save(Evaluation, evaluation);
    supplier.latestScore = saved.totalScore;
    supplier.latestRankCode = saved.rankCode;
    supplier.latestRankName = saved.rankName;
    supplier.latestRankColor = saved.rankColor;
    supplier.lastEvaluatedAt = saved.createdAt;
      await manager.save(Supplier, supplier);
      return saved;
    });
    return this.findOne(saved.id);
  }

  async preview(dto: CreateEvaluationDto) {
    const config = dto.configId ? await this.configs.findOne({ where: { id: dto.configId }, relations: configRelations }) : await this.configService.getDefault();
    if (!config) throw new NotFoundException('Không tìm thấy cấu hình');
    return this.scoring.calculate(config, dto.items, { procurementField: dto.procurementField ?? '', contracts: dto.contracts ?? [] });
  }
}
