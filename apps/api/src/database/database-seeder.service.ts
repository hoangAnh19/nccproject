import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScoringService } from '../common/scoring.service';
import { defaultEvaluationConfig } from './default-evaluation-config';
import { EvaluationConfig, EvaluationCriterion, EvaluationGroup, RankRule, ScoreOption } from './entities';

@Injectable()
export class DatabaseSeederService implements OnApplicationBootstrap {
  private readonly logger = new Logger(DatabaseSeederService.name);
  constructor(
    @InjectRepository(EvaluationConfig) private readonly configs: Repository<EvaluationConfig>,
    private readonly scoring: ScoringService,
  ) {}

  async onApplicationBootstrap() {
    const runner = this.configs.manager.connection.createQueryRunner();
    await runner.connect();
    try {
      const rows = await runner.query("SELECT GET_LOCK('ncc-final-criteria-seed', 30) AS acquired");
      if (Number(rows[0].acquired) !== 1) throw new Error('Không lấy được khóa khởi tạo bộ tiêu chí');
      await runner.startTransaction();
      if (!(await runner.manager.existsBy(EvaluationConfig, { version: defaultEvaluationConfig.version }))) {
        const raw = JSON.parse(JSON.stringify(defaultEvaluationConfig));
        const config = Object.assign(new EvaluationConfig(), raw, {
          isActive: true, isDefault: true,
          scoreOptions: raw.scoreOptions.map((item: object) => Object.assign(new ScoreOption(), item)),
          rankRules: raw.rankRules.map((item: object) => Object.assign(new RankRule(), item, { isActive: true })),
          groups: raw.groups.map((group: { criteria: object[] }, index: number) => Object.assign(new EvaluationGroup(), group, {
            sortOrder: index + 1, isActive: true,
            criteria: group.criteria.map((criterion, order) => Object.assign(new EvaluationCriterion(), criterion, { sortOrder: order + 1, isActive: true })),
          })),
        });
        this.scoring.validateConfig(config);
        await runner.manager.update(EvaluationConfig, { isDefault: true }, { isDefault: false });
        await runner.manager.save(EvaluationConfig, config);
        this.logger.log('Đã thêm bộ tiêu chí 14/09/2026; cần cấu hình và xác nhận trọng số trên web.');
      }
      await runner.commitTransaction();
    } catch (error) {
      if (runner.isTransactionActive) await runner.rollbackTransaction();
      throw error;
    } finally {
      await runner.query("SELECT RELEASE_LOCK('ncc-final-criteria-seed')");
      await runner.release();
    }
  }
}
