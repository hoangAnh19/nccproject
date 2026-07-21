import Link from 'next/link';
import { Printer } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { formatScore, rankDescription } from '@/lib/format';
import { getEvaluations } from '@/lib/api';

const criteria = [
  { label: 'Uy tín nhà cung cấp', weight: 25, raw: 86, converted: 25 },
  { label: 'Năng lực nhà cung cấp', weight: 30, raw: 100, converted: 30 },
  { label: 'Khả năng thực thi hợp đồng', weight: 30, raw: 100, converted: 30 },
  { label: 'Phát triển bền vững (ESG)', weight: 15, raw: 100, converted: 15 },
];

export default async function ReportDetailPage() {
  const evaluations = await getEvaluations();
  const evaluation = evaluations[0];

  return (
    <>
      <PageHeader title="Nhà cung cấp" description="Thông tin xuất bản chính thức, định dạng chuẩn in ấn tài liệu">
        <div className="flex flex-wrap items-center gap-4">
          <button type="button" className="btn-main">
            <Printer size={16} />
            In báo cáo (PDF)
          </button>
          <Link href="/suppliers" className="btn-secondary">
            Quay lại
          </Link>
        </div>
      </PageHeader>

      <section className="panel mx-auto max-w-[1000px] p-6 md:p-10">
        <div className="mb-6 border-b-[2px] border-solid border-blue pb-6 text-center">
          <div className="mb-1 text-[22px] font-bold uppercase text-blue">
            Bảng tổng hợp đánh giá nhà cung cấp CNTT
          </div>
          <p className="text-[14px]">
            Ngân hàng TMCP Đầu tư và Phát triển Việt Nam (BIDV) - Ban Công nghệ Thông tin
          </p>
        </div>

        <div className="mb-8 grid gap-6 rounded-4 bg-[#f8fafc] p-8 text-blue md:grid-cols-2">
          <InfoRow label="Tên nhà cung cấp" value={evaluation.supplier.name} strong />
          <InfoRow label="Mã nhà cung cấp" value={evaluation.supplier.code} strong />
          <InfoRow label="Loại hình áp dụng" value={evaluation.supplier.types.join(', ')} />
          <InfoRow label="Kỳ đánh giá" value={evaluation.period} />
          <InfoRow label="Ngày đánh giá" value={evaluation.evaluatedAt} />
          <InfoRow label="Người đánh giá" value={evaluation.evaluator} />
        </div>

        <div className="mb-10">
          <div className="mb-4 border-b border-solid border-[#ebebeb] pb-2 font-bold">
            Phân loại & Lộ trình hợp tác chính thức
          </div>
          <div className="grid overflow-hidden rounded-4 md:grid-cols-2">
            <div className="bg-blue p-8 text-white">
              <p className="text-[14px]">Tổng điểm đánh giá</p>
              <div className="py-2 text-[32px] font-extrabold">{formatScore(evaluation.totalScore)} / 100</div>
              <div className="inline-flex rounded-10 bg-white px-6 py-2 text-[18px] font-bold text-blue">
                Loại {evaluation.rank} - {rankDescription(evaluation.rank)}
              </div>
              <div className="pt-4">Nhà cung cấp đủ điều kiện hợp tác dài hạn 3-5 năm. Đánh giá lại định kỳ hàng năm.</div>
            </div>
            <div className="bg-[#f8fafc] p-8">
              <p className="mb-3 font-bold text-blue">Khuyến nghị</p>
              <p className="text-slate-600">
                Duy trì hợp tác, cập nhật hồ sơ minh chứng định kỳ và theo dõi rủi ro vận hành trong các kỳ đánh giá tiếp theo.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-4 border-b border-solid border-[#ebebeb] pb-2 font-bold">Chi tiết điểm từng nhóm</div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="text-center">STT</th>
                  <th className="text-center">Nhóm tiêu chí</th>
                  <th className="text-center">Trọng số (%)</th>
                  <th className="text-center">Điểm thô (0-100)</th>
                  <th className="text-center">Điểm quy đổi</th>
                </tr>
              </thead>
              <tbody>
                {criteria.map((item, index) => (
                  <tr key={item.label}>
                    <td className="text-center font-bold">{index + 1}</td>
                    <td className="text-center">
                      <div className="name">{item.label}</div>
                    </td>
                    <td className="text-center">{item.weight}%</td>
                    <td className="text-center">{formatScore(item.raw)}</td>
                    <td className="text-center font-bold">{item.converted}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={4} className="text-left">
                    <span className="text-[18px] font-bold text-blue">TỔNG ĐIỂM ĐẠT ĐƯỢC (thang 100 điểm):</span>
                  </td>
                  <td className="text-center">
                    <span className="text-[18px] font-bold text-blue">100</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

function InfoRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex gap-4">
      <span className="min-w-[140px] font-semibold">{label}:</span>
      <span className={strong ? 'font-bold text-black' : 'text-black'}>{value}</span>
    </div>
  );
}
