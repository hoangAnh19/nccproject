import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Evaluation } from '../evaluations/evaluation.entity';

export enum SupplierRank {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  UNRATED = 'UNRATED',
}

@Entity({ name: 'suppliers' })
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 180 })
  name: string;

  @Column({ type: 'varchar', length: 40, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 40, nullable: true })
  taxCode: string | null;

  @Column('simple-array')
  types: string[];

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  latestScore: number | null;

  @Column({ type: 'enum', enum: SupplierRank, default: SupplierRank.UNRATED })
  rank: SupplierRank;

  @Column({ type: 'date', nullable: true })
  lastEvaluatedAt: string | null;

  @Column({ type: 'text', nullable: true })
  note: string | null;

  @OneToMany(() => Evaluation, (evaluation) => evaluation.supplier)
  evaluations: Evaluation[];
}
