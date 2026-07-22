import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScoringService } from '../common/scoring.service';
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
    this.logger.log('Seeded initial supplier evaluation data');
  }

  private async seedConfig() {
    const config = this.configs.create({
      name: 'Bộ tiêu chí đánh giá NCC CNTT 2026',
      description: 'Bộ tiêu chí mặc định cho đánh giá định kỳ nhà cung cấp CNTT.',
      isActive: true,
      isDefault: true,
      useCriterionWeights: true,
      evaluationPeriod: '2026-Q2',
      scaleMin: 1,
      scaleMax: 5,
      scoreOptions: [
        { value: 1, label: 'Rất kém', sortOrder: 1, isActive: true },
        { value: 2, label: 'Kém', sortOrder: 2, isActive: true },
        { value: 3, label: 'Đạt', sortOrder: 3, isActive: true },
        { value: 4, label: 'Tốt', sortOrder: 4, isActive: true },
        { value: 5, label: 'Xuất sắc', sortOrder: 5, isActive: true },
      ].map((item) => Object.assign(new ScoreOption(), item)),
      rankRules: [
        { code: 'A', name: 'Xuất sắc', color: '#16a34a', minScore: 85, maxScore: 100, sortOrder: 1, isActive: true },
        { code: 'B', name: 'Tốt', color: '#2563eb', minScore: 70, maxScore: 84.99, sortOrder: 2, isActive: true },
        { code: 'C', name: 'Cần cải thiện', color: '#f59e0b', minScore: 55, maxScore: 69.99, sortOrder: 3, isActive: true },
        { code: 'D', name: 'Không đạt', color: '#dc2626', minScore: 0, maxScore: 54.99, sortOrder: 4, isActive: true },
      ].map((item) => Object.assign(new RankRule(), item)),
      groups: this.buildGroups(),
    });
    this.scoring.validateConfig(config);
    return this.configs.save(config);
  }

  private buildGroups() {
    const groups = [
      {
        code: 'A',
        name: 'Năng lực kỹ thuật',
        weight: 25,
        criteria: [
          ['A1', 'Chất lượng giải pháp', 40],
          ['A2', 'Năng lực đội ngũ kỹ thuật', 35],
          ['A3', 'Khả năng tích hợp và mở rộng', 25],
        ],
      },
      {
        code: 'B',
        name: 'Chất lượng dịch vụ',
        weight: 30,
        criteria: [
          ['B1', 'Tuân thủ SLA', 35],
          ['B2', 'Tốc độ phản hồi sự cố', 30],
          ['B3', 'Chất lượng hỗ trợ người dùng', 20],
          ['B4', 'Quản lý thay đổi', 15],
        ],
      },
      {
        code: 'C',
        name: 'Chi phí và thương mại',
        weight: 30,
        criteria: [
          ['C1', 'Tính cạnh tranh về giá', 35],
          ['C2', 'Minh bạch chi phí', 25],
          ['C3', 'Linh hoạt hợp đồng', 20],
          ['C4', 'Tối ưu tổng chi phí sở hữu', 20],
        ],
      },
      {
        code: 'D',
        name: 'Rủi ro và tuân thủ',
        weight: 15,
        criteria: [
          ['D1', 'An toàn thông tin', 40],
          ['D2', 'Tuân thủ pháp lý và quy định', 35],
          ['D3', 'Khả năng liên tục kinh doanh', 25],
        ],
      },
    ];

    return groups.map((group, groupIndex) =>
      Object.assign(new EvaluationGroup(), {
        code: group.code,
        name: group.name,
        weight: group.weight,
        sortOrder: groupIndex + 1,
        isActive: true,
        criteria: group.criteria.map(([code, name, weight], criterionIndex) =>
          Object.assign(new EvaluationCriterion(), {
            code,
            name,
            weight,
            sortOrder: criterionIndex + 1,
            isActive: true,
          }),
        ),
      }),
    );
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

    const scoreSets = [
      [5, 5, 4, 5, 4, 5, 4, 4, 4, 5, 5, 5, 4, 5],
      [4, 4, 4, 4, 4, 3, 4, 4, 4, 4, 3, 4, 4, 4],
      [3, 3, 4, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3],
      [2, 3, 3, 2, 3, 2, 3, 3, 2, 3, 2, 3, 2, 3],
    ];

    const criteria = fullConfig.groups
      .sort((left, right) => left.sortOrder - right.sortOrder)
      .flatMap((group) => group.criteria.sort((left, right) => left.sortOrder - right.sortOrder));

    for (let index = 0; index < suppliers.length; index += 1) {
      const supplier = suppliers[index];
      const items = criteria.map((criterion, criterionIndex) => ({
        criterionId: criterion.id,
        score: scoreSets[index][criterionIndex],
        note: 'Dữ liệu đánh giá khởi tạo',
      }));
      const result = this.scoring.calculate(fullConfig, items);
      const evaluation = await this.evaluations.save(
        this.evaluations.create({
          supplierId: supplier.id,
          configId: fullConfig.id,
          period: '2026-Q2',
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
}
