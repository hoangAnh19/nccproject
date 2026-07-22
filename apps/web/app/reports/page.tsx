'use client';

import { useEffect, useState } from 'react';
import { apiFetch, formatScore } from '@/lib/api';
import type { Supplier, Summary } from '@/lib/types';
import { EmptyState, ErrorState, LoadingState } from '@/components/state';

export default function ReportsPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [topSuppliers, setTopSuppliers] = useState<Supplier[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiFetch<Summary>('/reports/summary'),
      apiFetch<Supplier[]>('/reports/top-suppliers?limit=10'),
    ])
      .then(([summaryData, topData]) => {
        setSummary(summaryData);
        setTopSuppliers(topData);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingState label="Đang tải báo cáo" />;
  if (error) return <ErrorState message={error} />;
  if (!summary) return <EmptyState message="Chưa có dữ liệu báo cáo" />;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-ink">Báo cáo</h1>
        <p className="mt-1 text-sm text-slate-600">Số liệu được tổng hợp trực tiếp từ bảng suppliers và evaluations.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-4">
        <Metric label="Tổng NCC" value={summary.totalSuppliers} />
        <Metric label="Đã đánh giá" value={summary.evaluatedSuppliers} />
        <Metric label="Chưa đánh giá" value={summary.unevaluatedSuppliers} />
        <Metric label="Điểm TB" value={formatScore(summary.averageScore)} />
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-md border border-line bg-white p-5">
          <h2 className="mb-4 font-semibold text-ink">Rank distribution</h2>
          <div className="space-y-3">
            {summary.rankDistribution.map((rank) => (
              <div key={rank.rankCode} className="flex items-center justify-between rounded border border-line px-3 py-2 text-sm">
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: rank.rankColor }} />
                  {rank.rankCode} - {rank.rankName}
                </span>
                <span className="font-semibold">{rank.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-line bg-white p-5">
          <h2 className="mb-4 font-semibold text-ink">Top suppliers</h2>
          <div className="space-y-2">
            {topSuppliers.map((supplier, index) => (
              <div key={supplier.id} className="grid grid-cols-[40px_1fr_80px] items-center gap-3 rounded border border-line px-3 py-2 text-sm">
                <span className="text-slate-500">#{index + 1}</span>
                <span className="font-medium">{supplier.name}</span>
                <span className="text-right font-semibold">{formatScore(supplier.latestScore)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md border border-line bg-white p-4">
      <div className="text-sm text-slate-600">{label}</div>
      <div className="mt-2 text-2xl font-bold text-ink">{value}</div>
    </div>
  );
}
