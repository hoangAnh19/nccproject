import { PageHeader } from '@/components/PageHeader';

const sections = [
  {
    title: 'Mục đích',
    body: [
      'Theo dõi và quản lý NCC, cảnh báo sớm, phòng ngừa rủi ro cho BIDV liên quan đến khả năng thực hiện hợp đồng.',
      'Thực hiện xếp hạng NCC theo từng lĩnh vực chính, cung cấp thông tin bổ trợ trong quá trình lựa chọn NCC.',
    ],
  },
  {
    title: 'Lộ trình triển khai',
    body: [
      'Chuẩn hóa dữ liệu nhà cung cấp, rà soát hồ sơ minh chứng và cập nhật điểm đánh giá theo từng kỳ.',
      'Tổng hợp kết quả để phê duyệt, theo dõi cải thiện và đánh giá lại định kỳ.',
    ],
  },
  {
    title: 'Cấu trúc',
    body: [
      'Bộ tiêu chí gồm 4 nhóm chính, mỗi nhóm có trọng số riêng. Điểm tổng được tính theo bình quân gia quyền của các nhóm, thang điểm 100.',
      'A - Uy tín nhà cung cấp (Trọng số: 25%)',
      'B - Năng lực nhà cung cấp (Trọng số: 30%)',
      'C - Năng lực thực thi hợp đồng (Trọng số: 30%)',
      'D - Phát triển bền vững ESG (Trọng số: 15%)',
    ],
  },
  {
    title: 'Ký hiệu tiêu chí',
    body: [
      '[NCC]: Tiêu chí đánh giá về chủ thể nhà cung cấp',
      '[SP]: Tiêu chí đánh giá về sản phẩm hàng hóa được cung cấp',
      '[DV]: Tiêu chí đánh giá về dịch vụ được cung cấp',
      '[SP/DV]: Tiêu chí đánh giá về cả sản phẩm và dịch vụ',
    ],
  },
  {
    title: 'Loại hình áp dụng',
    body: [
      'Hàng hóa: Mua sắm thiết bị, phần cứng, bản quyền phần mềm, v.v.',
      'TV: Dịch vụ tư vấn như tư vấn kiểm toán, tư vấn lập dự án, v.v.',
      'PTV: Dịch vụ phi tư vấn như bảo trì, vận hành, hosting, SaaS, v.v.',
    ],
  },
  {
    title: 'Cột nguồn tin / Cách thức khảo sát',
    body: [
      'Chủ động đánh giá: Người khảo sát quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ/biên bản nội bộ BIDV.',
      'Hồ sơ dự thầu/đề xuất: Thông tin do nhà cung cấp cung cấp trong HSDT/HSĐX khi tham gia LCNT/LCNCC.',
      'Cập nhật từ NCC: Văn bản, báo cáo, chứng nhận do nhà cung cấp chủ động cung cấp/cập nhật định kỳ trong quá trình hợp tác.',
      'Thông tin công khai: Cổng đấu thầu quốc gia, Cổng ĐKKD quốc gia, Tổng cục Thuế, TANDTC, CIC, IAF CertSearch, EcoVadis, CDP, Gartner, IDC.',
    ],
  },
  {
    title: 'Phân loại kết quả',
    body: [
      'Loại A (>=85 điểm): Nhà cung cấp chiến lược - Ưu tiên hợp tác dài hạn 3-5 năm.',
      'Loại B (70-84 điểm): Nhà cung cấp đủ điều kiện - Tiếp tục hợp tác, đánh giá lại hàng năm.',
      'Loại C (55-69 điểm): Cần cải thiện - Giám sát chặt, giới hạn khối lượng.',
      'Loại D (<55 điểm): Yếu kém - Xem xét chấm dứt, không phê duyệt hợp đồng mới.',
    ],
  },
];

export default function GuidelinePage() {
  return (
    <>
      <PageHeader
        title="Bộ tiêu chí đánh giá nhà cung cấp CNTT - Ngân hàng"
        description="Căn cứ Luật Đấu thầu 22/2023/QH15, Nghị định 214/2025/NĐ-CP, QĐ BIDV 321 và các quy định hiện hành | Phiên bản v2.0"
      />

      <section className="space-y-6">
        {sections.map((section) => (
          <article key={section.title} className="overflow-hidden border border-solid border-[#e2e8f0] bg-white">
            <div className="bg-blue px-5 py-3 font-bold uppercase text-white">{section.title}</div>
            <div className="desc-single p-5">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
