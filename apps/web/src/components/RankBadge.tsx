import { rankLabel } from '@/lib/format';
import { SupplierRank } from '@/lib/types';

const rankClasses: Record<SupplierRank, string> = {
  A: 'bg-[#16A34A] text-white',
  B: 'bg-[#2563EB] text-white',
  C: 'bg-[#F59E0B] text-white',
  D: 'bg-[#DC2626] text-white',
  UNRATED: 'bg-slate-100 text-slate-600',
};

export function RankBadge({ rank }: { rank: SupplierRank }) {
  return (
    <span className={`inline-flex rounded-1 px-2 py-1 text-[14px] font-bold ${rankClasses[rank]}`}>
      {rankLabel(rank)}
    </span>
  );
}
