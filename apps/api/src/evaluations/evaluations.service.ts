import { Injectable, NotFoundException } from '@nestjs/common';
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
      relations: { supplier: true, items: { criterion: true } },
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

    this.configService.sortConfig(config);
    const result = this.scoring.calculate(config, dto.items);

    const evaluation = this.evaluations.create({
      supplierId: supplier.id,
      configId: config.id,
      period: dto.period,
      evaluator: dto.evaluator,
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

    const saved = await this.evaluations.save(evaluation);
    supplier.latestScore = saved.totalScore;
    supplier.latestRankCode = saved.rankCode;
    supplier.latestRankName = saved.rankName;
    supplier.latestRankColor = saved.rankColor;
    supplier.lastEvaluatedAt = saved.createdAt;
    await this.suppliers.save(supplier);
    return this.findOne(saved.id);
  }
}
