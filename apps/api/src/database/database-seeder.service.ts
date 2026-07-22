import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScoringService } from '../common/scoring.service';
import { defaultEvaluationConfig } from './default-evaluation-config';
import {
  Evaluation,
  EvaluationConfig,
  EvaluationCriterion,
  EvaluationGroup,
  EvaluationItem,
  RankRule,
  ScoreOption,
  Supplier,
} from './entities';

@Injectable()
export class DatabaseSeederService implements OnApplicationBootstrap {
  private readonly logger = new Logger(DatabaseSeederService.name);

  constructor(
    @InjectRepository(Supplier) private readonly suppliers: Repository<Supplier>,
    @InjectRepository(EvaluationConfig) private readonly configs: Repository<EvaluationConfig>,
    @InjectRepository(Evaluation) private readonly evaluations: Repository<Evaluation>,
    private readonly scoring: ScoringService,
  ) {}

  async onApplicationBootstrap() {
    const supplierCount = await this.suppliers.count();
    if (supplierCount > 0) return;

    const config = await this.seedConfig();
    const suppliers = await this.seedSuppliers();
    await this.seedEvaluations(config, suppliers.slice(0, 4));
    this.logger.log('Seeded initial supplier evaluation data from workbook criteria');
  }

  private async seedConfig() {
    const config = this.configs.create({
      name: defaultEvaluationConfig.name,
      description: defaultEvaluationConfig.description,
      isActive: true,
      isDefault: true,
      useCriterionWeights: defaultEvaluationConfig.useCriterionWeights,
      evaluationPeriod: defaultEvaluationConfig.evaluationPeriod,
      scaleMin: defaultEvaluationConfig.scaleMin,
      scaleMax: defaultEvaluationConfig.scaleMax,
      scoreOptions: defaultEvaluationConfig.scoreOptions.map((item) =>
        Object.assign(new ScoreOption(), item),
      ),
      rankRules: defaultEvaluationConfig.rankRules.map((item) =>
        Object.assign(new RankRule(), item),
      ),
      groups: defaultEvaluationConfig.groups.map((group, groupIndex) =>
        Object.assign(new EvaluationGroup(), {
          code: group.code,
          name: group.name,
          weight: group.weight,
          sortOrder: groupIndex + 1,
          isActive: true,
          criteria: group.criteria.map((criterion, criterionIndex) =>
            Object.assign(new EvaluationCriterion(), {
              code: criterion.code,
              name: criterion.name,
              description: criterion.description,
              layer1Code: criterion.layer1Code,
              layer1Name: criterion.layer1Name,
              applicableType: criterion.applicableType,
              reference: criterion.reference,
              source: criterion.source,
              weight: criterion.weight,
              sortOrder: criterionIndex + 1,
              isActive: true,
            }),
          ),
        }),
      ),
    });
    this.scoring.validateConfig(config);
    return this.configs.save(config);
  }

