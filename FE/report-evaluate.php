<?php include 'header.php'; ?>
<main class="main-container pl-[280px]">
    <?php include 'sidebar.php'; ?>
    <div class="main-content p-10">
        <div class="flex items-center justify-between border-b border-solid border-[#e2e8f0] pb-8 mb-8">
            <div class="block">
                <div class="page-title">Khảo sát & Đánh giá</div>
                <p>Nhà cung cấp: <span class="font-bold text-blue">Công ty Cổ phần MISA</span> (Hàng hóa)</p>
            </div>
        </div>

        <div class="grid grid-cols-4 gap-5 mb-8 text-center">
            <div class="item-tab overflow-hidden rounded-4 p-4 bg-white border border-solid border-[#e2e8f0] active" data-tab="tab-1">
                <div class="font-bold">A · Uy tín NCC</div>
                <p class="text-[14px]">Trọng số 25%</p>
            </div>
            <div class="item-tab overflow-hidden rounded-4 p-4 bg-white border border-solid border-[#e2e8f0]" data-tab="tab-2">
                <div class="font-bold">B · Năng lực NCC</div>
                <p class="text-[14px]">Trọng số 30%</p>
            </div>
            <div class="item-tab overflow-hidden rounded-4 p-4 bg-white border border-solid border-[#e2e8f0]" data-tab="tab-3">
                <div class="font-bold">C · Năng lực thực thi</div>
                <p class="text-[14px]">Trọng số 30%</p>
            </div>
            <div class="item-tab overflow-hidden rounded-4 p-4 bg-white border border-solid border-[#e2e8f0]" data-tab="tab-4">
                <div class="font-bold">D · Phát triển ESG</div>
                <p class="text-[14px]">Trọng số 15%</p>
            </div>
        </div>

        <div class="relative grid grid-cols-12 gap-5">
            <div class="item col-span-9">
                <div class="tab-content active" id="tab-1">
                    <div class="block block-evaluate relative bg-white overflow-hidden rounded-4 bg-white border border-solid border-[#e2e8f0] mb-6 last:mb-0">
                        <div class="head-item-eval relative cursor-pointer p-4">
                            <div class="font-bold text-blue">A1 · Tư cách pháp lý & Hồ sơ pháp nhân</div>
                            <div class="text-[12px]">Trọng số 20.8% · 6 tiêu chí con</div>
                        </div>
                        <div class="desc-eval p-4 border-t border-solid border-[#e2e8f0]" style="display: block">
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[A1.1] Giấy phép đăng ký kinh doanh</div>
                                    <p class="text-[14px]">→ Có giấy phép kinh doanh hợp lệ, ngành nghề phù hợp với hàng hóa/dịch vụ cung cấp</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[A1.2] Tư cách hợp lệ theo Luật Đấu thầu (Điều 5)</div>
                                    <p class="text-[14px]">→ Không thuộc danh sách bị cấm tham dự; không vi phạm khoản 1 Điều 20 NĐ214</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[A1.3] Thời gian hoạt động trong ngành CNTT</div>
                                    <p class="text-[14px]">→ ≥5 năm: 5đ | 3–5 năm: 4đ | 1–3 năm: 3đ | <1 năm: 1đ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[A1.4] Tình trạng hoạt động liên tục (không phá sản/giải thể)</div>
                                    <p class="text-[14px]">→ Đang hoạt động ổn định, không có lịch sử phá sản/tái cơ cấu do thua lỗ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[A1.5] Chứng nhận/phê duyệt của cơ quan quản lý ngành</div>
                                    <p class="text-[14px]">→ Có đủ chứng chỉ hành nghề, phê duyệt của NHNN/Bộ TTTT theo loại hàng hóa/dịch vụ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[A1.6] Cấu trúc sở hữu & quản trị doanh nghiệp</div>
                                    <p class="text-[14px]">→ Cơ cấu sở hữu minh bạch, rõ ràng, không có xung đột lợi ích với ngân hàng</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="block block-evaluate relative bg-white overflow-hidden rounded-4 bg-white border border-solid border-[#e2e8f0] mb-6 last:mb-0">
                        <div class="head-item-eval relative cursor-pointer p-4">
                            <div class="font-bold text-blue">A2 · Lịch sử vi phạm & Kỷ luật đấu thầu</div>
                            <div class="text-[12px]">Trọng số 20.8% · 6 tiêu chí con</div>
                        </div>
                        <div class="desc-eval p-4 border-t border-solid border-[#e2e8f0]">
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[A2.1] Lịch sử vi phạm trong 3 năm gần nhất (Điều 20 NĐ214)</div>
                                    <p class="text-[14px]">→ Không có vi phạm: 5đ | Vi phạm nhỏ đã khắc phục: 3đ | Vi phạm nghiêm trọng: 1đ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[A2.2] Tình trạng trên CSDL quốc gia về nhà thầu (Điều 19 NĐ214)</div>
                                    <p class="text-[14px]">→ Không có thông tin vi phạm trên hệ thống mạng đấu thầu quốc gia</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[A2.3] Số lần bị chấm dứt hợp đồng do lỗi nhà cung cấp</div>
                                    <p class="text-[14px]">→ 0 lần: 5đ | 1 lần: 3đ | ≥2 lần: 1đ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[A2.4] Số lần bị phạt/bồi thường hợp đồng</div>
                                    <p class="text-[14px]">→ Không có: 5đ | Có nhưng đã giải quyết: 3đ | Đang tranh chấp: 1đ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[A2.5] Tranh chấp pháp lý đang xử lý liên quan đến hợp đồng CNTT</div>
                                    <p class="text-[14px]">→ Không có: 5đ | Có nhưng nhỏ: 3đ | Tranh chấp lớn/kiện tụng: 1đ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[A2.6] Nhân sự bị kết án hình sự liên quan đấu thầu (Điều 20 NĐ214)</div>
                                    <p class="text-[14px]">→ Không có trong 3 năm gần nhất theo quy định pháp luật về hình sự</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="block block-evaluate relative bg-white overflow-hidden rounded-4 bg-white border border-solid border-[#e2e8f0] mb-6 last:mb-0">
                        <div class="head-item-eval relative cursor-pointer p-4">
                            <div class="font-bold text-blue">A3 · Danh tiếng & Tham chiếu từ khách hàng</div>
                            <div class="text-[12px]">Trọng số 20.8% · 6 tiêu chí con</div>
                        </div>
                        <div class="desc-eval p-4 border-t border-solid border-[#e2e8f0]">
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[A3.1] Số lượng khách hàng là ngân hàng/TCTD tại Việt Nam</div>
                                    <p class="text-[14px]">→ ≥5 ngân hàng: 5đ | 3–4: 4đ | 1–2: 3đ | 0: 1đ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[A3.2] Thư tham chiếu/đánh giá từ khách hàng cũ</div>
                                    <p class="text-[14px]">→ ≥3 thư tích cực từ TCTD: 5đ | 1–2 thư: 3đ | Không có: 1đ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[A3.3] Xếp hạng/giải thưởng trong ngành CNTT ngân hàng</div>
                                    <p class="text-[14px]">→ Có giải thưởng uy tín quốc tế/quốc gia (IDC, Gartner, VNBA…)</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[A3.4] Đánh giá của tổ chức phân tích độc lập (Gartner/IDC)</div>
                                    <p class="text-[14px]">→ Được xếp hạng tích cực trong Magic Quadrant hoặc IDC MarketScape</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[A3.5] Phản hồi từ BIDV về lịch sử hợp tác (nếu có)</div>
                                    <p class="text-[14px]">→ Đánh giá nội bộ BIDV từ các lần hợp tác trước (nếu có)</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[A3.6] Mức độ hiện diện thị trường (market share tại VN)</div>
                                    <p class="text-[14px]">→ Thị phần dẫn đầu phân khúc: 5đ | Top 3: 4đ | Khác: 2đ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="block block-evaluate relative bg-white overflow-hidden rounded-4 bg-white border border-solid border-[#e2e8f0] mb-6 last:mb-0">
                        <div class="head-item-eval relative cursor-pointer p-4">
                            <div class="font-bold text-blue">A4 · Minh bạch & Chống tham nhũng</div>
                            <div class="text-[12px]">Trọng số 20.8% · 6 tiêu chí con</div>
                        </div>
                        <div class="desc-eval p-4 border-t border-solid border-[#e2e8f0]">
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[A4.1] Chính sách chống tham nhũng, hối lộ</div>
                                    <p class="text-[14px]">→ Có chính sách bằng văn bản, ban hành nội bộ và công khai</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[A4.2] Tuân thủ quy định phòng chống rửa tiền (AML)</div>
                                    <p class="text-[14px]">→ Có quy trình AML/KYC phù hợp quy định NHNN và pháp luật VN</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[A4.3] Công khai báo cáo tài chính hàng năm</div>
                                    <p class="text-[14px]">→ Báo cáo được kiểm toán độc lập và công bố đúng hạn</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[A4.4] Không có xung đột lợi ích với BIDV</div>
                                    <p class="text-[14px]">→ Không có quan hệ sở hữu/thân nhân với cán bộ BIDV theo quy định</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[A4.5] Tuân thủ nghĩa vụ thuế (kê khai và nộp thuế)</div>
                                    <p class="text-[14px]">→ Không nợ thuế quá hạn; kê khai đầy đủ (tiêu chí năng lực tài chính – NĐ214 Điều 10)</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[A4.6] Tuân thủ quy định bảo mật thông tin ngân hàng</div>
                                    <p class="text-[14px]">→ Cam kết và thực thi bảo mật thông tin khách hàng/ngân hàng theo TT09/2020/TT-NHNN</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="block block-evaluate relative bg-white overflow-hidden rounded-4 bg-white border border-solid border-[#e2e8f0] mb-6 last:mb-0">
                        <div class="head-item-eval relative cursor-pointer p-4">
                            <div class="font-bold text-blue">A5 · Quan hệ đối tác & Chứng nhận quốc tế</div>
                            <div class="text-[12px]">Trọng số 20.8% · 6 tiêu chí con</div>
                        </div>
                        <div class="desc-eval p-4 border-t border-solid border-[#e2e8f0]">
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[A5.1] Đối tác được ủy quyền của nhà sản xuất (Authorization Partner)</div>
                                    <p class="text-[14px]">→ Có giấy ủy quyền chính thức từ nhà sản xuất gốc (OEM) – căn cứ xác minh nguồn gốc hàng hóa</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[A5.2] Chứng nhận ISO 9001 (Quản lý chất lượng)</div>
                                    <p class="text-[14px]">→ ISO 9001:2015 còn hiệu lực: 5đ | Đang xây dựng: 3đ | Không có: 1đ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[A5.3] Chứng nhận ISO 27001 (Bảo mật thông tin)</div>
                                    <p class="text-[14px]">→ ISO 27001 còn hiệu lực – bắt buộc với nhà cung cấp dịch vụ CNTT ngân hàng</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[A5.4] Đối tác ưu tiên của các tập đoàn CNTT lớn (Microsoft/Cisco/…)</div>
                                    <p class="text-[14px]">→ Gold/Platinum Partner: 5đ | Silver: 4đ | Không có: 2đ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[A5.5] Tham gia Hiệp hội CNTT/Ngân hàng trong nước (VNISA, VINASA…)</div>
                                    <p class="text-[14px]">→ Thành viên tích cực của hiệp hội uy tín trong ngành</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[A5.6] Thứ hạng tín nhiệm/đánh giá tài chính từ TCTD</div>
                                    <p class="text-[14px]">→ Có xếp hạng tín nhiệm hoặc đánh giá tích cực từ tổ chức tài chính</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-content" id="tab-2">
                    <div class="block block-evaluate relative bg-white overflow-hidden rounded-4 bg-white border border-solid border-[#e2e8f0] mb-6 last:mb-0">
                        <div class="head-item-eval relative cursor-pointer p-4">
                            <div class="font-bold text-blue">B1 · Năng lực tài chính</div>
                            <div class="text-[12px]">Trọng số 20.8% · 7 tiêu chí con</div>
                        </div>
                        <div class="desc-eval p-4 border-t border-solid border-[#e2e8f0]" style="display: block">
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[B1.1] Doanh thu hàng năm (3 năm gần nhất)</div>
                                    <p class="text-[14px]">→ ≥200 tỷ VND: 5đ | 100–200 tỷ: 4đ | 50–100 tỷ: 3đ | <50 tỷ: 1đ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[B1.2] Giá trị tài sản ròng (Net Asset Value)</div>
                                    <p class="text-[14px]">→ Tài sản ròng dương, tăng trưởng ổn định trong 3 năm liên tiếp</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[B1.3] Hệ số thanh khoản (Current Ratio)</div>
                                    <p class="text-[14px]">→ ≥2.0: 5đ | 1.5–2.0: 4đ | 1.0–1.5: 3đ | <1.0: 1đ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[B1.4] Tỷ lệ nợ/vốn chủ sở hữu (D/E Ratio)</div>
                                    <p class="text-[14px]">→ D/E <1: 5đ | 1–2: 4đ | 2–3: 3đ | >3: 1đ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">→ D/E <1: 5đ | 1–2: 4đ | 2–3: 3đ | >3: 1đ</div>
                                    <p class="text-[14px]">→ Có lãi liên tục 3 năm: 5đ | 2 năm: 3đ | <2 năm: 1đ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[B1.6] Khả năng huy động vốn/bảo lãnh thực hiện hợp đồng</div>
                                    <p class="text-[14px]">→ Có thư bảo lãnh ngân hàng phù hợp quy mô gói thầu</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[B1.7] Không có nợ xấu/nợ quá hạn tại các TCTD</div>
                                    <p class="text-[14px]">→ Không có nợ xấu nhóm 3–5 tại bất kỳ TCTD nào</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="block block-evaluate relative bg-white overflow-hidden rounded-4 bg-white border border-solid border-[#e2e8f0] mb-6 last:mb-0">
                        <div class="head-item-eval relative cursor-pointer p-4">
                            <div class="font-bold text-blue">B2 · Năng lực kỹ thuật & Công nghệ</div>
                            <div class="text-[12px]">Trọng số 20.8% · 6 tiêu chí con</div>
                        </div>
                        <div class="desc-eval p-4 border-t border-solid border-[#e2e8f0]">
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[B2.1] Cơ sở hạ tầng kỹ thuật (phòng lab, server, thiết bị thử nghiệm)</div>
                                    <p class="text-[14px]">→ Có đủ cơ sở vật chất kỹ thuật phục vụ thực hiện hợp đồng</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[B2.2] Năng lực nghiên cứu và phát triển (R&D)</div>
                                    <p class="text-[14px]">→ Có đội ngũ R&D, ngân sách R&D từ ≥3% doanh thu</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">→ Có đội ngũ R&D, ngân sách R&D từ ≥3% doanh thu</div>
                                    <p class="text-[14px]">→ Điểm kỹ thuật theo yêu cầu cụ thể của từng gói thầu (đạt/không đạt hoặc chấm điểm)</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[B2.4] Năng lực tích hợp hệ thống với hạ tầng CNTT ngân hàng</div>
                                    <p class="text-[14px]">[B2.4] Năng lực tích hợp hệ thống với hạ tầng CNTT ngân hàng</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[B2.5] Bản quyền phần mềm và giấy phép sử dụng hợp lệ</div>
                                    <p class="text-[14px]">→ Sản phẩm có bản quyền đầy đủ, không vi phạm SHTT</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[B2.6] Năng lực bảo mật & an ninh thông tin của sản phẩm/dịch vụ</div>
                                    <p class="text-[14px]">→ Có kiểm thử bảo mật (pentest), vá lỗi kịp thời, tuân thủ PCI DSS nếu liên quan thẻ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[B2.7] Hỗ trợ đa nền tảng và khả năng tương thích hệ thống</div>
                                    <p class="text-[14px]">[B2.7] Hỗ trợ đa nền tảng và khả năng tương thích hệ thống</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="block block-evaluate relative bg-white overflow-hidden rounded-4 bg-white border border-solid border-[#e2e8f0] mb-6 last:mb-0">
                        <div class="head-item-eval relative cursor-pointer p-4">
                            <div class="font-bold text-blue">B3 · Năng lực nhân sự</div>
                            <div class="text-[12px]">Trọng số 20.8% · 6 tiêu chí con</div>
                        </div>
                        <div class="desc-eval p-4 border-t border-solid border-[#e2e8f0]">
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[B3.1] Số lượng nhân sự kỹ thuật chuyên trách</div>
                                    <p class="text-[14px]">→ ≥50 kỹ sư: 5đ | 20–50: 4đ | 10–20: 3đ | <10: 1đ (tùy quy mô gói thầu)</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[B3.2] Trình độ chuyên môn của nhân sự chủ chốt</div>
                                    <p class="text-[14px]">→ ≥70% có bằng đại học kỹ thuật CNTT trở lên; có chứng chỉ quốc tế</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[B3.3] Chứng chỉ chuyên môn quốc tế (CISSP, CISA, PMP, AWS, v.v.)</div>
                                    <p class="text-[14px]">→ Số lượng và cấp độ chứng chỉ liên quan đến loại hàng hóa/dịch vụ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[B3.4] Chuyên gia có kinh nghiệm dự án ngân hàng/tài chính</div>
                                    <p class="text-[14px]">→ Chuyên gia có ≥3 năm kinh nghiệm triển khai tại ngân hàng</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[B3.5] Tỷ lệ giữ chân nhân sự (Retention Rate)</div>
                                    <p class="text-[14px]">→ ≥85%: 5đ | 70–85%: 4đ | 55–70%: 3đ | <55%: 1đ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[B3.6] Chính sách đào tạo và phát triển nhân lực nội bộ</div>
                                    <p class="text-[14px]">→ Có chương trình đào tạo có hệ thống, ngân sách đào tạo hàng năm</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[B3.7] Nhân sự dự phòng cho vị trí chủ chốt</div>
                                    <p class="text-[14px]">→ Có phương án thay thế nhân sự chủ chốt khi cần thiết (Điều 45 NĐ214)</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="block block-evaluate relative bg-white overflow-hidden rounded-4 bg-white border border-solid border-[#e2e8f0] mb-6 last:mb-0">
                        <div class="head-item-eval relative cursor-pointer p-4">
                            <div class="font-bold text-blue">B4 · Kinh nghiệm thực hiện hợp đồng tương tự</div>
                            <div class="text-[12px]">Trọng số 20.8% · 6 tiêu chí con</div>
                        </div>
                        <div class="desc-eval p-4 border-t border-solid border-[#e2e8f0]">
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[B4.1] Số lượng hợp đồng tương tự đã thực hiện (5 năm gần nhất)</div>
                                    <p class="text-[14px]">→ ≥5 hợp đồng: 5đ | 3–4: 4đ | 1–2: 3đ | 0: 1đ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[B4.2] Giá trị hợp đồng lớn nhất đã thực hiện thành công</div>
                                    <p class="text-[14px]">→ Giá trị ≥ dự toán gói thầu hiện tại: 5đ | 50–100%: 3đ | <50%: 1đ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[B4.3] Kinh nghiệm tại các ngân hàng quy mô tương đương BIDV</div>
                                    <p class="text-[14px]">→ Có hợp đồng với Top 5 NHTM Việt Nam: 5đ | Ngân hàng khác: 3đ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[B4.4] Dự án có độ phức tạp tương đương (số lượng chi nhánh, user)</div>
                                    <p class="text-[14px]">→ Kinh nghiệm triển khai quy mô lớn (>100 chi nhánh)</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[B4.5] Hợp đồng đã và đang thực hiện với BIDV (nếu có)</div>
                                    <p class="text-[14px]">→ Lịch sử hợp tác tích cực với BIDV trong 5 năm gần nhất</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[B4.6] Mức độ hoàn thành đúng tiến độ của các hợp đồng trước</div>
                                    <p class="text-[14px]">→ ≥90% hợp đồng hoàn thành đúng hạn: 5đ | 70–90%: 3đ | <70%: 1đ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[B4.7] Kinh nghiệm cung cấp dịch vụ bảo trì dài hạn (>3 năm)</div>
                                    <p class="text-[14px]">→ Có hợp đồng bảo trì/hỗ trợ kỹ thuật dài hạn với khách hàng lớn</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="block block-evaluate relative bg-white overflow-hidden rounded-4 bg-white border border-solid border-[#e2e8f0] mb-6 last:mb-0">
                        <div class="head-item-eval relative cursor-pointer p-4">
                            <div class="font-bold text-blue">B5 · Năng lực sản xuất & Chuỗi cung ứng</div>
                            <div class="text-[12px]">Trọng số 20.8% · 6 tiêu chí con</div>
                        </div>
                        <div class="desc-eval p-4 border-t border-solid border-[#e2e8f0]">
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[B5.1] Quan hệ với nhà sản xuất gốc (OEM) & chuỗi phân phối</div>
                                    <p class="text-[14px]">→ Đại lý cấp 1/đối tác ủy quyền trực tiếp của OEM</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[B5.2] Khả năng cung ứng số lượng lớn theo yêu cầu đột xuất</div>
                                    <p class="text-[14px]">→ Có kho dự trữ/cam kết thời gian giao hàng cụ thể</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[B5.3] Quản lý rủi ro chuỗi cung ứng (nguồn thay thế)</div>
                                    <p class="text-[14px]">→ Có ít nhất 2 nguồn cung thay thế cho sản phẩm chủ lực</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[B5.4] Quy trình kiểm soát chất lượng đầu vào (QC/QA)</div>
                                    <p class="text-[14px]">→ Có quy trình QC/QA tài liệu hóa và thực hiện nghiêm túc</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[B5.5] Năng lực kho bãi, logistics và giao nhận</div>
                                    <p class="text-[14px]">→ Có kho bãi đạt chuẩn, hệ thống theo dõi vận chuyển</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[B5.6] Khả năng cung cấp linh kiện thay thế trong thời gian bảo hành</div>
                                    <p class="text-[14px]">→ Cam kết thời gian cung cấp linh kiện thay thế <24h</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-content" id="tab-3">
                    <div class="block block-evaluate relative bg-white overflow-hidden rounded-4 bg-white border border-solid border-[#e2e8f0] mb-6 last:mb-0">
                        <div class="head-item-eval relative cursor-pointer p-4">
                            <div class="font-bold text-blue">C1 · Chất lượng thực hiện hợp đồng (đánh giá nhà cung cấp & sản phẩm/dịch vụ)</div>
                            <div class="text-[12px]">Trọng số 20.8% · 7 tiêu chí con</div>
                        </div>
                        <div class="desc-eval p-4 border-t border-solid border-[#e2e8f0]" style="display: block">
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C1.1] [NCC] Tỷ lệ nghiệm thu đạt yêu cầu ngay lần đầu (First Pass Rate)</div>
                                    <p class="text-[14px]">→ ≥95% hạng mục nghiệm thu đạt ngay lần đầu: 5đ | 85–95%: 4đ | 75–85%: 3đ | <75%: 1đ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C1.2] [NCC] Chất lượng quản lý và điều phối đội ngũ triển khai</div>
                                    <p class="text-[14px]">→ Đội ngũ được tổ chức rõ ràng, có đầu mối liên lạc, phản hồi kịp thời</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C1.3] [NCC] Chất lượng tài liệu bàn giao (hồ sơ kỹ thuật, hướng dẫn vận hành)</div>
                                    <p class="text-[14px]">→ Tài liệu đầy đủ, chuẩn xác, tiếng Việt/song ngữ theo yêu cầu hợp đồng</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C1.4] [NCC] Chất lượng dịch vụ tư vấn – giá trị thực tiễn của báo cáo/khuyến nghị</div>
                                    <p class="text-[14px]">→ Báo cáo/tư vấn có giá trị ứng dụng thực tế, được BIDV áp dụng vào hoạt động</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C1.5] [NCC] Sự hài lòng của người dùng cuối (khảo sát nội bộ BIDV)</div>
                                    <p class="text-[14px]">→ Điểm satisfaction ≥4/5: 5đ | 3.5–4: 4đ | 3–3.5: 3đ | <3: 1đ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C1.6] [SP] Mức độ đáp ứng yêu cầu kỹ thuật so với cam kết hợp đồng</div>
                                    <p class="text-[14px]">→ Đạt 100% tối thiểu yêu cầu kỹ thuật theo HSYC và hợp đồng: 5đ | 90–100%: 3đ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C1.7] [SP] Kết quả kiểm thử chấp nhận người dùng (UAT/SAT)</div>
                                    <p class="text-[14px]">→ Vượt qua UAT/SAT với ≥95% test cases: 5đ | 85–95%: 3đ | <85%: 1đ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C1.8] [SP] Độ ổn định và tin cậy của sản phẩm sau khi đưa vào vận hành</div>
                                    <p class="text-[14px]">→ Không có lỗi nghiêm trọng (P1/P2) trong 3 tháng đầu sau golive: 5đ | 1–2 sự cố: 3đ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C1.9] [SP] Tính bảo mật của sản phẩm/dịch vụ khi triển khai thực tế</div>
                                    <p class="text-[14px]">→ Không có lỗ hổng bảo mật nghiêm trọng phát hiện sau golive; đã qua kiểm thử pentest</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C1.10] [SP] Khả năng tương thích và tích hợp thực tế với hệ thống BIDV</div>
                                    <p class="text-[14px]">→ Tích hợp thành công với các hệ thống BIDV theo đúng thiết kế kỹ thuật đã phê duyệt</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="block block-evaluate relative bg-white overflow-hidden rounded-4 bg-white border border-solid border-[#e2e8f0] mb-6 last:mb-0">
                        <div class="head-item-eval relative cursor-pointer p-4">
                            <div class="font-bold text-blue">C2 · Tuân thủ tiến độ & Quản lý dự án</div>
                            <div class="text-[12px]">Trọng số 20.8% · 6 tiêu chí con</div>
                        </div>
                        <div class="desc-eval p-4 border-t border-solid border-[#e2e8f0]">
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C2.1] Tỷ lệ hoàn thành đúng tiến độ cam kết</div>
                                    <p class="text-[14px]">→ ≥95%: 5đ | 85–95%: 4đ | 75–85%: 3đ | <75%: 1đ  </p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C2.2] Phương pháp luận quản lý dự án được áp dụng</div>
                                    <p class="text-[14px]">→ Có áp dụng PMI/PRINCE2/Agile/Waterfall phù hợp với đặc thù dự án</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C2.3] Năng lực báo cáo tiến độ định kỳ cho BIDV</div>
                                    <p class="text-[14px]">→ Báo cáo đúng hạn, đầy đủ nội dung, cảnh báo sớm rủi ro theo biểu mẫu BIDV</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C2.4] Xử lý thay đổi phạm vi (Change Management)</div>
                                    <p class="text-[14px]">→ Quy trình xử lý thay đổi rõ ràng, không phát sinh tranh chấp ngoài phạm vi hợp đồng</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C2.5] Khả năng xử lý sự cố khẩn cấp ảnh hưởng hoạt động ngân hàng</div>
                                    <p class="text-[14px]">→ Có quy trình P1/P2 incident với SLA cam kết cụ thể</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C2.6] Quản lý rủi ro và kế hoạch dự phòng dự án</div>
                                    <p class="text-[14px]">→ Có Risk Register và Contingency Plan được phê duyệt</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C2.7] Không tự ý thay đổi nhân sự chủ chốt khi chưa được chấp thuận</div>
                                    <p class="text-[14px]">→ Tuân thủ điều khoản nhân sự theo Điều 45 NĐ214</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="block block-evaluate relative bg-white overflow-hidden rounded-4 bg-white border border-solid border-[#e2e8f0] mb-6 last:mb-0">
                        <div class="head-item-eval relative cursor-pointer p-4">
                            <div class="font-bold text-blue">C3 · Dịch vụ bảo hành, bảo trì & Hỗ trợ kỹ thuật</div>
                            <div class="text-[12px]">Trọng số 20.8% · 6 tiêu chí con</div>
                        </div>
                        <div class="desc-eval p-4 border-t border-solid border-[#e2e8f0]">
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C3.1] Cam kết SLA bảo hành (thời gian phản hồi và khắc phục)</div>
                                    <p class="text-[14px]">→ Response <4h, Resolve <8h (P1): 5đ | <8h/<24h: 4đ | Chưa cam kết: 2đ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C3.2] Thời gian bảo hành tối thiểu cam kết</div>
                                    <p class="text-[14px]">→ ≥24 tháng: 5đ | 12–24 tháng: 3đ | <12 tháng: 1đ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C3.3] Chất lượng và tốc độ hỗ trợ kỹ thuật (Helpdesk/NOC)</div>
                                    <p class="text-[14px]">→ Có Helpdesk 24/7, NOC, hệ thống ticketing; SLA đo lường được</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C3.4] Năng lực cung cấp bản vá lỗi, cập nhật phiên bản (patch management)</div>
                                    <p class="text-[14px]">→ Vá lỗi bảo mật critical trong <24h; bản cập nhật định kỳ theo lịch</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C3.5] Hỗ trợ onsite khi cần thiết (bao gồm chi nhánh vùng sâu/xa)</div>
                                    <p class="text-[14px]">→ Có đội kỹ thuật onsite hoặc cam kết thời gian di chuyển <4h</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C3.6] Cung cấp đào tạo vận hành cho cán bộ BIDV</div>
                                    <p class="text-[14px]">→ Có chương trình đào tạo chuyển giao kiến thức sau triển khai</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C3.7] Tài liệu kỹ thuật và hướng dẫn vận hành bằng tiếng Việt</div>
                                    <p class="text-[14px]">→ Tài liệu đầy đủ bằng tiếng Việt hoặc song ngữ (Việt–Anh)</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="block block-evaluate relative bg-white overflow-hidden rounded-4 bg-white border border-solid border-[#e2e8f0] mb-6 last:mb-0">
                        <div class="head-item-eval relative cursor-pointer p-4">
                            <div class="font-bold text-blue">C4 · Tuân thủ pháp lý & Điều khoản hợp đồng</div>
                            <div class="text-[12px]">Trọng số 20.8% · 6 tiêu chí con</div>
                        </div>
                        <div class="desc-eval p-4 border-t border-solid border-[#e2e8f0]">
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C4.1] Tuân thủ điều kiện, điều khoản hợp đồng (không thương thảo lại các cam kết cốt lõi)</div>
                                    <p class="text-[14px]"> → Không vi phạm các điều khoản cốt lõi của hợp đồng đã ký</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C4.2] Thực hiện bảo lãnh thực hiện hợp đồng đầy đủ, đúng hạn</div>
                                    <p class="text-[14px]">→ Nộp bảo lãnh đúng hạn, đúng hình thức theo quy định NĐ214</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C4.3] Không để xảy ra tranh chấp/kiện tụng hợp đồng</div>
                                    <p class="text-[14px]">→ 0 vụ tranh chấp với BIDV: 5đ | 1 vụ nhỏ đã xử lý: 3đ | Nhiều vụ: 1đ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C4.4] Tuân thủ quy định bảo mật thông tin trong quá trình thực hiện</div>
                                    <p class="text-[14px]">→ Có NDA, tuân thủ chính sách bảo mật BIDV trong suốt vòng đời hợp đồng</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C4.5] Xử lý khiếu nại/kiến nghị trong thời hạn quy định (Điều 22 NĐ214)</div>
                                    <p class="text-[14px]">→ Phản hồi khiếu nại trong 7 ngày làm việc theo quy định NĐ214</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C4.6] Tuân thủ quy trình nghiệm thu theo Quy định BIDV (Mục 7 QĐ3082)</div>
                                    <p class="text-[14px]">→ Tham gia đầy đủ quy trình nghiệm thu, ký biên bản đúng hạn</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C4.7] Tuân thủ ưu tiên sản phẩm CNTT nội địa (TT40/2020/TT-BTTTT)</div>
                                    <p class="text-[14px]">→ Ưu tiên sản phẩm CNTT sản xuất trong nước được Bộ TTTT xác nhận</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="block block-evaluate relative bg-white overflow-hidden rounded-4 bg-white border border-solid border-[#e2e8f0] mb-6 last:mb-0">
                        <div class="head-item-eval relative cursor-pointer p-4">
                            <div class="font-bold text-blue">C5 · Khả năng ứng phó rủi ro & Liên tục kinh doanh</div>
                            <div class="text-[12px]">Trọng số 20.8% · 6 tiêu chí con</div>
                        </div>
                        <div class="desc-eval p-4 border-t border-solid border-[#e2e8f0]">
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C5.1] Kế hoạch liên tục kinh doanh (BCP/DRP) của nhà cung cấp</div>
                                    <p class="text-[14px]">→ Có BCP/DRP được kiểm thử hàng năm: 5đ | Có nhưng chưa test: 3đ | Không có: 1đ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C5.2] Trung tâm dữ liệu dự phòng (DR Site) đạt chuẩn</div>
                                    <p class="text-[14px]">→ Có DR Site tại data center đạt chuẩn Uptime Institute Tier 3+</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C5.3] Khả năng scale up/down theo nhu cầu của BIDV</div>
                                    <p class="text-[14px]">→ Cam kết mở rộng năng lực trong <1 tháng khi BIDV có yêu cầu</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C5.4] Quản lý rủi ro bên thứ ba (Third Party Risk Management)</div>
                                    <p class="text-[14px]">→ Có quy trình đánh giá nhà thầu phụ; không thuê lại toàn bộ gói thầu</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C5.5] Bảo hiểm trách nhiệm nghề nghiệp và bảo hiểm rủi ro</div>
                                    <p class="text-[14px]">→ Có hợp đồng bảo hiểm phù hợp với loại rủi ro của dịch vụ cung cấp</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[C5.6] Kế hoạch chuyển giao khi kết thúc hợp đồng (Exit Plan)</div>
                                    <p class="text-[14px]">→ Có Exit Plan rõ ràng, hỗ trợ bàn giao đầy đủ cho nhà cung cấp mới</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-content" id="tab-4">
                    <div class="block block-evaluate relative bg-white overflow-hidden rounded-4 bg-white border border-solid border-[#e2e8f0] mb-6 last:mb-0">
                        <div class="head-item-eval relative cursor-pointer p-4">
                            <div class="font-bold text-blue">D1 · Môi trường – Nhà cung cấp (Environmental – Supplier)</div>
                            <div class="text-[12px]">Trọng số 20.8% · 7 tiêu chí con</div>
                        </div>
                        <div class="desc-eval p-4 border-t border-solid border-[#e2e8f0]" style="display: block">
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[D1.1] [NCC] Chính sách giảm thiểu phát thải carbon và Net Zero</div>
                                    <p class="text-[14px]">→ Có mục tiêu giảm phát thải bằng văn bản, báo cáo định kỳ (GHG Protocol)</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[D1.2] [NCC] Chứng nhận ISO 14001 (Hệ thống quản lý môi trường)</div>
                                    <p class="text-[14px]">→ ISO 14001:2015 còn hiệu lực: 5đ | Đang xây dựng: 3đ | Không có: 1đ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[D1.3] [NCC] Chứng nhận ISO 50001 (Quản lý năng lượng) hoặc tương đương</div>
                                    <p class="text-[14px]">→ Có chiến lược và hệ thống quản lý năng lượng theo ISO 50001</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[D1.4] [NCC] Chính sách tái chế và xử lý thiết bị cuối vòng đời (WEEE)</div>
                                    <p class="text-[14px]">→ Có chương trình thu hồi thiết bị cũ, xử lý đúng quy định môi trường VN</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[D1.5] [NCC] Cam kết và lộ trình sử dụng năng lượng tái tạo (RE100/tương đương)</div>
                                    <p class="text-[14px]">→ Có cam kết hoặc đang trong lộ trình chuyển sang năng lượng tái tạo</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[D1.6] [NCC] Tham gia đánh giá ESG bởi tổ chức độc lập (EcoVadis, CDP…)</div>
                                    <p class="text-[14px]">→ Được đánh giá tích cực bởi tổ chức ESG uy tín quốc tế</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[D1.7] [NCC] Lộ trình Net Zero với mốc thời gian cụ thể (SBTi hoặc tương đương)</div>
                                    <p class="text-[14px]">→ Có mục tiêu giảm phát thải dựa trên khoa học (Science-Based Targets)</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="block block-evaluate relative bg-white overflow-hidden rounded-4 bg-white border border-solid border-[#e2e8f0] mb-6 last:mb-0">
                        <div class="head-item-eval relative cursor-pointer p-4">
                            <div class="font-bold text-blue">D2 · Môi trường – Sản phẩm/Dịch vụ (Environmental – Product/Service)</div>
                            <div class="text-[12px]">Trọng số 20.8% · 6 tiêu chí con</div>
                        </div>
                        <div class="desc-eval p-4 border-t border-solid border-[#e2e8f0]">
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">Môi trường – Sản phẩm/Dịch vụ (Environmental – Product/Service)</div>
                                    <p class="text-[14px]">→ Thiết bị đạt chứng nhận ENERGY STAR (theo Phụ lục 01 QĐ3082)</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[D2.2] [SP] Chứng nhận EPEAT (Gold/Silver/Bronze) cho sản phẩm điện tử</div>
                                    <p class="text-[14px]">→ Sản phẩm được xếp hạng EPEAT phù hợp theo Phụ lục 01 QĐ3082</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[D2.3] [SP] Chứng nhận TCO Certified (bền vững toàn diện sản phẩm CNTT)</div>
                                    <p class="text-[14px]">→ Sản phẩm có nhãn TCO Certified (môi trường + xã hội + an ninh mạng)</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[D2.4] [SP] Chỉ số PUE của data center/dịch vụ cloud (nếu áp dụng)</div>
                                    <p class="text-[14px]">→ PUE ≤1.4: 5đ | 1.4–1.6: 4đ | 1.6–2.0: 3đ | >2.0: 1đ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[D2.5] [SP] Sử dụng vật liệu tái chế/thân thiện môi trường trong sản phẩm</div>
                                    <p class="text-[14px]">→ Tỷ lệ vật liệu tái chế ≥20%: 5đ | 10–20%: 3đ | <10%: 1đ</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[D2.6] [SP/DV] Sản phẩm/dịch vụ hỗ trợ chuyển đổi số xanh của ngân hàng</div>
                                    <p class="text-[14px]">→ Giải pháp giúp BIDV giảm tiêu thụ năng lượng/giấy tờ/in ấn</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[D2.7] [SP] Ưu tiên sản phẩm CNTT sản xuất trong nước (TT40/2020/TT-BTTTT)</div>
                                    <p class="text-[14px]">→ Sản phẩm/giải pháp nội địa được Bộ TTTT xác nhận; áp dụng ưu đãi</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="block block-evaluate relative bg-white overflow-hidden rounded-4 bg-white border border-solid border-[#e2e8f0] mb-6 last:mb-0">
                        <div class="head-item-eval relative cursor-pointer p-4">
                            <div class="font-bold text-blue">D3 · Xã hội (Social – Nhà cung cấp & chuỗi cung ứng)</div>
                            <div class="text-[12px]">Trọng số 20.8% · 6 tiêu chí con</div>
                        </div>
                        <div class="desc-eval p-4 border-t border-solid border-[#e2e8f0]">
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[D3.1] [NCC] Chính sách sức khỏe và an toàn nghề nghiệp (ISO 45001)</div>
                                    <p class="text-[14px]">→ Có chính sách OHS tài liệu hóa; chứng nhận ISO 45001 là lợi thế</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[D3.2] [NCC] Tuân thủ quy định lao động (không lao động trẻ em, cưỡng bức)</div>
                                    <p class="text-[14px]">→ Tuân thủ Bộ Luật Lao động VN và các tiêu chuẩn cốt lõi ILO</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[D3.3] [NCC] Chính sách bình đẳng, không phân biệt đối xử và đa dạng</div>
                                    <p class="text-[14px]">→ Có chính sách EDI (Equity, Diversity & Inclusion) bằng văn bản và thực thi</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[D3.4] [NCC] Trách nhiệm xã hội doanh nghiệp (CSR) – chương trình cộng đồng</div>
                                    <p class="text-[14px]">→ Có ngân sách CSR và hoạt động cộng đồng có thể xác minh</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[D3.5] [NCC] Chính sách phúc lợi nhân viên vượt mức tối thiểu pháp luật</div>
                                    <p class="text-[14px]">→ Bảo hiểm, phúc lợi bổ sung, Work-Life Balance, lương cạnh tranh</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[D3.6] [NCC] Trách nhiệm trong chuỗi cung ứng (Responsible Sourcing)</div>
                                    <p class="text-[14px]">→ Có chính sách kiểm tra điều kiện lao động tại nhà thầu phụ/đối tác</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="block block-evaluate relative bg-white overflow-hidden rounded-4 bg-white border border-solid border-[#e2e8f0] mb-6 last:mb-0">
                        <div class="head-item-eval relative cursor-pointer p-4">
                            <div class="font-bold text-blue">D4 · Quản trị bền vững (Governance)</div>
                            <div class="text-[12px]">Trọng số 20.8% · 6 tiêu chí con</div>
                        </div>
                        <div class="desc-eval p-4 border-t border-solid border-[#e2e8f0]">
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[D4.1] [NCC] Cơ cấu quản trị doanh nghiệp bền vững (Board Diversity & Independence)</div>
                                    <p class="text-[14px]">→ Có thành viên HĐQT độc lập, đa dạng về chuyên môn và giới tính</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[D4.2] [NCC] Công bố thông tin ESG (Báo cáo phát triển bền vững định kỳ)</div>
                                    <p class="text-[14px]">→ Có báo cáo ESG hàng năm theo GRI Standards hoặc khung tương đương</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[D4.3] [NCC] Chính sách quản lý rủi ro khí hậu (TCFD Framework)</div>
                                    <p class="text-[14px]">→ Có đánh giá rủi ro khí hậu theo TCFD hoặc đang xây dựng</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[D4.4] [NCC] Tuân thủ ISO 26000 (Hướng dẫn trách nhiệm xã hội)</div>
                                    <p class="text-[14px]">→ Áp dụng hướng dẫn ISO 26000 trong hoạt động kinh doanh hàng ngày</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[D4.5] [SP/DV] Chính sách bảo vệ dữ liệu người dùng (Nghị định 13/2023)</div>
                                    <p class="text-[14px]">→ Tuân thủ NĐ13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân và thông lệ GDPR</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                            <div class="block p-4 rounded-4 bg-white border border-solid border-[#e2e8f0] mb-5 last:mb-0">
                                <div class="top mb-4">
                                    <div class="font-bold text-blue">[D4.6] [DV] Ứng dụng AI/ML để tối ưu hóa tiêu thụ tài nguyên và năng lượng</div>
                                    <p class="text-[14px]">→ Sử dụng công nghệ để giảm footprint vận hành dịch vụ CNTT</p>
                                </div>
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="item col-span-2">
                                        <p class="text-[14px] mb-2">Điểm đánh giá</p>
                                        <select class="outline-none w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                            <option value="">5 - Xuất sắc</option>
                                            <option value="">4 - Tốt</option>
                                            <option value="">3 - Đạt</option>
                                            <option value="">2- Dưới mức</option>
                                            <option value="">1 - Không đạt</option>
                                        </select>
                                    </div>
                                    <div class="item col-span-3">
                                        <p class="text-[14px] mb-2">Ghi chú</p>
                                        <input type="text" class="txt_field w-full px-4 h-10 rounded-2 border border-solid border-[#e2e8f0]">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item col-span-3">
                <div class="sticky top-5 left-0 z-2 bg-blue overflow-hidden rounded-4 p-6 text-white">
                    <div class="text-center font-bold text-[18px] pb-4 mb-4 border-b border-solid border-[#ebebeb1f]">Bảng điểm thời gian thực</div>
                    <div class="block pb-5 mb-5 border-b border-dashed border-[#ebebeb1f]">
                        <ul>
                            <li class="flex items-center justify-between mb-2 last:mb-0">
                                <span class="opacity-80">A. Uy tín nhà cung cấp</span>
                                <span class="text-[18px] font-bold">0</span>
                            </li>
                            <li class="flex items-center justify-between mb-2 last:mb-0">
                                <span class="opacity-80">B. Năng lực nhà cung cấp</span>
                                <span class="text-[18px] font-bold">80</span>
                            </li>
                            <li class="flex items-center justify-between mb-2 last:mb-0">
                                <span class="opacity-80">C. Thực thi hợp đồng</span>
                                <span class="text-[18px] font-bold">90</span>
                            </li>
                            <li class="flex items-center justify-between mb-2 last:mb-0">
                                <span class="opacity-80">D. Phát triển bền vững</span>
                                <span class="text-[18px] font-bold">96</span>
                            </li>
                        </ul>
                    </div>
                    <div class="total flex items-center justify-between mb-5">
                        <span class="text-[18px]">Tổng điểm </span>
                        <span class="text-[24px] font-bold">96</span>
                    </div>
                    <div class="mb-6 text-center text-[12px]">Đã nhập: 0 / 120 tiêu chí</div>
                    <div class="mb-5 text-center bg-white px-2 py-2 text-red font-bold rounded-8">D – Yếu kém, xem xét chấm dứt</div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="item">
                            <button class="text-white bg-[#c5a85c] h-10 !px-4 rounded-2 font-bold w-full">Hoàn thành</button>
                        </div>
                        <div class="item">
                            <button class="text-blue bg-white h-10 !px-4 rounded-2 font-bold w-full">Lưu nháp</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
<?php include 'footer.php'; ?>
