import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('suppliers')
export class Supplier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({ unique: true })
  taxCode: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  contactName?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ type: 'text', nullable: true })
  note?: string;

  @Column({ type: 'double', nullable: true })
  latestScore?: number | null;

  @Column({ type: 'varchar', length: 40, nullable: true })
  latestRankCode?: string | null;

  @Column({ type: 'varchar', length: 120, nullable: true })
  latestRankName?: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  latestRankColor?: string | null;

  @Column({ type: 'datetime', nullable: true })
  lastEvaluatedAt?: Date | null;

  @OneToMany(() => Evaluation, (evaluation) => evaluation.supplier)
  evaluations: Evaluation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('evaluation_configs')
export class EvaluationConfig {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isDefault: boolean;

  @Column({ default: true })
  useCriterionWeights: boolean;

  @Column({ default: '2026' })
  evaluationPeriod: string;

  @Column({ type: 'int', default: 1 })
  scaleMin: number;

  @Column({ type: 'int', default: 5 })
  scaleMax: number;

  @OneToMany(() => EvaluationGroup, (group) => group.config, {
    cascade: true,
  })
  groups: EvaluationGroup[];

  @OneToMany(() => ScoreOption, (option) => option.config, {
    cascade: true,
  })
  scoreOptions: ScoreOption[];

  @OneToMany(() => RankRule, (rank) => rank.config, {
    cascade: true,
  })
  rankRules: RankRule[];

  @OneToMany(() => Evaluation, (evaluation) => evaluation.config)
  evaluations: Evaluation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('evaluation_groups')
export class EvaluationGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column({ type: 'double' })
  weight: number;

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => EvaluationConfig, (config) => config.groups, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'configId' })
  config: EvaluationConfig;

  @Column()
  configId: string;

  @OneToMany(() => EvaluationCriterion, (criterion) => criterion.group, {
    cascade: true,
  })
  criteria: EvaluationCriterion[];
}

@Entity('evaluation_criteria')
export class EvaluationCriterion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'double', default: 0 })
  weight: number;

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => EvaluationGroup, (group) => group.criteria, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'groupId' })
  group: EvaluationGroup;

  @Column()
  groupId: string;

  @OneToMany(() => EvaluationItem, (item) => item.criterion)
  items: EvaluationItem[];
}

@Entity('score_options')
export class ScoreOption {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  value: number;

  @Column()
  label: string;

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => EvaluationConfig, (config) => config.scoreOptions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'configId' })
  config: EvaluationConfig;

  @Column()
  configId: string;
}

@Entity('rank_rules')
export class RankRule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column({ type: 'double' })
  minScore: number;

  @Column({ type: 'double' })
  maxScore: number;

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => EvaluationConfig, (config) => config.rankRules, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'configId' })
  config: EvaluationConfig;

  @Column()
  configId: string;
}

@Entity('evaluations')
export class Evaluation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  period: string;

  @Column()
  evaluator: string;

  @Column({ type: 'double' })
  totalScore: number;

  @Column()
  rankCode: string;

  @Column()
  rankName: string;

  @Column()
  rankColor: string;

  @Column({ type: 'json' })
  groupScores: Array<{ groupId: string; code: string; name: string; score: number; weight: number }>;

  @ManyToOne(() => Supplier, (supplier) => supplier.evaluations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'supplierId' })
  supplier: Supplier;

  @Column()
  supplierId: string;

  @ManyToOne(() => EvaluationConfig, (config) => config.evaluations)
  @JoinColumn({ name: 'configId' })
  config: EvaluationConfig;

  @Column()
  configId: string;

  @OneToMany(() => EvaluationItem, (item) => item.evaluation, {
    cascade: true,
  })
  items: EvaluationItem[];

  @CreateDateColumn()
  createdAt: Date;
}

@Entity('evaluation_items')
export class EvaluationItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  score: number;

  @Column({ type: 'text', nullable: true })
  note?: string;

  @Column({ type: 'double' })
  normalizedScore: number;

  @ManyToOne(() => Evaluation, (evaluation) => evaluation.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'evaluationId' })
  evaluation: Evaluation;

  @Column()
  evaluationId: string;

  @ManyToOne(() => EvaluationCriterion, (criterion) => criterion.items)
  @JoinColumn({ name: 'criterionId' })
  criterion: EvaluationCriterion;

  @Column()
  criterionId: string;
}