  private seedSuppliers() {
    return this.suppliers.save([
      {
        code: 'NCC-IT-001',
        name: 'Công ty Cổ phần Công nghệ Sao Việt',
        taxCode: '0101234567',
        type: 'Phần mềm',
        contactName: 'Nguyễn Minh Anh',
        email: 'minhanh@saoviet.vn',
        phone: '0901000001',
        address: 'Hà Nội',
      },
      {
        code: 'NCC-IT-002',
        name: 'Công ty TNHH Hạ tầng Số Đông Dương',
        taxCode: '0312345678',
        type: 'Hạ tầng',
        contactName: 'Trần Quốc Bảo',
        email: 'bao@dongduong.vn',
        phone: '0901000002',
        address: 'TP. Hồ Chí Minh',
      },
      {
        code: 'NCC-IT-003',
        name: 'Công ty Dịch vụ Cloud Mekong',
        taxCode: '1802345678',
        type: 'Cloud',
        contactName: 'Lê Hoàng Nam',
        email: 'nam@cloudmekong.vn',
        phone: '0901000003',
        address: 'Cần Thơ',
      },
      {
        code: 'NCC-IT-004',
        name: 'Công ty An toàn Thông tin Bách Khoa',
        taxCode: '0109876543',
        type: 'Bảo mật',
        contactName: 'Phạm Thu Hà',
        email: 'ha@bksec.vn',
        phone: '0901000004',
        address: 'Hà Nội',
      },
      {
        code: 'NCC-IT-005',
        name: 'Công ty Giải pháp ERP Đại Nam',
        taxCode: '0401111222',
        type: 'Phần mềm',
        contactName: 'Vũ Thành Trung',
        email: 'trung@erp-dainam.vn',
        phone: '0901000005',
        address: 'Đà Nẵng',
      },
      {
        code: 'NCC-IT-006',
        name: 'Công ty Tích hợp Hệ thống Nam Á',
        taxCode: '0302222333',
        type: 'Tích hợp hệ thống',
        contactName: 'Đặng Mai Linh',
        email: 'linh@namasystem.vn',
        phone: '0901000006',
        address: 'TP. Hồ Chí Minh',
      },
      {
        code: 'NCC-IT-007',
        name: 'Công ty Dịch vụ CNTT Hưng Thịnh',
        taxCode: '0103333444',
        type: 'Dịch vụ vận hành',
        contactName: 'Hoàng Gia Khánh',
        email: 'khanh@hungthinh-it.vn',
        phone: '0901000007',
        address: 'Hà Nội',
      },
      {
        code: 'NCC-IT-008',
        name: 'Công ty Nền tảng Dữ liệu Việt',
        taxCode: '0314444555',
        type: 'Dữ liệu',
        contactName: 'Đỗ Ngọc Phương',
        email: 'phuong@dataviet.vn',
        phone: '0901000008',
        address: 'TP. Hồ Chí Minh',
      },
    ]);
  }

  private async seedEvaluations(config: EvaluationConfig, suppliers: Supplier[]) {
    const fullConfig = await this.configs.findOneOrFail({
      where: { id: config.id },
      relations: { groups: { criteria: true }, scoreOptions: true, rankRules: true },
    });

    const criteria = fullConfig.groups
      .sort((left, right) => left.sortOrder - right.sortOrder)
      .flatMap((group) => group.criteria.sort((left, right) => left.sortOrder - right.sortOrder));

    for (let supplierIndex = 0; supplierIndex < suppliers.length; supplierIndex += 1) {
      const supplier = suppliers[supplierIndex];
      const items = criteria.map((criterion, criterionIndex) => ({
        criterionId: criterion.id,
        score: this.sampleScore(supplierIndex, criterionIndex),
        note: 'Dữ liệu đánh giá khởi tạo theo bộ tiêu chí 17062026',
      }));
      const result = this.scoring.calculate(fullConfig, items);
      const evaluation = await this.evaluations.save(
        this.evaluations.create({
          supplierId: supplier.id,
          configId: fullConfig.id,
          period: fullConfig.evaluationPeriod,
          evaluator: 'Ban đánh giá CNTT',
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
        }),
      );
      supplier.latestScore = evaluation.totalScore;
      supplier.latestRankCode = evaluation.rankCode;
      supplier.latestRankName = evaluation.rankName;
      supplier.latestRankColor = evaluation.rankColor;
      supplier.lastEvaluatedAt = evaluation.createdAt;
      await this.suppliers.save(supplier);
    }
  }

  private sampleScore(supplierIndex: number, criterionIndex: number) {
    if (supplierIndex === 0) return 4 + ((criterionIndex + 1) % 2);
    if (supplierIndex === 1) return 3 + ((criterionIndex + 1) % 3);
    if (supplierIndex === 2) return 2 + ((criterionIndex + 1) % 3);
    return 1 + ((criterionIndex + 1) % 3);
  }
}
