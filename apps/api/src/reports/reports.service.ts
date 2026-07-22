import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Evaluation, Supplier } from '../database/entities';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Supplier)
    private readonly suppliers: Repository<Supplier>,
    @InjectRepository(Evaluation)
    private readonly evaluations: Repository<Evaluation>,
  ) {}

  async summary() {
    const [totalSuppliers, evaluatedSuppliers, evaluations] = await Promise.all([
      this.suppliers.count(),
      this.suppliers.count({ where: { lastEvaluatedAt: Not(IsNull()) } }),
      this.evaluations.find({ order: { createdAt: 'ASC' } }),
    ]);

    const averageScore =
      evaluations.length === 0
        ? 0
        : Math.round((evaluations.reduce((sum, evaluation) => sum + evaluation.totalScore, 0) / evaluations.length) * 100) /
          100;

    return {
      totalSuppliers,
      evaluatedSuppliers,
      unevaluatedSuppliers: totalSuppliers - evaluatedSuppliers,
      averageScore,
      rankDistribution: await this.rankDistribution(),
      scoreTrend: this.scoreTrend(evaluations),
    };
  }

  async rankDistribution() {
    const rows = await this.suppliers
      .createQueryBuilder('supplier')
      .select('supplier.latestRankCode', 'rankCode')
      .addSelect('supplier.latestRankName', 'rankName')
      .addSelect('supplier.latestRankColor', 'rankColor')
      .addSelect('COUNT(*)', 'count')
      .where('supplier.latestRankCode IS NOT NULL')
      .groupBy('supplier.latestRankCode')
      .addGroupBy('supplier.latestRankName')
      .addGroupBy('supplier.latestRankColor')
      .orderBy('supplier.latestRankCode', 'ASC')
      .getRawMany();

    return rows.map((row) => ({
      rankCode: row.rankCode,
      rankName: row.rankName,
      rankColor: row.rankColor,
      count: Number(row.count),
    }));
  }

  topSuppliers(limit = 5) {
    return this.suppliers.find({
      where: { latestScore: Not(IsNull()) },
      order: { latestScore: 'DESC' },
      take: limit,
    });
  }

  private scoreTrend(evaluations: Evaluation[]) {
    const map = new Map<string, { period: string; total: number; count: number }>();
    evaluations.forEach((evaluation) => {
      const current = map.get(evaluation.period) ?? { period: evaluation.period, total: 0, count: 0 };
      current.total += evaluation.totalScore;
      current.count += 1;
      map.set(evaluation.period, current);
    });

    return [...map.values()].map((item) => ({
      period: item.period,
      averageScore: Math.round((item.total / item.count) * 100) / 100,
    }));
  }
}
