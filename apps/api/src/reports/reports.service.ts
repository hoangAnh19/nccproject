import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Evaluation, Supplier } from '../database/entities';
import { latestEvaluations } from './latest-evaluations';

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

    const latest = await this.suppliers.find({ where: { latestScore: Not(IsNull()) } });
    const averageScore =
      latest.length === 0
        ? 0
        : Math.round((latest.reduce((sum, supplier) => sum + Number(supplier.latestScore), 0) / latest.length) * 100) /
          100;

    return {
      totalSuppliers,
      evaluatedSuppliers,
      unevaluatedSuppliers: totalSuppliers - evaluatedSuppliers,
      averageScore,
      rankDistribution: await this.rankDistribution(),
      scoreTrend: this.scoreTrend(latestEvaluations(evaluations)),
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
      take: Number.isFinite(limit) ? Math.max(1, Math.min(100, Math.floor(limit))) : 5,
    });
  }

  async annual(field?: string, period?: string, year?: string) {
    const evaluations = await this.evaluations.find({
      // Historical imported evaluations have no procurement field. Keep them visible
      // when a field is selected until the source data is classified.
      where: field ? [{ procurementField: field }, { procurementField: IsNull() }] : {},
      relations: { supplier: true }, order: { createdAt: 'DESC' },
    });
    const selected = evaluations.filter((evaluation) => {
      if (period) return evaluation.period === period;
      return !year || evaluation.period === year || evaluation.period.startsWith(`${year}-`);
    });
    // For a yearly view, each supplier appears once with its newest result in that year.
    const items = (year && !period ? latestBySupplier(selected) : latestEvaluations(selected)).sort((a,b) => b.totalScore-a.totalScore);
    return { items, count: items.length, averageScore: items.length ? Math.round(items.reduce((s,e) => s+e.totalScore,0)/items.length*100)/100 : null };
  }

  async periodOptions() {
    const rows = await this.evaluations
      .createQueryBuilder('evaluation')
      .select('DISTINCT evaluation.period', 'period')
      .orderBy('evaluation.period', 'DESC')
      .getRawMany<{ period: string }>();
    const periods = rows.map((row) => row.period).filter(Boolean);
    const years = [...new Set(periods.map((period) => period.match(/^\d{4}/)?.[0]).filter((year): year is string => Boolean(year)))];
    return { years, periods };
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

function latestBySupplier(evaluations: Evaluation[]) {
  const latest = new Map<string, Evaluation>();
  for (const evaluation of [...evaluations].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime() || b.id.localeCompare(a.id))) {
    const key = JSON.stringify([evaluation.supplierId, evaluation.procurementField ?? 'legacy']);
    if (!latest.has(key)) latest.set(key, evaluation);
  }
  return [...latest.values()];
}
