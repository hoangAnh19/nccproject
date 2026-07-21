import { Evaluation, ReportSummary, Supplier } from './types';

export const sampleSuppliers: Supplier[] = [
  {
    id: 1,
    name: 'Tập đoàn Công nghệ FPT',
    code: 'FPT-JSC',
    taxCode: '0101248141',
    types: ['Hàng hóa', 'TV', 'PTV'],
    latestScore: 89.2,
    rank: 'A',
    lastEvaluatedAt: '2026-06-20',
    note: 'Nhà cung cấp chiến lược trong mảng giải pháp CNTT.',
  },
  {
    id: 2,
    name: 'Công ty CP Giải pháp FPT IS',
    code: 'FIS',
    taxCode: '0104128565',
    types: ['TV', 'PTV'],
    latestScore: 76.2,
    rank: 'B',
    lastEvaluatedAt: '2026-06-16',
    note: 'Đủ điều kiện tiếp tục hợp tác và đánh giá lại hàng năm.',
  },
  {
    id: 3,
    name: 'Công ty TNHH CMC Technology',
    code: 'CMC-TECH',
    taxCode: '0100244112',
    types: ['Hàng hóa', 'PTV'],
    latestScore: 61,
    rank: 'C',
    lastEvaluatedAt: '2026-06-16',
    note: 'Cần cải thiện năng lực vận hành và hồ sơ minh chứng.',
  },
  {
    id: 4,
    name: 'Công ty CP Công nghệ MISA',
    code: 'MISA-JS',
    taxCode: '0101243150',
    types: ['Hàng hóa', 'TV', 'PTV'],
    latestScore: 48.7,
    rank: 'D',
    lastEvaluatedAt: '2026-06-16',
    note: 'Cần xem xét kỹ trước khi phê duyệt hợp đồng mới.',
  },
  {
    id: 5,
    name: 'McKinsey & Company Việt Nam',
    code: 'MCK-VN',
    taxCode: '0314567890',
    types: ['TV'],
    latestScore: null,
    rank: 'UNRATED',
    lastEvaluatedAt: null,
    note: 'Chưa đánh giá trong kỳ hiện tại.',
  },
];

export const sampleEvaluations: Evaluation[] = sampleSuppliers
  .filter((supplier) => supplier.latestScore !== null)
  .map((supplier, index) => ({
    id: index + 1,
    supplier,
    period: 'Kỳ 1 - Năm 2026',
    evaluatedAt: supplier.lastEvaluatedAt ?? '2026-06-20',
    evaluator: 'Ban Công nghệ Thông tin',
    scoreA: [88, 82, 65, 52][index],
    scoreB: [89.2, 78, 62, 44][index],
    scoreC: [90, 76, 59, 49][index],
    scoreD: [86, 68, 58, 50][index],
    totalScore: supplier.latestScore ?? 0,
    rank: supplier.rank,
  }));

export const sampleSummary: ReportSummary = {
  totalSuppliers: 128,
  evaluatedSuppliers: 86,
  pendingEvaluations: 4,
  strategicSuppliers: 19,
  averageScore: 85,
  rankCounts: {
    A: 15,
    B: 22,
    C: 10,
    D: 5,
  },
  scoreTrend: [
    { period: 'Quý I/2026', score: 82.5 },
    { period: 'Quý II/2026', score: 85 },
    { period: 'Quý III/2026', score: 86.5 },
    { period: 'Quý IV/2026', score: 90.1 },
  ],
};
