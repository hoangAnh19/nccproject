'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Save, CheckCircle2 } from 'lucide-react';
import { getBrowserApiUrl } from '@/lib/api';
import { Supplier } from '@/lib/types';

type Criterion = {
  code: string;
  title: string;
  description: string;
};

type EvaluationSection = {
  id: string;
  title: string;
  weight: string;
  criteria: Criterion[];
};

type EvaluationGroup = {
  id: 'A' | 'B' | 'C' | 'D';
  title: string;
  subtitle: string;
  weight: number;
  sections: EvaluationSection[];
};

const scoreOptions = [
  { value: 5, label: '5 - Xuất sắc' },
  { value: 4, label: '4 - Tốt' },
  { value: 3, label: '3 - Đạt' },
  { value: 2, label: '2 - Dưới mức' },
  { value: 1, label: '1 - Không đạt' },
];

const evaluationGroups: EvaluationGroup[] = [
  {
    id: 'A',
    title: 'A · Uy tín NCC',
    subtitle: 'Uy tín nhà cung cấp',
    weight: 25,
    sections: [
      {
        id: 'A1',
        title: 'A1 · Tư cách pháp lý & Hồ sơ pháp nhân',
        weight: 'Trọng số 20.8%',
        criteria: [
          {
            code: 'A1.1',
            title: 'Giấy phép đăng ký kinh doanh',
            description: 'Có giấy phép kinh doanh hợp lệ, ngành nghề phù hợp với hàng hóa/dịch vụ cung cấp.',
          },
          {
            code: 'A1.2',
            title: 'Tư cách hợp lệ theo Luật Đấu thầu',
            description: 'Không thuộc danh sách bị cấm tham dự; không vi phạm quy định hiện hành.',
          },
          {
            code: 'A1.3',
            title: 'Thời gian hoạt động trong ngành CNTT',
            description: '>=5 năm: 5đ | 3-5 năm: 4đ | 1-3 năm: 3đ | <1 năm: 1đ.',
          },
        ],
      },
      {
        id: 'A2',
        title: 'A2 · Lịch sử vi phạm & Kỷ luật đấu thầu',
        weight: 'Trọng số 20.8%',
        criteria: [
          {
            code: 'A2.1',
            title: 'Lịch sử vi phạm trong 3 năm gần nhất',
            description: 'Không có vi phạm hoặc vi phạm nhỏ đã khắc phục đầy đủ.',
          },
          {
            code: 'A2.2',
            title: 'Tình trạng trên CSDL quốc gia về nhà thầu',
            description: 'Không có thông tin vi phạm trên hệ thống mạng đấu thầu quốc gia.',
          },
        ],
      },
    ],
  },
  {
    id: 'B',
    title: 'B · Năng lực NCC',
    subtitle: 'Năng lực nhà cung cấp',
    weight: 30,
    sections: [
      {
        id: 'B1',
        title: 'B1 · Năng lực tài chính',
        weight: 'Trọng số 25%',
        criteria: [
          {
            code: 'B1.1',
            title: 'Doanh thu và tăng trưởng',
            description: 'Doanh thu ổn định, có tăng trưởng phù hợp với quy mô gói thầu.',
          },
          {
            code: 'B1.2',
            title: 'Khả năng thanh khoản',
            description: 'Có khả năng đáp ứng nghĩa vụ tài chính trong quá trình triển khai.',
          },
        ],
      },
      {
        id: 'B2',
        title: 'B2 · Năng lực nhân sự & chuyên môn',
        weight: 'Trọng số 25%',
        criteria: [
          {
            code: 'B2.1',
            title: 'Đội ngũ chuyên gia',
            description: 'Đội ngũ có chứng chỉ, kinh nghiệm và khả năng hỗ trợ BIDV.',
          },
          {
            code: 'B2.2',
            title: 'Kinh nghiệm dự án tương tự',
            description: 'Đã triển khai các dự án CNTT tương tự về quy mô và độ phức tạp.',
          },
        ],
      },
    ],
  },
  {
    id: 'C',
    title: 'C · Năng lực thực thi',
    subtitle: 'Năng lực thực thi hợp đồng',
    weight: 30,
    sections: [
      {
        id: 'C1',
        title: 'C1 · Quản trị triển khai',
        weight: 'Trọng số 30%',
        criteria: [
          {
            code: 'C1.1',
            title: 'Kế hoạch triển khai',
            description: 'Kế hoạch rõ ràng, có mốc nghiệm thu, nhân sự và phương án quản trị rủi ro.',
          },
          {
            code: 'C1.2',
            title: 'Tuân thủ tiến độ',
            description: 'Lịch sử bàn giao đúng hạn và có năng lực xử lý phát sinh.',
          },
        ],
      },
      {
        id: 'C2',
        title: 'C2 · Chất lượng bàn giao',
        weight: 'Trọng số 30%',
        criteria: [
          {
            code: 'C2.1',
            title: 'Chất lượng sản phẩm/dịch vụ',
            description: 'Sản phẩm/dịch vụ đáp ứng yêu cầu kỹ thuật và tiêu chuẩn vận hành.',
          },
          {
            code: 'C2.2',
            title: 'Hỗ trợ sau triển khai',
            description: 'Có quy trình hỗ trợ, SLA và đầu mối xử lý sự cố rõ ràng.',
          },
        ],
      },
    ],
  },
  {
    id: 'D',
    title: 'D · Phát triển ESG',
    subtitle: 'Phát triển bền vững',
    weight: 15,
    sections: [
      {
        id: 'D1',
        title: 'D1 · Môi trường',
        weight: 'Trọng số 25%',
        criteria: [
          {
            code: 'D1.1',
            title: 'Chính sách quản lý môi trường',
            description: 'Có chính sách môi trường, tiết kiệm năng lượng và giảm phát thải.',
          },
          {
            code: 'D1.2',
            title: 'Quản lý vòng đời thiết bị',
            description: 'Có quy trình thu hồi, tái chế hoặc xử lý thiết bị CNTT đúng chuẩn.',
          },
        ],
      },
      {
        id: 'D2',
        title: 'D2 · Xã hội & quản trị',
        weight: 'Trọng số 25%',
        criteria: [
          {
            code: 'D2.1',
            title: 'Bảo vệ dữ liệu người dùng',
            description: 'Tuân thủ quy định bảo vệ dữ liệu cá nhân và an toàn thông tin.',
          },
          {
            code: 'D2.2',
            title: 'Trách nhiệm trong chuỗi cung ứng',
            description: 'Có chính sách kiểm tra điều kiện lao động tại đối tác/nhà thầu phụ.',
          },
        ],
      },
    ],
  },
];

