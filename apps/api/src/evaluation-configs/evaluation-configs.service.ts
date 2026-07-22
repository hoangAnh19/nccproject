import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EvaluationConfig } from '../database/entities';
import { ScoringService } from '../common/scoring.service';

export const configRelations = {
  groups: { criteria: true },
  scoreOptions: true,
  rankRules: true,
};

@Injectable()
export class EvaluationConfigsService {
  constructor(
    @InjectRepository(EvaluationConfig)
    private readonly configs: Repository<EvaluationConfig>,
    private readonly scoring: ScoringService,
  ) {}

  async getDefault() {
    const config = await this.configs.findOne({
      where: { isDefault: true, isActive: true },
      relations: configRelations,
    });
    if (!config) throw new NotFoundException('Chưa có bộ cấu hình mặc định đang bật');
    this.sortConfig(config);
    return config;
  }

  async getDefaultFormSchema() {
    const config = await this.getDefault();
    this.scoring.validateConfig(config);
    return this.toFormSchema(config);
  }

  toFormSchema(config: EvaluationConfig) {
    return {
      id: config.id,
      name: config.name,
      description: config.description,
      evaluationPeriod: config.evaluationPeriod,
      useCriterionWeights: config.useCriterionWeights,
      scaleMin: config.scaleMin,
      scaleMax: config.scaleMax,
      scoreOptions: config.scoreOptions.filter((option) => option.isActive),
      groups: config.groups
        .filter((group) => group.isActive)
        .map((group) => ({
          id: group.id,
          code: group.code,
          name: group.name,
          weight: group.weight,
          criteria: group.criteria
            .filter((criterion) => criterion.isActive)
            .map((criterion) => ({
              id: criterion.id,
              code: criterion.code,
              name: criterion.name,
              description: criterion.description,
              weight: criterion.weight,
            })),
        })),
      rankRules: config.rankRules.filter((rank) => rank.isActive),
    };
  }

  sortConfig(config: EvaluationConfig) {
    config.groups = [...(config.groups ?? [])].sort((left, right) => left.sortOrder - right.sortOrder);
    config.groups.forEach((group) => {
      group.criteria = [...(group.criteria ?? [])].sort((left, right) => left.sortOrder - right.sortOrder);
    });
    config.scoreOptions = [...(config.scoreOptions ?? [])].sort((left, right) => left.sortOrder - right.sortOrder);
    config.rankRules = [...(config.rankRules ?? [])].sort((left, right) => right.minScore - left.minScore);
  }
}
