'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Award, BarChart3, CheckCircle2, LineChart, Percent, Users } from 'lucide-react';
import iconGuideline from '@/assets/images/icon-1.png';
import iconEvaluation from '@/assets/images/icon-2.png';
import iconReport from '@/assets/images/icon-3.png';
import { apiFetch, formatScore } from '@/lib/api';
import type { Supplier, Summary } from '@/lib/types';
import { EmptyState, ErrorState, LoadingState } from '@/components/state';

const actionCards = [
  {
    title: 'Hướng dẫn',
    description: 'Tài liệu hướng dẫn sử dụng bộ tiêu chí, thang điểm 1-5 và quy trình phân loại nhà cung cấp.',
    cta: 'Đọc hướng dẫn',
    href: '/guideline',
    icon: iconGuideline,
  },
  {
    title: 'Thực hiện đánh giá',
    description: 'Chọn nhà thầu và tiến hành chấm điểm theo 4 nhóm tiêu chí A, B, C, D với minh chứng đính kèm.',
    cta: 'Bắt đầu đánh giá',
    href: '/evaluations',
    icon: iconEvaluation,
  },
  {
    title: 'Báo cáo',
    description: 'Xem tổng hợp kết quả, so sánh các kỳ đánh giá và xuất báo cáo Excel phục vụ phê duyệt.',
    cta: 'Xem báo cáo',
    href: '/reports',
    icon: iconReport,
  },
];

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
    { label: 'Tổng NCC', value: summary.totalSuppliers, icon: Users, href: '/suppliers' },
    { label: 'Đã đánh giá', value: summary.evaluatedSuppliers, icon: CheckCircle2, href: '/suppliers?status=evaluated' },
    { label: 'Chưa đánh giá', value: summary.unevaluatedSuppliers, icon: Percent, href: '/suppliers?status=unevaluated' },
    { label: 'Điểm trung bình', value: formatScore(summary.averageScore), icon: Award, href: '/suppliers?status=evaluated' },
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
            <Link
              key={card.label}
              href={card.href}
              className="group rounded-md border border-line bg-white p-4 transition hover:border-accent hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 group-hover:text-accent font-medium">{card.label}</span>
                <Icon className="text-accent transition group-hover:scale-110" size={20} />
              </div>
              <div className="mt-3 text-3xl font-bold text-ink">{card.value}</div>
            </Link>
          );
        })}
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-md border border-line bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold text-ink">
              <BarChart3 size={18} />
              Phân bố xếp hạng
            </div>
            <span className="text-xs text-slate-500">Ấn vào xếp hạng để xem danh sách</span>
          </div>
          {summary.rankDistribution.length === 0 ? (
            <EmptyState message="Chưa có nhà cung cấp nào được xếp hạng" />
          ) : (
            <div className="space-y-2">
              {summary.rankDistribution.map((rank) => (
                <Link
                  key={rank.rankCode}
                  href={`/suppliers?rank=${encodeURIComponent(rank.rankCode)}`}
                  className="group block rounded-md border border-transparent p-2.5 transition hover:border-line hover:bg-slate-50"
                >
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="font-medium text-ink group-hover:text-accent">
                      Rank {rank.rankCode} - {rank.rankName}
                    </span>
                    <span className="font-semibold text-slate-700">{rank.count} nhà cung cấp</span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-3 rounded-full transition-all duration-300 group-hover:opacity-90"
                      style={{ width: `${(rank.count / maxRankCount) * 100}%`, backgroundColor: rank.rankColor }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-md border border-line bg-white p-5">
          <div className="mb-4 flex items-center gap-2 font-semibold text-ink">
            <LineChart size={18} />
            So sánh điểm Tb qua các kỳ đánh giá
          </div>
          {summary.scoreTrend.length === 0 ? (
            <EmptyState message="Chưa có dữ liệu xu hướng" />
          ) : (
            <ScoreTrendLineChart data={summary.scoreTrend} />
          )}
        </div>
      </section>



     <section className="grid gap-4 md:grid-cols-3 xl:gap-6">
        {actionCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-md border border-line bg-white p-5 transition hover:border-accent hover:shadow-sm sm:p-6"
          >
            <Image src={card.icon} alt="" className="mb-4 h-12 w-12" />
            <h2 className="text-lg font-bold text-ink transition group-hover:text-accent sm:text-xl">{card.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">{card.description}</p>
            <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink transition group-hover:text-accent">
              {card.cta}
              <svg width="22" height="22" viewBox="0 0 27 26" fill="none" aria-hidden="true" className="transition group-hover:translate-x-1">
                <path
                  d="M20.286 11.297L11.346 2.35702L13.703 0L26.6667 12.9637L13.703 25.9272L11.346 23.5702L20.286 14.6304H0V11.297H20.286Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </Link>
        ))}
      </section>

      <section className="rounded-md border border-line bg-white">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div className="font-semibold text-ink">Nhà cung cấp điểm cao</div>
          <Link href="/suppliers" className="text-xs font-medium text-accent hover:underline">
            Xem tất cả →
          </Link>
        </div>
        {topSuppliers.length === 0 ? (
          <div className="p-5">
            <EmptyState message="Chưa có nhà cung cấp đã đánh giá" />
          </div>
        ) : (
          <div className="divide-y divide-line">
            {topSuppliers.map((supplier) => (
              <Link
                key={supplier.id}
                href={`/suppliers?search=${encodeURIComponent(supplier.code)}&highlight=${supplier.id}`}
                className="grid grid-cols-[1fr_100px_110px] items-center gap-4 px-5 py-3 text-sm transition hover:bg-slate-50"
              >
                <div>
                  <div className="font-semibold text-ink group-hover:text-accent">{supplier.name}</div>
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

function ScoreTrendLineChart({ data }: { data: Summary['scoreTrend'] }) {
  const width = 760;
  const height = 300;
  const padding = { top: 28, right: 34, bottom: 58, left: 52 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const yMin = Math.min(60, Math.floor(Math.min(...data.map((item) => item.averageScore)) / 10) * 10);
  const yMax = Math.max(100, Math.ceil(Math.max(...data.map((item) => item.averageScore)) / 10) * 10);
  const yTicks = Array.from({ length: Math.floor((yMax - yMin) / 10) + 1 }, (_, index) => yMax - index * 10);

  const points = data.map((item, index) => {
    const x = padding.left + (data.length === 1 ? chartWidth / 2 : (index / (data.length - 1)) * chartWidth);
    const y = padding.top + ((yMax - item.averageScore) / (yMax - yMin || 1)) * chartHeight;
    return { ...item, x, y };
  });
  const linePath = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Biểu đồ So sánh điểm Tb qua các kỳ đánh giá" className="min-w-[560px]">
        {yTicks.map((tick) => {
          const y = padding.top + ((yMax - tick) / (yMax - yMin || 1)) * chartHeight;
          return (
            <g key={tick}>
              <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#e2e8f0" strokeWidth="1" />
              <text x={padding.left - 18} y={y + 5} textAnchor="end" className="fill-slate-500 text-[13px]">
                {tick}
              </text>
            </g>
          );
        })}

        <line
          x1={padding.left}
          y1={height - padding.bottom}
          x2={width - padding.right}
          y2={height - padding.bottom}
          stroke="#334155"
          strokeWidth="1.5"
        />
        <path d={linePath} fill="none" stroke="#0f766e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {points.map((point) => (
          <g key={point.period}>
            <circle cx={point.x} cy={point.y} r="7" fill="#0f766e" />
            <text x={point.x} y={point.y - 12} textAnchor="middle" className="fill-ink text-[13px] font-semibold">
              {formatScore(point.averageScore)}
            </text>
            <text x={point.x} y={height - padding.bottom + 30} textAnchor="middle" className="fill-ink text-[13px]">
              {point.period}
            </text>
          </g>
        ))}

        <g transform={`translate(${width / 2 - 42} ${height - 10})`}>
          <line x1="0" y1="0" x2="20" y2="0" stroke="#0f766e" strokeWidth="3" strokeLinecap="round" />
          <circle cx="10" cy="0" r="6" fill="#0f766e" />
          <text x="28" y="5" className="fill-ink text-[13px]">
            Điểm TB
          </text>
        </g>
      </svg>
    </div>
  );
}
