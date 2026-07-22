export type Supplier = {
  id: string;
  code: string;
  name: string;
  taxCode: string;
  type: string;
  contactName?: string;
  email?: string;
  phone?: string;
  address?: string;
  note?: string;
  latestScore?: number | null;
  latestRankCode?: string | null;
  latestRankName?: string | null;
  latestRankColor?: string | null;
  lastEvaluatedAt?: string | null;
  evaluations?: Evaluation[];
};

export type ScoreOption = {
  id: string;
  value: number;
  label: string;
  sortOrder: number;
  isActive: boolean;
};

export type Criterion = {
  id: string;
  code: string;
  name: string;
  description?: string;
  layer1Code?: string;
  layer1Name?: string;
  applicableType?: string;
  reference?: string;
  source?: string;
  weight: number;
  sortOrder?: number;
  isActive?: boolean;
};

export type EvaluationGroup = {
  id: string;
  code: string;
  name: string;
  weight: number;
  sortOrder?: number;
  isActive?: boolean;
  criteria: Criterion[];
};

export type RankRule = {
  id: string;
  code: string;
  name: string;
  color: string;
  minScore: number;
  maxScore: number;
  sortOrder: number;
  isActive: boolean;
};

export type EvaluationConfig = {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  isDefault: boolean;
  useCriterionWeights: boolean;
  evaluationPeriod: string;
  scaleMin: number;
  scaleMax: number;
  groups: EvaluationGroup[];
  scoreOptions: ScoreOption[];
  rankRules: RankRule[];
};

export type EvaluationItem = {
  id: string;
  score: number;
  note?: string;
  normalizedScore: number;
  criterion?: Criterion;
  criterionId: string;
};

export type Evaluation = {
  id: string;
  period: string;
  evaluator: string;
  totalScore: number;
  rankCode: string;
  rankName: string;
  rankColor: string;
  createdAt: string;
  supplier?: Supplier;
  groupScores: Array<{ groupId: string; code: string; name: string; score: number; weight: number }>;
  items?: EvaluationItem[];
};

export type Summary = {
  totalSuppliers: number;
  evaluatedSuppliers: number;
  unevaluatedSuppliers: number;
  averageScore: number;
  rankDistribution: Array<{ rankCode: string; rankName: string; rankColor: string; count: number }>;
  scoreTrend: Array<{ period: string; averageScore: number }>;
};
