import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evaluation } from '../evaluations/evaluation.entity';
import { Supplier, SupplierRank } from '../suppliers/supplier.entity';

const seedSuppliers = [
  {
    name: 'Tập đoàn Công nghệ FPT',
    code: 'FPT-JSC',
    taxCode: '0101248141',
    types: ['Hàng hóa', 'TV', 'PTV'],
    latestScore: 89.2,
    rank: SupplierRank.A,
    lastEvaluatedAt: '2026-06-20',
    note: 'Nhà cung cấp chiến lược trong mảng giải pháp CNTT.',
  },
  {
    name: 'Công ty CP Giải pháp FPT IS',
    code: 'FIS',
    taxCode: '0104128565',
    types: ['TV', 'PTV'],
    latestScore: 76.2,
    rank: SupplierRank.B,
    lastEvaluatedAt: '2026-06-16',
    note: 'Đủ điều kiện tiếp tục hợp tác và đánh giá lại hàng năm.',
  },
  {
    name: 'Công ty TNHH CMC Technology',
    code: 'CMC-TECH',
    taxCode: '0100244112',
    types: ['Hàng hóa', 'PTV'],
    latestScore: 61,
    rank: SupplierRank.C,
    lastEvaluatedAt: '2026-06-16',
    note: 'Cần cải thiện năng lực vận hành và hồ sơ minh chứng.',
  },
  {
    name: 'Công ty CP Công nghệ MISA',
    code: 'MISA-JS',
    taxCode: '0101243150',
    types: ['Hàng hóa', 'TV', 'PTV'],
    latestScore: 48.7,
    rank: SupplierRank.D,
    lastEvaluatedAt: '2026-06-16',
    note: 'Cần xem xét kỹ trước khi phê duyệt hợp đồng mới.',
  },
  {
    name: 'McKinsey & Company Việt Nam',
    code: 'MCK-VN',
    taxCode: '0314567890',
    types: ['TV'],
    latestScore: null,
    rank: SupplierRank.UNRATED,
    lastEvaluatedAt: null,
    note: 'Chưa đánh giá trong kỳ hiện tại.',
  },
];

@Injectable()
export class DatabaseSeederService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Supplier)
    private readonly suppliers: Repository<Supplier>,
    @InjectRepository(Evaluation)
    private readonly evaluations: Repository<Evaluation>,
  ) {}

  async onApplicationBootstrap() {
    const existing = await this.suppliers.count();
    if (existing > 0) {
      return;
    }

    const savedSuppliers = await this.suppliers.save(seedSuppliers);
    const evaluated = savedSuppliers.filter((supplier) => supplier.latestScore !== null);

    await this.evaluations.save(
      evaluated.map((supplier, index) => ({
        supplier,
        period: 'Kỳ 1 - Năm 2026',
        evaluatedAt: supplier.lastEvaluatedAt ?? '2026-06-20',
        evaluator: 'Ban Công nghệ Thông tin',
        scoreA: [88, 82, 65, 52][index] ?? 80,
        scoreB: [89.2, 78, 62, 44][index] ?? 80,
        scoreC: [90, 76, 59, 49][index] ?? 80,
        scoreD: [86, 68, 58, 50][index] ?? 80,
        totalScore: supplier.latestScore ?? 0,
        rank: supplier.rank,
      })),
    );
  }
}
