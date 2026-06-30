<?php include 'header.php'; ?>
<main class="main-container pl-[280px]">
    <?php include 'sidebar.php'; ?>
    <div class="main-content p-10">
        <div class="flex items-center justify-between border-b border-solid border-[#e2e8f0] pb-10 mb-10">
            <div class="block">
                <div class="page-title">Bảng tổng quan quản trị</div>
                <p>Thống kê hoạt động đánh giá chất lượng nhà cung cấp CNTT</p>
            </div>
            <div class="block">
                <a href="report-create.php" class="btn-main">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;"><path d="M12 5v14M5 12h14"></path></svg>
                    Đánh giá mới
                </a>
            </div>
        </div>
        <div class="grid grid-cols-4 gap-10 mb-10">
            <div class="item overflow-hidden rounded-4 p-6 bg-white border border-solid border-[#e2e8f0]">
                <div class="flex items-center gap-5">
                    <div class="stat-icon primary bg-[#f1f5f9] rounded-2 w-full max-w-[52px] h-[52px] flex items-center justify-between">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
                    </div>
                    <div class="desc block">
                        <div class="text-[24px] font-bold text-blue">128</div>
                        <p>Nhà cung cấp</p>
                    </div>
                </div>
            </div>
            <div class="item overflow-hidden rounded-4 p-6 bg-white border border-solid border-[#e2e8f0]">
                <div class="flex items-center gap-5">
                    <div class="stat-icon primary bg-[#f1f5f9] rounded-2 w-full max-w-[52px] h-[52px] flex items-center justify-between">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
                    </div>
                    <div class="desc block">
                        <div class="text-[24px] font-bold text-blue">86</div>
                        <p>Đã đánh giá kỳ này</p>
                    </div>
                </div>
            </div>
            <div class="item overflow-hidden rounded-4 p-6 bg-white border border-solid border-[#e2e8f0]">
                <div class="flex items-center gap-5">
                    <div class="stat-icon primary bg-[#f1f5f9] rounded-2 w-full max-w-[52px] h-[52px] flex items-center justify-between">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </div>
                    <div class="desc block">
                        <div class="text-[24px] font-bold text-blue">4</div>
                        <p>Đang chờ đánh giá</p>
                    </div>
                </div>
            </div>
            <div class="item overflow-hidden rounded-4 p-6 bg-white border border-solid border-[#e2e8f0]">
                <div class="flex items-center gap-5">
                    <div class="stat-icon primary bg-[#f1f5f9] rounded-2 w-full max-w-[52px] h-[52px] flex items-center justify-between">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 22 22 22"></polygon><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                    </div>
                    <div class="desc block">
                        <div class="text-[24px] font-bold text-blue">19</div>
                        <p>NCC loại A (chiến lược)</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-3 gap-10 mb-10">
            <div class="item relative overflow-hidden rounded-4 p-6 bg-white border border-solid border-[#e2e8f0]">
                <div class="icon mb-4"><img src="assets/images/icon-1.png" alt=""></div>
                <h3 class="font-bold text-[20px] mb-4">
                    <a href="guideline.php">Hướng dẫn</a>
                </h3>
                <div class="desc mb-4 text-[14px] text-[#64748b]">Tài liệu hướng dẫn sử dụng bộ tiêu chí, thang điểm 1–5 và quy trình phân loại nhà cung cấp.</div>
                <div class="block font-semibold">
                    <a href="guideline.php" class="link-more inline-flex items-center gap-2">
                        Đọc hướng dẫn
                        <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.286 11.297L11.346 2.35702L13.703 0L26.6667 12.9637L13.703 25.9272L11.346 23.5702L20.286 14.6304H0V11.297H20.286Z" fill="#000000"/>
                        </svg>
                    </a>
                </div>
            </div>
            <div class="item relative overflow-hidden rounded-4 p-6 bg-white border border-solid border-[#e2e8f0]">
                <div class="icon mb-4"><img src="assets/images/icon-2.png" alt=""></div>
                <h3 class="font-bold text-[20px] mb-4">
                    <a href="report-list.php">Thực hiện đánh giá</a>
                </h3>
                <div class="desc mb-4 text-[14px] text-[#64748b]">Chọn nhà thầu và tiến hành chấm điểm theo 4 nhóm tiêu chí A, B, C, D với minh chứng đính kèm.</div>
                <div class="block font-semibold">
                    <a href="report-list.php" class="link-more inline-flex items-center gap-2">
                        Bắt đầu đánh giá
                        <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.286 11.297L11.346 2.35702L13.703 0L26.6667 12.9637L13.703 25.9272L11.346 23.5702L20.286 14.6304H0V11.297H20.286Z" fill="#000000"/>
                        </svg>
                    </a>
                </div>
            </div>
            <div class="item relative overflow-hidden rounded-4 p-6 bg-white border border-solid border-[#e2e8f0]">
                <div class="icon mb-4"><img src="assets/images/icon-3.png" alt=""></div>
                <h3 class="font-bold text-[20px] mb-4">
                    <a href="">Báo cáo</a>
                </h3>
                <div class="desc mb-4 text-[14px] text-[#64748b]">Xem tổng hợp kết quả, so sánh các kỳ đánh giá và xuất báo cáo Excel phục vụ phê duyệt.</div>
                <div class="block font-semibold">
                    <a href="" class="link-more inline-flex items-center gap-2">
                        Xem báo cáo

                        <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.286 11.297L11.346 2.35702L13.703 0L26.6667 12.9637L13.703 25.9272L11.346 23.5702L20.286 14.6304H0V11.297H20.286Z" fill="#000000"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>

        <div class="block overflow-hidden rounded-4 p-6 bg-white border border-solid border-[#e2e8f0]">
            <div class="flex items-center justify-between mb-4">
                <h3 class="font-bold text-[20px]">Danh sách đánh giá gần đây</h3>
                <a href="report-list.php" class="font-bold text-[14px] text-blue border-b border-solid">Xem tất cả</a>
            </div>

            <div class="table-container">
                <table class="data-table">
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
                    <?php
                    for ($x=1;$x<=7;$x++) { ?>
                        <tr>
                            <td>
                                <div class="name">Tập đoàn Công nghệ FPT</div>
                                <span class="list-badge">Hàng hóa, TV, PTV</span>
                            </td>
                            <td>
                                <span>Kỳ 1 - Năm 2026</span>
                            </td>
                            <td>
                                <span>2026-06-20</span>
                            </td>
                            <td>
                                <span class="font-bold">89.2 / 100</span>
                            </td>
                            <td>
                                <span class="badge">Nhà cung cấp chiến lược</span>
                            </td>
                            <td>
                                <a href="report-single.php" class="more-single">Chi tiết</a>
                            </td>
                        </tr>
                    <?php }
                    ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</main>
<?php include 'footer.php'; ?>
