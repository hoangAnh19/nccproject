import { Download } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { RankBadge } from '@/components/RankBadge';
import { formatScore } from '@/lib/format';
import { getEvaluations, getReportSummary } from '@/lib/api';

export default async function ReportsPage() {
  const [summary, evaluations] = await Promise.all([getReportSummary(), getEvaluations()]);
  const maxRankCount = Math.max(...Object.values(summary.rankCounts), 1);

  return (
    <>
      <PageHeader
        title="Báo cáo đánh giá nhà cung cấp"
        description="Tổng hợp kết quả và so sánh giữa các kỳ đánh giá."
        action={{
          href: '/reports',
          label: 'Xuất Excel',
          icon: <Download size={18} />,
        }}
      />

      <section className="mb-6 grid gap-6 xl:grid-cols-2">
        <div className="panel min-h-[380px] p-6">
          <h2 className="mb-6 text-[18px] font-bold text-slate-800">Phân bố phân loại kỳ hiện tại</h2>
          <div className="flex h-[280px] items-end gap-6">
            {Object.entries(summary.rankCounts).map(([rank, count]) => (
              <div key={rank} className="flex h-full flex-1 flex-col justify-end gap-3">
                <div
                  className="rounded-t-2 bg-blue"
                  style={{
                    height: `${Math.max((count / maxRankCount) * 100, 8)}%`,
                    backgroundColor:
                      rank === 'A' ? '#16A34A' : rank === 'B' ? '#2563EB' : rank === 'C' ? '#F59E0B' : '#DC2626',
                  }}
                />
                <div className="text-center">
                  <div className="font-bold">{count}</div>
                  <div className="text-sm text-slate-500">Loại {rank}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel min-h-[380px] p-6">
          <h2 className="mb-6 text-[18px] font-bold text-slate-800">So sánh điểm TB qua các kỳ đánh giá</h2>
          <div className="space-y-5">
            {summary.scoreTrend.map((item) => (
              <div key={item.period}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-semibold">{item.period}</span>
                  <span className="font-bold text-blue">{item.score}</span>
                </div>
                <div className="h-3 rounded-full bg-slate-100">
                  <div className="h-3 rounded-full bg-blue" style={{ width: `${item.score}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-4 bg-[#f8fafc] p-5">
            <p className="text-sm text-slate-500">Điểm trung bình hiện tại</p>
            <div className="text-[32px] font-extrabold text-blue">{summary.averageScore} / 100</div>
          </div>
        </div>
      </section>

      <section className="panel mb-6 p-6">
        <div className="grid gap-3 text-[14px] lg:grid-cols-2">
          <div>
            <p className="mb-1 h-5 font-semibold">Nhà cung cấp</p>
            <input className="field" placeholder="Tìm theo tên nhà cung cấp hoặc mã số thuế" />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <p className="mb-1 h-5 font-semibold">Kỳ đánh giá</p>
              <select className="field">
                <option>Tất cả</option>
                <option>Quý I/2026</option>
                <option>Quý II/2026</option>
                <option>Quý III/2026</option>
                <option>Quý IV/2026</option>
              </select>
            </div>
            <div>
              <p className="mb-1 h-5 font-semibold">Loại hình</p>
              <select className="field">
                <option>Tất cả</option>
                <option>Hàng hóa</option>
                <option>Tư vấn</option>
                <option>Phi tư vấn</option>
              </select>
            </div>
            <div>
              <p className="mb-1 h-5" />
              <button type="button" className="h-10 w-full rounded-2 bg-blue px-5 font-bold text-white">
                Áp dụng
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="panel p-6">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nhà cung cấp</th>
                <th className="text-center">A (25%)</th>
                <th className="text-center">B (30%)</th>
                <th className="text-center">C (30%)</th>
                <th className="text-center">D (15%)</th>
                <th className="text-center">Tổng</th>
                <th className="text-center">Xếp hạng</th>
              </tr>
            </thead>
            <tbody>
              {evaluations.map((evaluation) => (
                <tr key={evaluation.id}>
                  <td>
                    <div className="name">{evaluation.supplier.name}</div>
                  </td>
                  <td className="text-center">{formatScore(evaluation.scoreA)}</td>
                  <td className="text-center">{formatScore(evaluation.scoreB)}</td>
                  <td className="text-center">{formatScore(evaluation.scoreC)}</td>
                  <td className="text-center">{formatScore(evaluation.scoreD)}</td>
                  <td className="text-center">
                    <span className="font-bold">{formatScore(evaluation.totalScore)}</span>
                  </td>
                  <td className="text-center">
                    <RankBadge rank={evaluation.rank} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
