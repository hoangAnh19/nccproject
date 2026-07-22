import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScoringService } from '../common/scoring.service';
import {
  EvaluationConfig,
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

  findAll() {
    return this.configs.find({
      relations: configRelations,
      order: { isDefault: 'DESC', createdAt: 'DESC' },
    });
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
    if (config.isDefault) await this.clearDefault();
    const saved = await this.configs.save(config);
    return this.findOne(saved.id);
  }

  async update(id: string, dto: UpsertEvaluationConfigDto) {
    const config = await this.findOne(id);
    await this.groups.delete({ configId: id });
    await this.scoreOptions.delete({ configId: id });
    await this.rankRules.delete({ configId: id });
    this.hydrateConfig(config, dto);
    this.scoring.validateConfig(config);
    if (config.isDefault) await this.clearDefault(id);
    const saved = await this.configs.save(config);
    return this.findOne(saved.id);
  }

  async remove(id: string) {
    const config = await this.findOne(id);
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
        criteria: groupDto.criteria.map((criterionDto) =>
          Object.assign(new EvaluationCriterion(), criterionDto),
        ),
      }),
    );
    config.scoreOptions = dto.scoreOptions.map((optionDto) => this.scoreOptions.create(optionDto));
    config.rankRules = dto.rankRules.map((rankDto) => this.rankRules.create(rankDto));
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
