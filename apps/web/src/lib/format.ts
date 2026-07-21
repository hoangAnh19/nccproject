import { SupplierRank } from './types';

export function formatScore(score: number | string | null | undefined) {
  if (score === null || score === undefined || score === '') {
    return '--';
  }

  return Number(score).toFixed(1).replace('.0', '');
}

export function formatDate(date: string | null | undefined) {
  if (!date) {
    return '--';
  }

  return new Intl.DateTimeFormat('vi-VN').format(new Date(date));
}

export function rankLabel(rank: SupplierRank) {
  const labels: Record<SupplierRank, string> = {
    A: 'Loại A',
    B: 'Loại B',
    C: 'Loại C',
    D: 'Loại D',
    UNRATED: 'Chưa đánh giá',
  };

  return labels[rank];
}

export function rankDescription(rank: SupplierRank) {
  const labels: Record<SupplierRank, string> = {
    A: 'Nhà cung cấp chiến lược',
    B: 'Nhà cung cấp đủ điều kiện',
    C: 'Cần cải thiện',
    D: 'Yếu kém',
    UNRATED: 'Chưa đánh giá',
  };

  return labels[rank];
}
