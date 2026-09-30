import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScoringService } from '../common/scoring.service';
import {
  EvaluationConfig,
  Evaluation,
  EvaluationCriterion,
  EvaluationGroup,
  RankRule,
  ScoreOption,
} from '../database/entities';
import { EvaluationConfigsService, configRelations } from '../evaluation-configs/evaluation-configs.service';
import { PreviewScoreDto } from './dto/preview-score.dto';
import { UpsertEvaluationConfigDto } from './dto/upsert-evaluation-config.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(EvaluationConfig)
    private readonly configs: Repository<EvaluationConfig>,
    @InjectRepository(EvaluationGroup)
    private readonly groups: Repository<EvaluationGroup>,
    @InjectRepository(ScoreOption)
    private readonly scoreOptions: Repository<ScoreOption>,
    @InjectRepository(RankRule)
    private readonly rankRules: Repository<RankRule>,
    private readonly scoring: ScoringService,
    private readonly configService: EvaluationConfigsService,
  ) {}

  async findAll() {
    const configs = await this.configs.find({
      relations: configRelations,
      order: { isDefault: 'DESC', createdAt: 'DESC' },
    });
    configs.forEach((config) => this.configService.sortConfig(config));
    return configs;
  }

  async findOne(id: string) {
    const config = await this.configs.findOne({ where: { id }, relations: configRelations });
    if (!config) throw new NotFoundException('Không tìm thấy bộ cấu hình');
    this.configService.sortConfig(config);
    return config;
  }

  async create(dto: UpsertEvaluationConfigDto) {
    const config = this.hydrateConfig(this.configs.create(), dto);
    this.scoring.validateConfig(config);
    const saved = await this.configs.manager.transaction(async manager => {
      if (config.isDefault) await manager.update(EvaluationConfig, { isDefault: true }, { isDefault: false });
      return manager.save(EvaluationConfig, config);
    });
    return this.findOne(saved.id);
  }

  async update(id: string, dto: UpsertEvaluationConfigDto) {
    const config = await this.findOne(id);
    this.hydrateConfig(config, dto);
    this.scoring.validateConfig(config);
    const saved = await this.configs.manager.transaction(async manager => {
      await manager.findOneOrFail(EvaluationConfig, { where: { id }, lock: { mode: 'pessimistic_write' } });
      if (await manager.existsBy(Evaluation, { configId: id })) throw new BadRequestException('Cấu hình đã có phiếu đánh giá. Hãy tạo bản sao để thay đổi, giữ nguyên lịch sử.');
      await manager.delete(EvaluationGroup, { configId: id });
      await manager.delete(ScoreOption, { configId: id });
      await manager.delete(RankRule, { configId: id });
      if (config.isDefault) await manager.update(EvaluationConfig, { isDefault: true }, { isDefault: false });
      return manager.save(EvaluationConfig, config);
    });
    return this.findOne(saved.id);
  }

  async remove(id: string) {
    const config = await this.findOne(id);
    if (config.isDefault || config.version === '2026-09-14' || await this.configs.manager.existsBy(Evaluation, { configId: id })) throw new BadRequestException('Không xóa bộ tiêu chí gốc, mặc định hoặc đã có phiếu đánh giá');
    await this.configs.remove(config);
    return { deleted: true };
  }

  async setDefault(id: string) {
    const config = await this.findOne(id);
    await this.clearDefault(id);
    config.isDefault = true;
    config.isActive = true;
    await this.configs.save(config);
    return this.findOne(id);
  }

  async preview(id: string) {
    const config = await this.findOne(id);
    this.scoring.validateConfig(config);
    return this.configService.toFormSchema(config);
  }

  async previewScore(id: string, dto: PreviewScoreDto) {
    const config = await this.findOne(id);
    return this.scoring.calculate(config, dto.items);
  }

  private hydrateConfig(config: EvaluationConfig, dto: UpsertEvaluationConfigDto) {
    Object.assign(config, {
      version: dto.version,
      scoringMethod: dto.scoringMethod ?? 'legacy',
      weightsConfirmed: dto.weightsConfirmed ?? false,
      procurementFields: dto.procurementFields,
      partners: dto.partners,
      sourceFile: dto.sourceFile,
      sourceHash: dto.sourceHash,
      name: dto.name,
      description: dto.description,
      isActive: dto.isActive,
      isDefault: dto.isDefault,
      useCriterionWeights: dto.useCriterionWeights,
      evaluationPeriod: dto.evaluationPeriod,
      scaleMin: dto.scaleMin,
      scaleMax: dto.scaleMax,
    });
    config.groups = dto.groups.map((groupDto) =>
      this.groups.create({
        ...groupDto,
        id: undefined,
        criteria: groupDto.criteria.map((criterionDto) =>
          Object.assign(new EvaluationCriterion(), criterionDto, { id: undefined }),
        ),
      }),
    );
    config.scoreOptions = dto.scoreOptions.map((optionDto) => this.scoreOptions.create({ ...optionDto, id: undefined }));
    config.rankRules = dto.rankRules.map((rankDto) => this.rankRules.create({ ...rankDto, id: undefined }));
    return config;
  }

  private async clearDefault(exceptId?: string) {
    const defaults = await this.configs.find({ where: { isDefault: true } });
    await Promise.all(
      defaults
        .filter((config) => config.id !== exceptId)
        .map((config) => this.configs.save({ ...config, isDefault: false })),
    );
  }
}
