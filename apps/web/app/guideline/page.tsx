const sections = [
  {
    title: 'Mục đích',
    content: [
      'Theo dõi và quản lý NCC, cảnh báo sớm, phòng ngừa rủi ro cho BIDV liên quan đến khả năng thực hiện hợp đồng.',
      'Thực hiện xếp hạng NCC theo từng lĩnh vực chính, cung cấp thông tin bổ trợ trong quá trình lựa chọn NCC.',
    ],
  },
  {
    title: 'Lộ trình triển khai',
    content: ['Cập nhật theo kế hoạch triển khai chính thức của đơn vị quản lý hệ thống.'],
  },
  {
    title: 'Cấu trúc',
    content: [
      'Bộ tiêu chí gồm 4 nhóm chính, mỗi nhóm có trọng số riêng. Điểm tổng được tính theo bình quân gia quyền của các nhóm, thang điểm 100.',
      'A - Uy tín nhà cung cấp (Trọng số: 25%)',
      'B - Năng lực nhà cung cấp (Trọng số: 30%)',
      'C - Năng lực thực thi hợp đồng (Trọng số: 30%)',
      'D - Phát triển bền vững ESG (Trọng số: 15%)',
    ],
  },
  {
    title: 'Ký hiệu tiêu chí',
    content: [
      '[NCC]: Tiêu chí đánh giá về chủ thể nhà cung cấp',
      '[SP]: Tiêu chí đánh giá về sản phẩm hàng hóa được cung cấp',
      '[DV]: Tiêu chí đánh giá về dịch vụ được cung cấp',
      '[SP/DV]: Tiêu chí đánh giá về cả sản phẩm và dịch vụ',
    ],
  },
  {
    title: 'Thang điểm đánh giá',
    content: [
      '5 điểm: Đáp ứng tốt yêu cầu, có bằng chứng rõ ràng và ổn định.',
      '4 điểm: Đáp ứng phần lớn yêu cầu, còn một số điểm cần hoàn thiện.',
      '3 điểm: Đáp ứng mức trung bình, cần theo dõi trong quá trình hợp tác.',
      '2 điểm: Đáp ứng hạn chế, tồn tại rủi ro cần kiểm soát.',
      '1 điểm: Không đáp ứng hoặc thiếu bằng chứng đánh giá.',
    ],
  },
  {
    title: 'Loại hình áp dụng',
    content: [
      'Hàng hóa: Mua sắm thiết bị, phần cứng, bản quyền phần mềm, v.v.',
      'TV: Dịch vụ tư vấn như kiểm toán, lập dự án, thẩm định, v.v.',
      'PTV: Dịch vụ phi tư vấn như bảo trì, vận hành, hosting, SaaS, v.v.',
    ],
  },
  {
    title: 'Cột nguồn tin / cách thức khảo sát',
    content: [
      'Chủ động đánh giá: Người khảo sát quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ hoặc biên bản nội bộ BIDV.',
      'Hồ sơ dự thầu/đề xuất: Thông tin do nhà cung cấp cung cấp trong HSDT/HSĐX khi tham gia LCNT/LCNCC.',
      'Cập nhật từ NCC: Văn bản, báo cáo, chứng nhận do nhà cung cấp chủ động cung cấp hoặc cập nhật định kỳ trong quá trình hợp tác.',
      'Thông tin công khai: Nguồn chính thống công bố công khai, có dẫn link cụ thể.',
      'Đấu thầu: Cổng đấu thầu quốc gia - https://muasamcong.mpi.gov.vn/web/guest/organizations-violators',
      'Doanh nghiệp: Cổng ĐKKD quốc gia - https://dangkykinhdoanh.gov.vn',
      'Thuế: Tổng cục Thuế - https://www.gdt.gov.vn',
      'Tòa án: Cổng thông tin điện tử TANDTC - https://congbobanan.toaan.gov.vn',
      'Tín dụng (CIC): Trung tâm Thông tin Tín dụng Quốc gia - https://cic.org.vn',
      'Chứng chỉ ISO: IAF CertSearch - https://www.iafcertsearch.org',
      'Đánh giá ESG: EcoVadis - https://ecovadis.com | CDP - https://www.cdp.net',
      'Phân tích thị trường: Gartner - https://www.gartner.com | IDC - https://www.idc.com',
    ],
  },
  {
    title: 'Phân loại kết quả',
    content: [
      'Loại A (>= 85 điểm): Nhà cung cấp chiến lược - ưu tiên hợp tác dài hạn 3-5 năm.',
      'Loại B (70-84 điểm): Nhà cung cấp đủ điều kiện - tiếp tục hợp tác, đánh giá lại hằng năm.',
      'Loại C (55-69 điểm): Cần cải thiện - giám sát chặt, giới hạn khối lượng.',
      'Loại D (< 55 điểm): Yếu kém - xem xét chấm dứt, không phê duyệt hợp đồng mới.',
    ],
  },
];

export default function GuidelinePage() {
  return (
    <div className="space-y-6">
      <header className="border-b border-line pb-6">
        <h1 className="text-2xl font-bold text-ink">Bộ tiêu chí đánh giá nhà cung cấp CNTT - Ngân hàng</h1>
        <p className="mt-2 max-w-5xl text-sm leading-6 text-slate-600">
          Căn cứ: Luật Đấu thầu 22/2023/QH15, Nghị định 214/2025/NĐ-CP, QĐ BIDV 321 và các quy định hiện hành | Phiên
          bản v2.0
        </p>
      </header>

      <section className="space-y-5">
        {sections.map((section) => (
          <article key={section.title} className="overflow-hidden rounded-md border border-line bg-white">
            <div className="bg-[#005d5c] px-5 py-3 text-sm font-bold uppercase text-white">{section.title}</div>
            <div className="space-y-3 p-5 text-sm leading-6 text-slate-700">
              {section.content.map((item) => (
                <p key={item}>{renderContent(item)}</p>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function renderContent(item: string) {
  const separatorIndex = item.indexOf(':');
  if (separatorIndex <= 0) return item;

  return (
    <>
      <strong className="font-semibold text-ink">{item.slice(0, separatorIndex + 1)}</strong>
      {item.slice(separatorIndex + 1)}
    </>
  );
}
