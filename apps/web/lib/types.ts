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
  layer1Weight?: number;
  scope?: string;
  applicableFields?: string[];
  allowedScores?: number[];
  guidance?: string;
  sourceSheet?: string;
  sourceRow?: number;
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
  version?: string;
  scoringMethod?: string;
  weightsConfirmed?: boolean;
  procurementFields?: string[];
  partners?: Array<{ field: string; name: string; tier: number }>;
  sourceFile?: string;
  sourceHash?: string;
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
  score: number | null;
  note?: string;
  normalizedScore: number;
  criterion?: Criterion;
  criterionId: string;
};

export type Evaluation = {
  procurementField?: string;
  procurementTypes?: string[];
  configSnapshot?: EvaluationConfig;
  contracts?: Array<{ code: string; name: string; evaluator: string; procurementType: string; items: EvaluationItem[]; performanceScore: number; productScore: number | null }>;
  calculationDetails?: { performance: number; supplierEsg: number; productEsg: number | null; effectiveWeight: number; explanation: string };
  id: string;
  supplierId?: string;
  configId?: string;
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
