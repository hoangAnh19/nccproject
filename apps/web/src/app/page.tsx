import Image from 'next/image';
import Link from 'next/link';
import { Clock, FileText, Plus, TriangleAlert, Users } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { RankBadge } from '@/components/RankBadge';
import { StatCard } from '@/components/StatCard';
import { formatDate, formatScore, rankDescription } from '@/lib/format';
import { getEvaluations, getReportSummary } from '@/lib/api';

const shortcuts = [
  {
    title: 'Hướng dẫn',
    description:
      'Tài liệu hướng dẫn sử dụng bộ tiêu chí, thang điểm 1-5 và quy trình phân loại nhà cung cấp.',
    href: '/guideline',
    cta: 'Đọc hướng dẫn',
    icon: '/assets/images/icon-1.png',
  },
  {
    title: 'Thực hiện đánh giá',
    description:
      'Chọn nhà thầu và tiến hành chấm điểm theo 4 nhóm tiêu chí A, B, C, D với minh chứng đính kèm.',
    href: '/suppliers',
    cta: 'Bắt đầu đánh giá',
    icon: '/assets/images/icon-2.png',
  },
  {
    title: 'Báo cáo',
    description:
      'Xem tổng hợp kết quả, so sánh các kỳ đánh giá và xuất báo cáo phục vụ phê duyệt.',
    href: '/reports',
    cta: 'Xem báo cáo',
    icon: '/assets/images/icon-3.png',
  },
];

export default async function DashboardPage() {
  const [summary, evaluations] = await Promise.all([getReportSummary(), getEvaluations()]);
  const recentEvaluations = evaluations.slice(0, 7);

  return (
    <>
      <PageHeader
        title="Bảng tổng quan quản trị"
        description="Thống kê hoạt động đánh giá chất lượng nhà cung cấp CNTT"
        action={{
          href: '/suppliers/new',
          label: 'Đánh giá mới',
          icon: <Plus size={18} />,
        }}
      />

      <section className="mb-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={<Users size={24} />} value={summary.totalSuppliers} label="Nhà cung cấp" />
        <StatCard
          icon={<FileText size={24} />}
          value={summary.evaluatedSuppliers}
          label="Đã đánh giá kỳ này"
        />
        <StatCard
          icon={<Clock size={24} />}
          value={summary.pendingEvaluations}
          label="Đang chờ đánh giá"
        />
        <StatCard
          icon={<TriangleAlert size={24} />}
          value={summary.strategicSuppliers}
          label="NCC loại A chiến lược"
        />
      </section>

      <section className="mb-10 grid gap-6 lg:grid-cols-3">
        {shortcuts.map((shortcut) => (
          <article key={shortcut.href} className="panel p-6">
            <Image src={shortcut.icon} alt="" width={42} height={42} className="mb-4" />
            <h2 className="mb-4 text-[20px] font-bold">
              <Link href={shortcut.href}>{shortcut.title}</Link>
            </h2>
            <p className="mb-4 text-[14px] text-[#64748b]">{shortcut.description}</p>
            <Link href={shortcut.href} className="inline-flex items-center gap-2 font-bold text-blue">
              {shortcut.cta}
              <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </section>

      <section className="panel p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-[20px] font-bold">Danh sách đánh giá gần đây</h2>
          <Link href="/suppliers" className="border-b border-solid border-blue text-[14px] font-bold text-blue">
            Xem tất cả
          </Link>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nhà cung cấp</th>
                <th>Kỳ đánh giá</th>
                <th>Ngày thực hiện</th>
                <th>Tổng điểm đạt</th>
                <th>Phân loại NCC</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {recentEvaluations.map((evaluation) => (
                <tr key={evaluation.id}>
                  <td>
                    <div className="name">{evaluation.supplier.name}</div>
                    <span className="list-badge">{evaluation.supplier.types.join(', ')}</span>
                  </td>
                  <td>{evaluation.period}</td>
                  <td>{formatDate(evaluation.evaluatedAt)}</td>
                  <td>
                    <span className="font-bold">{formatScore(evaluation.totalScore)} / 100</span>
                  </td>
                  <td>
                    <div className="flex flex-col items-start gap-1">
                      <RankBadge rank={evaluation.rank} />
                      <span className="text-xs text-slate-500">{rankDescription(evaluation.rank)}</span>
                    </div>
                  </td>
                  <td>
                    <Link href="/reports/sample" className="more-single">
                      Chi tiết
                    </Link>
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
