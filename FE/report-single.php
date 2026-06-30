<?php include 'header.php'; ?>
<main class="main-container pl-[280px]">
    <?php include 'sidebar.php'; ?>
    <div class="main-content p-10">
        <div class="flex items-center justify-between border-b border-solid border-[#e2e8f0] pb-10 mb-10">
            <div class="block">
                <div class="page-title">Nhà cung cấp</div>
                <p>Thông tin xuất bản chính thức, định dạng chuẩn in ấn tài liệu</p>
            </div>
            <div class="flex items-center gap-4">
                <a href="" class="btn-main">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                    In báo cáo (PDF)
                </a>
                <a href="" class="btn-main">
                    Quay lại
                </a>
            </div>
        </div>

        <div class="m-auto w-full max-w-[1000px] relative overflow-hidden rounded-4 p-10 bg-white border border-solid border-[#e2e8f0]">
            <div class="text-center pb-6 mb-6 border-b-[2px] border-solid border-blue">
                <div class="font-bold text-blue uppercase text-[22px] mb-1">BẢNG TỔNG HỢP ĐÁNH GIÁ NHÀ CUNG CẤP CNTT</div>
                <p class="text-[14px]">Ngân hàng TMCP Đầu tư và Phát triển Việt Nam (BIDV) - Ban Công nghệ Thông tin</p>
            </div>
            <div class="grid grid-cols-2 gap-6 p-8 bg-[#f8fafc] rounded-4 text-blue mb-8">
                <div class="item flex gap-4">
                    <span class="min-w-[140px] font-semibold">Tên nhà cung cấp:</span>
                    <span class="">
                        <span class="font-bold text-black">Công ty Cổ phần MISA</span>
                    </span>
                </div>
                <div class="item flex gap-4">
                    <span class="min-w-[140px] font-semibold">Mã nhà cung cấp:</span>
                    <span class="">
                        <span class="font-bold text-black">MISA-JS</span>
                    </span>
                </div>
                <div class="item flex gap-4">
                    <span class="min-w-[140px] font-semibold">Loại hình áp dụng:</span>
                    <span class="">
                        <span class="text-black">Hàng hóa, TV, PTV</span>
                    </span>
                </div>
                <div class="item flex gap-4">
                    <span class="min-w-[140px] font-semibold">Kỳ đánh giá:</span>
                    <span class="">
                        <span class="text-black">Kỳ 1 - Năm 2026</span>
                    </span>
                </div>
                <div class="item flex gap-4">
                    <span class="min-w-[140px] font-semibold">Ngày đánh giá:</span>
                    <span class="">
                        <span class="text-black">2026-06-24</span>
                    </span>
                </div>
                <div class="item flex gap-4">
                    <span class="min-w-[140px] font-semibold">Người đánh giá:</span>
                    <span class="">
                        <span class="text-black">Ban Công nghệ Thông tin</span>
                    </span>
                </div>
            </div>

            <div class="block mb-10">
                <div class="border-b border-solid border-[#ebebeb] font-bold pb-2 mb-4">Phân loại & Lộ trình hợp tác chính thức</div>
                <div class="grid grid-cols-2">
                    <div class="item bg-blue text-white p-8">
                        <p class="text-[14px]">Tổng điểm đánh giá</p>
                        <div class="numb text-[32px] font-extrabold py-2">88.5 / 100</div>
                        <div class="block">
                            <div class="bg-white inline-flex text-[18px] font-bold text-blue py-2 px-6 rounded-10">Loại A — Nhà cung cấp chiến lược</div>
                        </div>
                        <div class="pt-4">
                            Nhà cung cấp đủ điều kiện hợp tác dài hạn 3–5 năm. Đánh giá lại định kỳ hàng năm.
                        </div>
                    </div>
                    <div class="item"></div>
                </div>
            </div>

            <div class="block">
                <div class="border-b border-solid border-[#ebebeb] font-bold pb-2 mb-4">Chi tiết điểm từng nhóm</div>
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                        <tr>
                            <th class="text-center">STT</th>
                            <th class="text-center">Nhóm tiêu chí</th>
                            <th class="text-center">Trọng số (%)</th>
                            <th class="text-center">Điểm thô (0–100)</th>
                            <th class="text-center">Điểm quy đổi</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="text-center">
                                    <span class="font-bold">1</span>
                                </td>
                                <td class="text-center">
                                    <div class="name">Uy tín nhà cung cấp</div>
                                </td>
                                <td class="text-center">
                                    <span>25%</span>
                                </td>
                                <td class="text-center">
                                    <span>86.0</span>
                                </td>
                                <td class="text-center">
                                    <span class="font-bold">25</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="text-center">
                                    <span class="font-bold">2</span>
                                </td>
                                <td class="text-center">
                                    <div class="name">Năng lực nhà cung cấp</div>
                                </td>
                                <td class="text-center">
                                    <span>30%</span>
                                </td>
                                <td class="text-center">
                                    <span>100.0</span>
                                </td>
                                <td class="text-center">
                                    <span class="font-bold">30</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="text-center">
                                    <span class="font-bold">3</span>
                                </td>
                                <td class="text-center">
                                    <div class="name">Khả năng thực thi hợp đồng</div>
                                </td>
                                <td class="text-center">
                                    <span>30%</span>
                                </td>
                                <td class="text-center">
                                    <span>100.0</span>
                                </td>
                                <td class="text-center">
                                    <span class="font-bold">30</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="text-center">
                                    <span class="font-bold">3</span>
                                </td>
                                <td class="text-center">
                                    <div class="name">Phát triển bền vững (ESG)</div>
                                </td>
                                <td class="text-center">
                                    <span>15%</span>
                                </td>
                                <td class="text-center">
                                    <span>100.0</span>
                                </td>
                                <td class="text-center">
                                    <span class="font-bold">15</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="text-left" colspan="4">
                                    <span class="font-bold text-[18px] text-blue">TỔNG ĐIỂM ĐẠT ĐƯỢC (thang 100 điểm):</span>
                                </td>
                                <td class="text-center">
                                    <span class="font-bold text-[18px] text-blue">100</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>
</main>
<?php include 'footer.php'; ?>
