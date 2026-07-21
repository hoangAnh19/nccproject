import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Supplier, SupplierRank } from '../suppliers/supplier.entity';

@Entity({ name: 'evaluations' })
export class Evaluation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Supplier, (supplier) => supplier.evaluations, {
    eager: true,
    onDelete: 'CASCADE',
  })
  supplier: Supplier;

  @Column({ type: 'varchar', length: 80 })
  period: string;

  @Column({ type: 'date' })
  evaluatedAt: string;

  @Column({ type: 'varchar', length: 120 })
  evaluator: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  scoreA: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  scoreB: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  scoreC: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  scoreD: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  totalScore: number;

  @Column({ type: 'enum', enum: SupplierRank })
  rank: SupplierRank;
}