const allCriteria = evaluationGroups.flatMap((group) =>
  group.sections.flatMap((section) => section.criteria.map((criterion) => ({ ...criterion, groupId: group.id }))),
);

export function EvaluationForm({ supplier }: { supplier: Supplier }) {
  const router = useRouter();
  const apiUrl = useMemo(() => getBrowserApiUrl(), []);
  const [activeGroup, setActiveGroup] = useState<EvaluationGroup['id']>('A');
  const [scores, setScores] = useState<Record<string, number>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const active = evaluationGroups.find((group) => group.id === activeGroup) ?? evaluationGroups[0];

  const scoreSummary = useMemo(() => {
    const byGroup = evaluationGroups.map((group) => {
      const groupCriteria = allCriteria.filter((criterion) => criterion.groupId === group.id);
      const completed = groupCriteria.filter((criterion) => scores[criterion.code]).length;
      const raw =
        completed === 0
          ? 0
          : (groupCriteria.reduce((total, criterion) => total + (scores[criterion.code] ?? 0), 0) /
              (groupCriteria.length * 5)) *
            100;

      return {
        id: group.id,
        label: group.subtitle,
        weight: group.weight,
        completed,
        raw: Number(raw.toFixed(1)),
        weighted: Number(((raw * group.weight) / 100).toFixed(1)),
      };
    });
    const total = Number(byGroup.reduce((sum, group) => sum + group.weighted, 0).toFixed(1));
    const completed = Object.keys(scores).length;
    const rank =
      total >= 85
        ? 'A - Nhà cung cấp chiến lược'
        : total >= 70
          ? 'B - Nhà cung cấp đủ điều kiện'
          : total >= 55
            ? 'C - Cần cải thiện'
            : 'D - Yếu kém, xem xét chấm dứt';

    return { byGroup, total, completed, rank };
  }, [scores]);
  const canSubmit = scoreSummary.completed === allCriteria.length;

  async function handleComplete() {
    if (!canSubmit) {
      setError('Vui lòng nhập đủ điểm cho tất cả tiêu chí trước khi hoàn thành.');
      return;
    }

    setSaving(true);
    setError('');

    const groupScores = Object.fromEntries(scoreSummary.byGroup.map((group) => [group.id, group.raw])) as Record<
      EvaluationGroup['id'],
      number
    >;

    try {
      const response = await fetch(`${apiUrl}/evaluations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          supplierId: supplier.id,
          scoreA: groupScores.A,
          scoreB: groupScores.B,
          scoreC: groupScores.C,
          scoreD: groupScores.D,
        }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || 'Không thể lưu đánh giá');
      }

      router.push('/suppliers');
      router.refresh();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Không thể lưu đánh giá');
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="mb-8 grid gap-5 text-center md:grid-cols-2 xl:grid-cols-4">
        {evaluationGroups.map((group) => (
          <button
            key={group.id}
            type="button"
            className={`item-tab rounded-4 border border-solid border-[#e2e8f0] bg-white p-4 text-left md:text-center ${
              activeGroup === group.id ? 'active' : ''
            }`}
            onClick={() => setActiveGroup(group.id)}
          >
            <div className="font-bold">{group.title}</div>
            <p className="text-[14px]">Trọng số {group.weight}%</p>
          </button>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-12">
        <div className="xl:col-span-9">
          <div className="space-y-6">
            {active.sections.map((section) => (
              <section key={section.id} className="panel">
                <div className="border-b border-solid border-[#e2e8f0] p-4">
                  <div className="font-bold text-blue">{section.title}</div>
                  <div className="text-[12px] text-slate-500">{section.weight} · {section.criteria.length} tiêu chí con</div>
                </div>
                <div className="space-y-5 p-4">
                  {section.criteria.map((criterion) => (
                    <div key={criterion.code} className="rounded-4 border border-solid border-[#e2e8f0] bg-white p-4">
                      <div className="mb-4">
                        <div className="font-bold text-blue">[{criterion.code}] {criterion.title}</div>
                        <p className="text-[14px] text-slate-600">→ {criterion.description}</p>
                      </div>
                      <div className="grid gap-4 lg:grid-cols-5">
                        <label className="lg:col-span-2">
                          <span className="mb-2 block text-[14px]">Điểm đánh giá</span>
                          <select
                            className="field"
                            value={scores[criterion.code] ?? ''}
                            onChange={(event) =>
                              setScores((current) => ({
                                ...current,
                                [criterion.code]: Number(event.target.value),
                              }))
                            }
                          >
                            <option value="">Chọn điểm</option>
                            {scoreOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className="lg:col-span-3">
                          <span className="mb-2 block text-[14px]">Ghi chú</span>
                          <input className="field" />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        <aside className="xl:col-span-3">
          <div className="sticky top-5 rounded-4 bg-blue p-6 text-white">
            <div className="mb-4 border-b border-solid border-[#ebebeb1f] pb-4 text-center text-[18px] font-bold">
              Bảng điểm thời gian thực
            </div>
            <div className="mb-5 border-b border-dashed border-[#ebebeb1f] pb-5">
              <ul>
                {scoreSummary.byGroup.map((group) => (
                  <li key={group.id} className="mb-2 flex items-center justify-between last:mb-0">
                    <span className="opacity-80">{group.id}. {group.label}</span>
                    <span className="text-[18px] font-bold">{group.raw}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="total mb-5 flex items-center justify-between">
              <span className="text-[18px]">Tổng điểm</span>
              <span className="text-[24px] font-bold">{scoreSummary.total}</span>
            </div>
            <div className="mb-6 text-center text-[12px]">
              Đã nhập: {scoreSummary.completed} / {allCriteria.length} tiêu chí
            </div>
            <div className="mb-5 rounded-8 bg-white px-2 py-2 text-center font-bold text-red">
              {scoreSummary.rank}
            </div>
            {error ? <p className="mb-4 text-center text-sm font-semibold text-[#ffd8d8]">{error}</p> : null}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex h-10 w-full items-center justify-center gap-2 rounded-2 bg-[#c5a85c] px-4 font-bold text-white disabled:opacity-60"
                disabled={saving}
                onClick={handleComplete}
              >
                <CheckCircle2 size={16} />
                Hoàn thành
              </button>
              <button
                type="button"
                className="flex h-10 w-full items-center justify-center gap-2 rounded-2 bg-white px-4 font-bold text-blue disabled:opacity-60"
                disabled
              >
                <Save size={16} />
                Lưu nháp
              </button>
            </div>
            <Link href="/suppliers" className="mt-4 block text-center text-sm font-bold text-white underline">
              Quay lại danh sách
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
