'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Award, BarChart3, CheckCircle2, LineChart, Percent, Users } from 'lucide-react';
import { apiFetch, formatScore } from '@/lib/api';
import type { Supplier, Summary } from '@/lib/types';
import { EmptyState, ErrorState, LoadingState } from '@/components/state';

export default function DashboardPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [topSuppliers, setTopSuppliers] = useState<Supplier[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiFetch<Summary>('/reports/summary'),
      apiFetch<Supplier[]>('/reports/top-suppliers?limit=5'),
    ])
      .then(([summaryData, topData]) => {
        setSummary(summaryData);
        setTopSuppliers(topData);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingState label="Đang tải dashboard" />;
  if (error) return <ErrorState message={error} />;
  if (!summary) return <EmptyState message="Chưa có dữ liệu dashboard" />;

  const cards = [
    { label: 'Tổng NCC', value: summary.totalSuppliers, icon: Users },
    { label: 'Đã đánh giá', value: summary.evaluatedSuppliers, icon: CheckCircle2 },
    { label: 'Chưa đánh giá', value: summary.unevaluatedSuppliers, icon: Percent },
    { label: 'Điểm trung bình', value: formatScore(summary.averageScore), icon: Award },
  ];
  const maxRankCount = Math.max(...summary.rankDistribution.map((item) => item.count), 1);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-ink">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600">
          Tổng quan chất lượng nhà cung cấp CNTT từ dữ liệu đang lưu trong hệ thống.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-md border border-line bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">{card.label}</span>
                <Icon className="text-accent" size={20} />
              </div>
              <div className="mt-3 text-3xl font-bold text-ink">{card.value}</div>
            </div>
          );
        })}
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-md border border-line bg-white p-5">
          <div className="mb-4 flex items-center gap-2 font-semibold text-ink">
            <BarChart3 size={18} />
            Phân bố xếp hạng
          </div>
          {summary.rankDistribution.length === 0 ? (
            <EmptyState message="Chưa có nhà cung cấp nào được xếp hạng" />
          ) : (
            <div className="space-y-3">
              {summary.rankDistribution.map((rank) => (
                <div key={rank.rankCode}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>
                      {rank.rankCode} - {rank.rankName}
                    </span>
                    <span className="font-semibold">{rank.count}</span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-100">
                    <div
                      className="h-3 rounded-full"
                      style={{ width: `${(rank.count / maxRankCount) * 100}%`, backgroundColor: rank.rankColor }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-md border border-line bg-white p-5">
          <div className="mb-4 flex items-center gap-2 font-semibold text-ink">
            <LineChart size={18} />
            Xu hướng điểm theo kỳ
          </div>
          {summary.scoreTrend.length === 0 ? (
            <EmptyState message="Chưa có dữ liệu xu hướng" />
          ) : (
            <div className="space-y-3">
              {summary.scoreTrend.map((item) => (
                <div key={item.period} className="grid grid-cols-[90px_1fr_64px] items-center gap-3 text-sm">
                  <span className="font-medium">{item.period}</span>
                  <div className="h-3 rounded-full bg-slate-100">
                    <div className="h-3 rounded-full bg-accent" style={{ width: `${item.averageScore}%` }} />
                  </div>
                  <span className="text-right font-semibold">{formatScore(item.averageScore)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="rounded-md border border-line bg-white">
        <div className="border-b border-line px-5 py-4 font-semibold text-ink">Nhà cung cấp điểm cao</div>
        {topSuppliers.length === 0 ? (
          <div className="p-5">
            <EmptyState message="Chưa có nhà cung cấp đã đánh giá" />
          </div>
        ) : (
          <div className="divide-y divide-line">
            {topSuppliers.map((supplier) => (
              <Link
                key={supplier.id}
                href={`/suppliers?search=${encodeURIComponent(supplier.code)}`}
                className="grid grid-cols-[1fr_100px_110px] items-center gap-4 px-5 py-3 text-sm transition hover:bg-slate-50"
              >
                <div>
                  <div className="font-semibold text-ink">{supplier.name}</div>
                  <div className="text-slate-500">
                    {supplier.code} - {supplier.type}
                  </div>
                </div>
                <div className="text-right font-semibold">{formatScore(supplier.latestScore)}</div>
                <div className="text-right">
                  <span
                    className="rounded px-2 py-1 text-xs font-semibold text-white"
                    style={{ backgroundColor: supplier.latestRankColor ?? '#64748b' }}
                  >
                    {supplier.latestRankCode ?? 'N/A'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
