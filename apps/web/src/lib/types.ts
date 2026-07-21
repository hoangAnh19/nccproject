export type SupplierRank = 'A' | 'B' | 'C' | 'D' | 'UNRATED';

export type Supplier = {
  id: number;
  name: string;
  code: string;
  taxCode: string | null;
  types: string[];
  latestScore: number | string | null;
  rank: SupplierRank;
  lastEvaluatedAt: string | null;
  note?: string | null;
};

export type Evaluation = {
  id: number;
  supplier: Supplier;
  period: string;
  evaluatedAt: string;
  evaluator: string;
  scoreA: number | string;
  scoreB: number | string;
  scoreC: number | string;
  scoreD: number | string;
  totalScore: number | string;
  rank: SupplierRank;
};

export type ReportSummary = {
  totalSuppliers: number;
  evaluatedSuppliers: number;
  pendingEvaluations: number;
  strategicSuppliers: number;
  averageScore: number;
  rankCounts: Record<'A' | 'B' | 'C' | 'D', number>;
  scoreTrend: Array<{ period: string; score: number }>;
};
