import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier, SupplierRank } from '../suppliers/supplier.entity';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { Evaluation } from './evaluation.entity';

const scoreWeights = {
  scoreA: 0.25,
  scoreB: 0.3,
  scoreC: 0.3,
  scoreD: 0.15,
} as const;

@Injectable()
export class EvaluationsService {
  constructor(
    @InjectRepository(Evaluation)
    private readonly evaluations: Repository<Evaluation>,
    @InjectRepository(Supplier)
    private readonly suppliers: Repository<Supplier>,
  ) {}

  findAll() {
    return this.evaluations.find({
      order: {
        totalScore: 'DESC',
      },
    });
  }

  async create(dto: CreateEvaluationDto) {
    const supplier = await this.suppliers.findOne({ where: { id: dto.supplierId } });

    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }

    const totalScore = Number(
      (
        dto.scoreA * scoreWeights.scoreA +
        dto.scoreB * scoreWeights.scoreB +
        dto.scoreC * scoreWeights.scoreC +
        dto.scoreD * scoreWeights.scoreD
      ).toFixed(2),
    );
    const rank = this.getRank(totalScore);
    const evaluatedAt = dto.evaluatedAt ?? new Date().toISOString().slice(0, 10);

    const evaluation = await this.evaluations.save(
      this.evaluations.create({
        supplier,
        period: dto.period ?? 'Kỳ 1 - Năm 2026',
        evaluatedAt,
        evaluator: dto.evaluator ?? 'Ban Công nghệ Thông tin',
        scoreA: dto.scoreA,
        scoreB: dto.scoreB,
        scoreC: dto.scoreC,
        scoreD: dto.scoreD,
        totalScore,
        rank,
      }),
    );

    await this.suppliers.update(supplier.id, {
      latestScore: totalScore,
      rank,
      lastEvaluatedAt: evaluatedAt,
    });

    return evaluation;
  }

  async getSummary() {
    const [evaluations, suppliers] = await Promise.all([
      this.findAll(),
      this.suppliers.find({
        order: {
          latestScore: 'DESC',
          id: 'ASC',
        },
      }),
    ]);
    const evaluatedSuppliers = suppliers.filter((supplier) => supplier.rank !== SupplierRank.UNRATED);
    const rankCounts = {
      A: evaluatedSuppliers.filter((supplier) => supplier.rank === SupplierRank.A).length,
      B: evaluatedSuppliers.filter((supplier) => supplier.rank === SupplierRank.B).length,
      C: evaluatedSuppliers.filter((supplier) => supplier.rank === SupplierRank.C).length,
      D: evaluatedSuppliers.filter((supplier) => supplier.rank === SupplierRank.D).length,
    };
    const averageScore =
      evaluatedSuppliers.length === 0
        ? 0
        : evaluatedSuppliers.reduce((total, supplier) => total + Number(supplier.latestScore), 0) /
          evaluatedSuppliers.length;

    return {
      totalSuppliers: suppliers.length,
      evaluatedSuppliers: evaluatedSuppliers.length,
      pendingEvaluations: suppliers.length - evaluatedSuppliers.length,
      strategicSuppliers: rankCounts.A,
      averageScore: Number(averageScore.toFixed(1)),
      rankCounts,
      scoreTrend: [
        { period: 'Quý I/2026', score: 82.5 },
        { period: 'Quý II/2026', score: 85 },
        { period: 'Quý III/2026', score: 86.5 },
        { period: 'Quý IV/2026', score: 90.1 },
      ],
    };
  }

  private getRank(totalScore: number) {
    if (totalScore >= 85) {
      return SupplierRank.A;
    }

    if (totalScore >= 70) {
      return SupplierRank.B;
    }

    if (totalScore >= 55) {
      return SupplierRank.C;
    }

    return SupplierRank.D;
  }
}
