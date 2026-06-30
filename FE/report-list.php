<?php include 'header.php'; ?>
<main class="main-container pl-[280px]">
    <?php include 'sidebar.php'; ?>
    <div class="main-content p-10">
        <div class="flex items-center justify-between border-b border-solid border-[#e2e8f0] pb-10 mb-10">
            <div class="block">
                <div class="page-title">Nhà cung cấp</div>
                <p>128 nhà cung cấp - 86 đã đánh giá trong kỳ Quý II/2026</p>
            </div>
            <div class="block">
                <a href="report-create.php" class="btn-main">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;"><path d="M12 5v14M5 12h14"></path></svg>
                    Thêm nhà cung cấp
                </a>
            </div>
        </div>
        
        <div class="block overflow-hidden rounded-4 p-6 bg-white border border-solid border-[#e2e8f0] mb-6">
            <div class="grid gap-2 grid-cols-2 text-[14px]">
                <div class="item">
                    <input type="text" class="txt_field w-full h-10 px-5 border border-solid border-[#ebebeb] rounded-2" placeholder="Tìm theo tên Nhà Cung Cấp hoặc Mã số thuế">
                </div>
                <div class="item grid grid-cols-3 gap-2">
                    <div class="item">
                        <select class="txt_field w-full h-10 px-5 border border-solid border-[#ebebeb] rounded-2 outline-none">
                            <option value="">Loại hình</option>
                            <option value="">Hàng hóa</option>
                            <option value="">TV</option>
                            <option value="">PTV</option>
                        </select>
                    </div>
                    <div class="item">
                        <select class="txt_field w-full h-10 px-5 border border-solid border-[#ebebeb] rounded-2 outline-none">
                            <option value="">Xếp hạng</option>
                            <option value="">Loại A</option>
                            <option value="">Loại B</option>
                            <option value="">Loại C</option>
                            <option value="">Loại D</option>
                        </select>
                    </div>
                    <div class="item">
                        <button class="w-full h-10 px-5 border border-solid border-[#ebebeb] rounded-2 outline-none font-bold text-white bg-blue !border-blue">Filter</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="block overflow-hidden rounded-4 p-6 bg-white border border-solid border-[#e2e8f0]">
            <div class="table-container">
                <table class="data-table">
                    <thead>
                    <tr>
                        <th>Nhà cung cấp</th>
                        <th>Mã số thuế</th>
                        <th>Loại hình</th>
                        <th>Điểm</th>
                        <th>Ngày đánh giá</th>
                        <th>Xếp hạng</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div class="name">Tập đoàn Công nghệ FPT</div>

                            </td>
                            <td>
                                <span>0101248141</span>
                            </td>
                            <td>
                                <span class="list">Hàng hóa, TV, PTV</span>
                            </td>
                            <td>
                                <span class="font-bold">89.2</span>
                            </td>
                            <td>
                                <span class="">16/06/2026</span>
                            </td>
                            <td>
                                <span class="badge text-[14px] bg-[#16A34A] text-white px-2 py-1 rounded-4">Loại A</span>
                            </td>
                            <td>
                                <div class="flex items-center gap-2">
                                    <a href="report-single.php" class="more-single bg-blue !text-white !border-[#0a4976]">Chi tiết</a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="name">Công ty CP Giải pháp FPT IS</div>
                            </td>
                            <td>
                                <span>0101248141</span>
                            </td>
                            <td>
                                <span class="list">Hàng hóa, TV, PTV</span>
                            </td>
                            <td>
                                <span class="font-bold">76.2</span>
                            </td>
                            <td>
                                <span class="">16/06/2026</span>
                            </td>
                            <td>
                                <span class="badge text-[14px] bg-[#2563EB] text-white px-2 py-1 rounded-4">Loại B</span>
                            </td>
                            <td>
                                <div class="flex items-center gap-2">
                                    <a href="report-single.php" class="more-single bg-blue !text-white !border-[#0a4976]">Chi tiết</a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="name">Công ty TNHH CMC Technology</div>
                            </td>
                            <td>
                                <span>0101248141</span>
                            </td>
                            <td>
                                <span class="list">Hàng hóa, TV, PTV</span>
                            </td>
                            <td>
                                <span class="font-bold">61.0</span>
                            </td>
                            <td>
                                <span class="">16/06/2026</span>
                            </td>
                            <td>
                                <span class="badge text-[14px] bg-[#F59E0B] text-white px-2 py-1 rounded-4">Loại C</span>
                            </td>
                            <td>
                                <div class="flex items-center gap-2">
                                    <a href="report-single.php" class="more-single bg-blue !text-white !border-[#0a4976]">Chi tiết</a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="name">Công ty CP Công nghệ Misa</div>
                            </td>
                            <td>
                                <span>0101248141</span>
                            </td>
                            <td>
                                <span class="list">Hàng hóa, TV, PTV</span>
                            </td>
                            <td>
                                <span class="font-bold">48.7</span>
                            </td>
                            <td>
                                <span class="">16/06/2026</span>
                            </td>
                            <td>
                                <span class="badge text-[14px] bg-[#DC2626] text-white px-2 py-1 rounded-4">Loại D</span>
                            </td>
                            <td>
                                <div class="flex items-center gap-2">
                                    <a href="report-single.php" class="more-single bg-blue !text-white !border-[#0a4976]">Chi tiết</a>
                                </div>
                            </td>
                        </tr>
                        <?php
                        for ($x=1;$x<=5;$x++) { ?>
                            <tr>
                                <td>
                                    <div class="name">McKinsey & Company Việt Nam</div>
                                </td>
                                <td>
                                    <span>0101248141</span>
                                </td>
                                <td>
                                    <span class="list">Hàng hóa</span>
                                </td>
                                <td>
                                    <span class="font-bold">--</span>
                                </td>
                                <td>
                                    <span class="font-bold">--</span>
                                </td>
                                <td>
                                    <span class="badge text-[14px]">Chưa đánh giá</span>
                                </td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <a href="report-evaluate.php" class="more-single bg-blue !text-white !border-[#0a4976]">Đánh giá</a>
                                        <a href="" class="more-single">Xóa</a>
                                    </div>
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
