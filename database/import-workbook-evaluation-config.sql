-- Import cấu hình đánh giá từ workbook Bộ_tiêu_chí_đánh_giá_NCC_CNTT_17062026.xlsx
-- Chạy bằng mysql client với UTF-8:
-- docker compose exec -T mysql mysql --default-character-set=utf8mb4 -uncc_user -pncc_pass ncc_db < database/import-workbook-evaluation-config.sql

SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;
SET CHARACTER SET utf8mb4;

DELIMITER //
DROP PROCEDURE IF EXISTS add_eval_criteria_column//
CREATE PROCEDURE add_eval_criteria_column(IN p_column_name VARCHAR(64), IN p_column_definition TEXT)
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'evaluation_criteria'
      AND COLUMN_NAME = p_column_name
  ) THEN
    SET @ddl = CONCAT('ALTER TABLE evaluation_criteria ADD COLUMN ', p_column_name, ' ', p_column_definition);
    PREPARE stmt FROM @ddl;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
  END IF;
END//
DELIMITER ;

CALL add_eval_criteria_column('layer1Code', 'VARCHAR(40) NULL');
CALL add_eval_criteria_column('layer1Name', 'VARCHAR(255) NULL');
CALL add_eval_criteria_column('applicableType', 'VARCHAR(120) NULL');
CALL add_eval_criteria_column('reference', 'TEXT NULL');
CALL add_eval_criteria_column('source', 'TEXT NULL');
DROP PROCEDURE IF EXISTS add_eval_criteria_column;

SET @config_id = UUID();

UPDATE evaluation_configs SET isDefault = FALSE;

INSERT INTO evaluation_configs
  (id, name, description, isActive, isDefault, useCriterionWeights, evaluationPeriod, scaleMin, scaleMax, createdAt, updatedAt)
VALUES
  (@config_id, 'Bộ tiêu chí đánh giá NCC CNTT 17062026', 'Import từ workbook Bộ_tiêu_chí_đánh_giá_NCC_CNTT_17062026.xlsx', TRUE, TRUE, TRUE, '2026-Q2', 1, 5, NOW(), NOW());

SET @group_A_id = UUID();
INSERT INTO evaluation_groups (id, code, name, weight, sortOrder, isActive, configId)
VALUES (@group_A_id, 'A', 'UY TÍN NHÀ CUNG CẤP', 25, 1, TRUE, @config_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'A1.1', 'Giấy phép đăng ký kinh doanh', '[A1.1] Giấy phép đăng ký kinh doanh
→ Có giấy phép kinh doanh hợp lệ, ngành nghề phù hợp với hàng hóa/dịch vụ cung cấp', 'A1', 'Tư cách pháp lý & Hồ sơ pháp nhân', 'Hàng hóa, TV, PTV', '• Luật Doanh nghiệp số 59/2020/QH14 – Tư cách pháp nhân
  https://thuvienphapluat.vn/van-ban/Doanh-nghiep/Luat-Doanh-nghiep-2020-428454.aspx
• Luật Đấu thầu số 22/2023/QH15 (sửa đổi 2024)
  https://thuvienphapluat.vn/van-ban/Dau-tu/Luat-Dau-thau-2023-22-2023-QH15-521746.aspx', '④ Thông tin công khai – Cổng thông tin quốc gia về đăng ký doanh nghiệp
https://dangkykinhdoanh.gov.vn
② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)', 3.470137, 1, TRUE, @group_A_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'A1.2', 'Tư cách hợp lệ theo Luật Đấu thầu (Điều 5)', '[A1.2] Tư cách hợp lệ theo Luật Đấu thầu (Điều 5)
→ Không thuộc danh sách bị cấm tham dự; không vi phạm khoản 1 Điều 20 NĐ214', 'A1', 'Tư cách pháp lý & Hồ sơ pháp nhân', 'Hàng hóa, TV, PTV', '• Luật Đấu thầu số 22/2023/QH15 (sửa đổi 2024)
  https://thuvienphapluat.vn/van-ban/Dau-tu/Luat-Dau-thau-2023-22-2023-QH15-521746.aspx
• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP', '④ Thông tin công khai – CSDL quốc gia về nhà thầu (Điều 19 NĐ214)
https://muasamcong.mpi.gov.vn
② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)', 3.470137, 2, TRUE, @group_A_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'A1.3', 'Thời gian hoạt động trong ngành CNTT', '[A1.3] Thời gian hoạt động trong ngành CNTT
→ ≥5 năm: 5đ | 3–5 năm: 4đ | 1–3 năm: 3đ | <1 năm: 1đ', 'A1', 'Tư cách pháp lý & Hồ sơ pháp nhân', 'Hàng hóa, TV, PTV', '• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '④ Thông tin công khai – Cổng thông tin quốc gia về đăng ký doanh nghiệp
https://dangkykinhdoanh.gov.vn
② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)', 3.470137, 3, TRUE, @group_A_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'A1.4', 'Tình trạng hoạt động liên tục (không phá sản/giải thể)', '[A1.4] Tình trạng hoạt động liên tục (không phá sản/giải thể)
→ Đang hoạt động ổn định, không có lịch sử phá sản/tái cơ cấu do thua lỗ', 'A1', 'Tư cách pháp lý & Hồ sơ pháp nhân', 'Hàng hóa, TV, PTV', '• Luật Doanh nghiệp số 59/2020/QH14 – Tư cách pháp nhân
  https://thuvienphapluat.vn/van-ban/Doanh-nghiep/Luat-Doanh-nghiep-2020-428454.aspx
• Luật Đấu thầu số 22/2023/QH15 (sửa đổi 2024)
  https://thuvienphapluat.vn/van-ban/Dau-tu/Luat-Dau-thau-2023-22-2023-QH15-521746.aspx', '④ Thông tin công khai – Cổng thông tin quốc gia về đăng ký doanh nghiệp
https://dangkykinhdoanh.gov.vn
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 3.470137, 4, TRUE, @group_A_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'A1.5', 'Chứng nhận/phê duyệt của cơ quan quản lý ngành', '[A1.5] Chứng nhận/phê duyệt của cơ quan quản lý ngành
→ Có đủ chứng chỉ hành nghề, phê duyệt của NHNN/Bộ TTTT theo loại hàng hóa/dịch vụ', 'A1', 'Tư cách pháp lý & Hồ sơ pháp nhân', 'Hàng hóa, TV, PTV', '• Thông tư 09/2020/TT-NHNN – An ninh thông tin ngân hàng
  https://thuvienphapluat.vn/van-ban/Tien-te-Ngan-hang/Thong-tu-09-2020-TT-NHNN
• Thông tư 40/2020/TT-BTTTT – Ưu tiên sản phẩm CNTT trong nước
  https://thuvienphapluat.vn/van-ban/Cong-nghe-thong-tin/Thong-tu-40-2020-TT-BTTTT', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
③ Thông tin cập nhật từ nhà cung cấp
(văn bản, báo cáo, chứng nhận do NCC chủ động cung cấp/cập nhật định kỳ)', 3.470137, 5, TRUE, @group_A_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'A1.6', 'Cấu trúc sở hữu & quản trị doanh nghiệp', '[A1.6] Cấu trúc sở hữu & quản trị doanh nghiệp
→ Cơ cấu sở hữu minh bạch, rõ ràng, không có xung đột lợi ích với ngân hàng', 'A1', 'Tư cách pháp lý & Hồ sơ pháp nhân', 'Hàng hóa, TV, PTV', '• Luật Doanh nghiệp số 59/2020/QH14 – Tư cách pháp nhân
  https://thuvienphapluat.vn/van-ban/Doanh-nghiep/Luat-Doanh-nghiep-2020-428454.aspx
• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '④ Thông tin công khai – Cổng thông tin quốc gia về đăng ký doanh nghiệp
https://dangkykinhdoanh.gov.vn
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 3.470137, 6, TRUE, @group_A_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'A2.1', 'Lịch sử vi phạm trong 3 năm gần nhất (Điều 20 NĐ214)', '[A2.1] Lịch sử vi phạm trong 3 năm gần nhất (Điều 20 NĐ214)
→ Không có vi phạm: 5đ | Vi phạm nhỏ đã khắc phục: 3đ | Vi phạm nghiêm trọng: 1đ', 'A2', 'Lịch sử vi phạm & Kỷ luật đấu thầu', 'Hàng hóa, TV, PTV', '• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP
• Luật Đấu thầu số 22/2023/QH15 (sửa đổi 2024)
  https://thuvienphapluat.vn/van-ban/Dau-tu/Luat-Dau-thau-2023-22-2023-QH15-521746.aspx', '④ Thông tin công khai – Hệ thống mạng đấu thầu quốc gia
https://muasamcong.mpi.gov.vn/web/guest/organizations-violators', 3.470137, 7, TRUE, @group_A_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'A2.2', 'Tình trạng trên CSDL quốc gia về nhà thầu (Điều 19 NĐ214)', '[A2.2] Tình trạng trên CSDL quốc gia về nhà thầu (Điều 19 NĐ214)
→ Không có thông tin vi phạm trên hệ thống mạng đấu thầu quốc gia', 'A2', 'Lịch sử vi phạm & Kỷ luật đấu thầu', 'Hàng hóa, TV, PTV', '• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP', '④ Thông tin công khai – CSDL quốc gia về nhà thầu (Điều 19 NĐ214)
https://muasamcong.mpi.gov.vn', 3.470137, 8, TRUE, @group_A_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'A2.3', 'Số lần bị chấm dứt hợp đồng do lỗi nhà cung cấp', '[A2.3] Số lần bị chấm dứt hợp đồng do lỗi nhà cung cấp
→ 0 lần: 5đ | 1 lần: 3đ | ≥2 lần: 1đ', 'A2', 'Lịch sử vi phạm & Kỷ luật đấu thầu', 'Hàng hóa, TV, PTV', '• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP
• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '① Hồ sơ/đánh giá nội bộ BIDV
(lịch sử hợp đồng, biên bản nghiệm thu, phản hồi đơn vị sử dụng – lưu trữ B.ONE)
③ Khảo sát tham chiếu khách hàng (Reference Check)
(BIDV liên hệ trực tiếp khách hàng cũ của NCC để xác minh thông tin)', 3.470137, 9, TRUE, @group_A_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'A2.4', 'Số lần bị phạt/bồi thường hợp đồng', '[A2.4] Số lần bị phạt/bồi thường hợp đồng
→ Không có: 5đ | Có nhưng đã giải quyết: 3đ | Đang tranh chấp: 1đ', 'A2', 'Lịch sử vi phạm & Kỷ luật đấu thầu', 'Hàng hóa, PTV', '• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE
• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP', '① Hồ sơ/đánh giá nội bộ BIDV
(lịch sử hợp đồng, biên bản nghiệm thu, phản hồi đơn vị sử dụng – lưu trữ B.ONE)', 3.470137, 10, TRUE, @group_A_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'A2.5', 'Tranh chấp pháp lý đang xử lý liên quan đến hợp đồng CNTT', '[A2.5] Tranh chấp pháp lý đang xử lý liên quan đến hợp đồng CNTT
→ Không có: 5đ | Có nhưng nhỏ: 3đ | Tranh chấp lớn/kiện tụng: 1đ', 'A2', 'Lịch sử vi phạm & Kỷ luật đấu thầu', 'Hàng hóa, TV, PTV', '• Luật Đấu thầu số 22/2023/QH15 (sửa đổi 2024)
  https://thuvienphapluat.vn/van-ban/Dau-tu/Luat-Dau-thau-2023-22-2023-QH15-521746.aspx
• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP', '④ Thông tin công khai – Cổng thông tin điện tử Tòa án nhân dân
https://congbobanan.toaan.gov.vn (tra cứu án lệ, bản án liên quan)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 3.470137, 11, TRUE, @group_A_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'A2.6', 'Nhân sự bị kết án hình sự liên quan đấu thầu (Điều 20 NĐ214)', '[A2.6] Nhân sự bị kết án hình sự liên quan đấu thầu (Điều 20 NĐ214)
→ Không có trong 3 năm gần nhất theo quy định pháp luật về hình sự', 'A2', 'Lịch sử vi phạm & Kỷ luật đấu thầu', 'Hàng hóa, TV, PTV', '• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP', '④ Thông tin công khai – Cổng thông tin điện tử Tòa án nhân dân
https://congbobanan.toaan.gov.vn (tra cứu án lệ, bản án liên quan)
④ Thông tin công khai – Hệ thống mạng đấu thầu quốc gia
https://muasamcong.mpi.gov.vn/web/guest/organizations-violators', 3.470137, 12, TRUE, @group_A_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'A3.1', 'Số lượng khách hàng là ngân hàng/TCTD tại Việt Nam', '[A3.1] Số lượng khách hàng là ngân hàng/TCTD tại Việt Nam
→ ≥5 ngân hàng: 5đ | 3–4: 4đ | 1–2: 3đ | 0: 1đ', 'A3', 'Danh tiếng & Tham chiếu từ khách hàng', 'Hàng hóa, TV, PTV', '• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
③ Khảo sát tham chiếu khách hàng (Reference Check)
(BIDV liên hệ trực tiếp khách hàng cũ của NCC để xác minh thông tin)', 3.470137, 13, TRUE, @group_A_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'A3.2', 'Thư tham chiếu/đánh giá từ khách hàng cũ', '[A3.2] Thư tham chiếu/đánh giá từ khách hàng cũ
→ ≥3 thư tích cực từ TCTD: 5đ | 1–2 thư: 3đ | Không có: 1đ', 'A3', 'Danh tiếng & Tham chiếu từ khách hàng', 'Hàng hóa, TV, PTV', '• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE
• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
③ Khảo sát tham chiếu khách hàng (Reference Check)
(BIDV liên hệ trực tiếp khách hàng cũ của NCC để xác minh thông tin)', 3.470137, 14, TRUE, @group_A_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'A3.3', 'Xếp hạng/giải thưởng trong ngành CNTT ngân hàng', '[A3.3] Xếp hạng/giải thưởng trong ngành CNTT ngân hàng
→ Có giải thưởng uy tín quốc tế/quốc gia (IDC, Gartner, VNBA…)', 'A3', 'Danh tiếng & Tham chiếu từ khách hàng', 'Hàng hóa, PTV', '• Gartner Magic Quadrant – Đánh giá độc lập nhà cung cấp công nghệ
  https://www.gartner.com/en/research/methodologies/magic-quadrants-research
• IDC MarketScape – Đánh giá thị trường công nghệ thông tin
  https://www.idc.com/getdoc.jsp?containerId=IDC_P39536', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 3.470137, 15, TRUE, @group_A_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'A3.4', 'Đánh giá của tổ chức phân tích độc lập (Gartner/IDC)', '[A3.4] Đánh giá của tổ chức phân tích độc lập (Gartner/IDC)
→ Được xếp hạng tích cực trong Magic Quadrant hoặc IDC MarketScape', 'A3', 'Danh tiếng & Tham chiếu từ khách hàng', 'Hàng hóa', '• Gartner Magic Quadrant – Đánh giá độc lập nhà cung cấp công nghệ
  https://www.gartner.com/en/research/methodologies/magic-quadrants-research
• IDC MarketScape – Đánh giá thị trường công nghệ thông tin
  https://www.idc.com/getdoc.jsp?containerId=IDC_P39536', '④ Thông tin công khai – Báo cáo Gartner/IDC
(https://www.gartner.com, https://www.idc.com – mua quyền truy cập hoặc bản tóm tắt công khai)', 3.470137, 16, TRUE, @group_A_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'A3.5', 'Phản hồi từ BIDV về lịch sử hợp tác (nếu có)', '[A3.5] Phản hồi từ BIDV về lịch sử hợp tác (nếu có)
→ Đánh giá nội bộ BIDV từ các lần hợp tác trước (nếu có)', 'A3', 'Danh tiếng & Tham chiếu từ khách hàng', 'Hàng hóa, TV, PTV', '• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE
• Quy định BIDV số 3082 – Trình tự thủ tục ĐTMS thuê TSDV CNTT
  Nội bộ BIDV – B.ONE', '① Hồ sơ/đánh giá nội bộ BIDV
(lịch sử hợp đồng, biên bản nghiệm thu, phản hồi đơn vị sử dụng – lưu trữ B.ONE)', 3.470137, 17, TRUE, @group_A_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'A3.6', 'Mức độ hiện diện thị trường (market share tại VN)', '[A3.6] Mức độ hiện diện thị trường (market share tại VN)
→ Thị phần dẫn đầu phân khúc: 5đ | Top 3: 4đ | Khác: 2đ', 'A3', 'Danh tiếng & Tham chiếu từ khách hàng', 'Hàng hóa, PTV', '• Gartner Magic Quadrant – Đánh giá độc lập nhà cung cấp công nghệ
  https://www.gartner.com/en/research/methodologies/magic-quadrants-research
• IDC MarketScape – Đánh giá thị trường công nghệ thông tin
  https://www.idc.com/getdoc.jsp?containerId=IDC_P39536', '④ Thông tin công khai – Báo cáo Gartner/IDC
(https://www.gartner.com, https://www.idc.com – mua quyền truy cập hoặc bản tóm tắt công khai)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 3.470137, 18, TRUE, @group_A_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'A4.1', 'Chính sách chống tham nhũng, hối lộ', '[A4.1] Chính sách chống tham nhũng, hối lộ
→ Có chính sách bằng văn bản, ban hành nội bộ và công khai', 'A4', 'Minh bạch & Chống tham nhũng', 'Hàng hóa, TV, PTV', '• ISO 26000:2010 – Hướng dẫn trách nhiệm xã hội
  https://www.iso.org/iso-26000-social-responsibility.html
• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
③ Thông tin cập nhật từ nhà cung cấp
(văn bản, báo cáo, chứng nhận do NCC chủ động cung cấp/cập nhật định kỳ)', 3.470137, 19, TRUE, @group_A_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'A4.2', 'Tuân thủ quy định phòng chống rửa tiền (AML)', '[A4.2] Tuân thủ quy định phòng chống rửa tiền (AML)
→ Có quy trình AML/KYC phù hợp quy định NHNN và pháp luật VN', 'A4', 'Minh bạch & Chống tham nhũng', 'TV, PTV', '• Luật PCRT số 14/2022/QH15 – Phòng chống rửa tiền
  https://thuvienphapluat.vn/van-ban/Tien-te-Ngan-hang/Luat-Phong-chong-rua-tien-2022-14-2022-QH15
• Thông tư 09/2020/TT-NHNN – An ninh thông tin ngân hàng
  https://thuvienphapluat.vn/van-ban/Tien-te-Ngan-hang/Thong-tu-09-2020-TT-NHNN', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 3.470137, 20, TRUE, @group_A_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'A4.3', 'Công khai báo cáo tài chính hàng năm', '[A4.3] Công khai báo cáo tài chính hàng năm
→ Báo cáo được kiểm toán độc lập và công bố đúng hạn', 'A4', 'Minh bạch & Chống tham nhũng', 'Hàng hóa, TV, PTV', '• Luật Doanh nghiệp số 59/2020/QH14 – Tư cách pháp nhân
  https://thuvienphapluat.vn/van-ban/Doanh-nghiep/Luat-Doanh-nghiep-2020-428454.aspx
• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP', '④ Thông tin công khai – Báo cáo tài chính/BCTC kiểm toán
(công bố trên website doanh nghiệp, UBCKNN/HNX/HSX nếu là công ty niêm yết)', 3.470137, 21, TRUE, @group_A_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'A4.4', 'Không có xung đột lợi ích với BIDV', '[A4.4] Không có xung đột lợi ích với BIDV
→ Không có quan hệ sở hữu/thân nhân với cán bộ BIDV theo quy định', 'A4', 'Minh bạch & Chống tham nhũng', 'Hàng hóa, TV, PTV', '• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE
• Luật Đấu thầu số 22/2023/QH15 (sửa đổi 2024)
  https://thuvienphapluat.vn/van-ban/Dau-tu/Luat-Dau-thau-2023-22-2023-QH15-521746.aspx', '① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)
① Hồ sơ/đánh giá nội bộ BIDV
(lịch sử hợp đồng, biên bản nghiệm thu, phản hồi đơn vị sử dụng – lưu trữ B.ONE)', 3.470137, 22, TRUE, @group_A_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'A4.5', 'Tuân thủ nghĩa vụ thuế (kê khai và nộp thuế)', '[A4.5] Tuân thủ nghĩa vụ thuế (kê khai và nộp thuế)
→ Không nợ thuế quá hạn; kê khai đầy đủ (tiêu chí năng lực tài chính – NĐ214 Điều 10)', 'A4', 'Minh bạch & Chống tham nhũng', 'Hàng hóa, TV, PTV', '• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP
• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '④ Thông tin công khai – Cổng thông tin Tổng cục Thuế
https://www.gdt.gov.vn (tra cứu tình trạng nộp thuế, nợ thuế)', 3.470137, 23, TRUE, @group_A_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'A4.6', 'Tuân thủ quy định bảo mật thông tin ngân hàng', '[A4.6] Tuân thủ quy định bảo mật thông tin ngân hàng
→ Cam kết và thực thi bảo mật thông tin khách hàng/ngân hàng theo TT09/2020/TT-NHNN', 'A4', 'Minh bạch & Chống tham nhũng', 'TV, PTV', '• Thông tư 09/2020/TT-NHNN – An ninh thông tin ngân hàng
  https://thuvienphapluat.vn/van-ban/Tien-te-Ngan-hang/Thong-tu-09-2020-TT-NHNN
• ISO/IEC 27001:2022 – Hệ thống quản lý an toàn thông tin
  https://www.iso.org/standard/27001', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 3.470137, 24, TRUE, @group_A_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'A5.1', 'Đối tác được ủy quyền của nhà sản xuất (Authorization Partner)', '[A5.1] Đối tác được ủy quyền của nhà sản xuất (Authorization Partner)
→ Có giấy ủy quyền chính thức từ nhà sản xuất gốc (OEM) – căn cứ xác minh nguồn gốc hàng hóa', 'A5', 'Quan hệ đối tác & Chứng nhận quốc tế', 'Hàng hóa', '• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE
• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
④ Thông tin công khai – Cổng tra cứu đối tác ủy quyền của hãng (OEM Partner Portal)
(ví dụ: Cisco Partner Locator, Microsoft Partner Center…)', 2.786119, 25, TRUE, @group_A_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'A5.2', 'Chứng nhận ISO 9001 (Quản lý chất lượng)', '[A5.2] Chứng nhận ISO 9001 (Quản lý chất lượng)
→ ISO 9001:2015 còn hiệu lực: 5đ | Đang xây dựng: 3đ | Không có: 1đ', 'A5', 'Quan hệ đối tác & Chứng nhận quốc tế', 'Hàng hóa, TV, PTV', '• ISO 9001:2015 – Hệ thống quản lý chất lượng
  https://www.iso.org/iso-9001-quality-management.html', '④ Thông tin công khai – Cổng tra cứu chứng chỉ của tổ chức chứng nhận
(IAF CertSearch: https://www.iafcertsearch.org hoặc website tổ chức cấp chứng nhận)
② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)', 2.786119, 26, TRUE, @group_A_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'A5.3', 'Chứng nhận ISO 27001 (Bảo mật thông tin)', '[A5.3] Chứng nhận ISO 27001 (Bảo mật thông tin)
→ ISO 27001 còn hiệu lực – bắt buộc với nhà cung cấp dịch vụ CNTT ngân hàng', 'A5', 'Quan hệ đối tác & Chứng nhận quốc tế', 'PTV, TV', '• ISO/IEC 27001:2022 – Hệ thống quản lý an toàn thông tin
  https://www.iso.org/standard/27001
• Thông tư 09/2020/TT-NHNN – An ninh thông tin ngân hàng
  https://thuvienphapluat.vn/van-ban/Tien-te-Ngan-hang/Thong-tu-09-2020-TT-NHNN
• Phụ lục QĐ3082 BIDV – Danh mục tiêu chuẩn đánh giá mua sắm bền vững
  Nội bộ BIDV – B.ONE', '④ Thông tin công khai – Cổng tra cứu chứng chỉ của tổ chức chứng nhận
(IAF CertSearch: https://www.iafcertsearch.org hoặc website tổ chức cấp chứng nhận)
② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)', 2.786119, 27, TRUE, @group_A_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'A5.4', 'Đối tác ưu tiên của các tập đoàn CNTT lớn (Microsoft/Cisco/…)', '[A5.4] Đối tác ưu tiên của các tập đoàn CNTT lớn (Microsoft/Cisco/…)
→ Gold/Platinum Partner: 5đ | Silver: 4đ | Không có: 2đ', 'A5', 'Quan hệ đối tác & Chứng nhận quốc tế', 'Hàng hóa, PTV', '• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '④ Thông tin công khai – Cổng tra cứu đối tác ủy quyền của hãng (OEM Partner Portal)
(ví dụ: Cisco Partner Locator, Microsoft Partner Center…)
② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)', 2.786119, 28, TRUE, @group_A_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'A5.5', 'Tham gia Hiệp hội CNTT/Ngân hàng trong nước (VNISA, VINASA…)', '[A5.5] Tham gia Hiệp hội CNTT/Ngân hàng trong nước (VNISA, VINASA…)
→ Thành viên tích cực của hiệp hội uy tín trong ngành', 'A5', 'Quan hệ đối tác & Chứng nhận quốc tế', 'Hàng hóa, TV, PTV', '• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
③ Thông tin cập nhật từ nhà cung cấp
(văn bản, báo cáo, chứng nhận do NCC chủ động cung cấp/cập nhật định kỳ)', 2.786119, 29, TRUE, @group_A_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'A5.6', 'Thứ hạng tín nhiệm/đánh giá tài chính từ TCTD', '[A5.6] Thứ hạng tín nhiệm/đánh giá tài chính từ TCTD
→ Có xếp hạng tín nhiệm hoặc đánh giá tích cực từ tổ chức tài chính', 'A5', 'Quan hệ đối tác & Chứng nhận quốc tế', 'Hàng hóa, PTV', '• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP', '④ Thông tin công khai – Trung tâm Thông tin Tín dụng Quốc gia (CIC)
https://cic.org.vn (tra cứu nợ xấu, xếp hạng tín dụng – qua đầu mối QLRR/QHKH)', 2.786119, 30, TRUE, @group_A_id);

SET @group_B_id = UUID();
INSERT INTO evaluation_groups (id, code, name, weight, sortOrder, isActive, configId)
VALUES (@group_B_id, 'B', 'NĂNG LỰC NHÀ CUNG CẤP', 30, 2, TRUE, @config_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'B1.1', 'Doanh thu hàng năm (3 năm gần nhất)', '[B1.1] Doanh thu hàng năm (3 năm gần nhất)
→ ≥200 tỷ VND: 5đ | 100–200 tỷ: 4đ | 50–100 tỷ: 3đ | <50 tỷ: 1đ', 'B1', 'Năng lực tài chính', 'Hàng hóa, PTV', '• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP
• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
④ Thông tin công khai – Báo cáo tài chính/BCTC kiểm toán
(công bố trên website doanh nghiệp, UBCKNN/HNX/HSX nếu là công ty niêm yết)', 2.974403, 1, TRUE, @group_B_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'B1.2', 'Giá trị tài sản ròng (Net Asset Value)', '[B1.2] Giá trị tài sản ròng (Net Asset Value)
→ Tài sản ròng dương, tăng trưởng ổn định trong 3 năm liên tiếp', 'B1', 'Năng lực tài chính', 'Hàng hóa, TV, PTV', '• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
④ Thông tin công khai – Báo cáo tài chính/BCTC kiểm toán
(công bố trên website doanh nghiệp, UBCKNN/HNX/HSX nếu là công ty niêm yết)', 2.974403, 2, TRUE, @group_B_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'B1.3', 'Hệ số thanh khoản (Current Ratio)', '[B1.3] Hệ số thanh khoản (Current Ratio)
→ ≥2.0: 5đ | 1.5–2.0: 4đ | 1.0–1.5: 3đ | <1.0: 1đ', 'B1', 'Năng lực tài chính', 'Hàng hóa, PTV', '• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP', '④ Thông tin công khai – Báo cáo tài chính/BCTC kiểm toán
(công bố trên website doanh nghiệp, UBCKNN/HNX/HSX nếu là công ty niêm yết)
② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)', 2.974403, 3, TRUE, @group_B_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'B1.4', 'Tỷ lệ nợ/vốn chủ sở hữu (D/E Ratio)', '[B1.4] Tỷ lệ nợ/vốn chủ sở hữu (D/E Ratio)
→ D/E <1: 5đ | 1–2: 4đ | 2–3: 3đ | >3: 1đ', 'B1', 'Năng lực tài chính', 'Hàng hóa, PTV', '• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP', '④ Thông tin công khai – Báo cáo tài chính/BCTC kiểm toán
(công bố trên website doanh nghiệp, UBCKNN/HNX/HSX nếu là công ty niêm yết)
② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)', 2.974403, 4, TRUE, @group_B_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'B1.5', 'Lợi nhuận sau thuế (3 năm liên tiếp)', '[B1.5] Lợi nhuận sau thuế (3 năm liên tiếp)
→ Có lãi liên tục 3 năm: 5đ | 2 năm: 3đ | <2 năm: 1đ', 'B1', 'Năng lực tài chính', 'Hàng hóa, TV, PTV', '• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP
• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '④ Thông tin công khai – Báo cáo tài chính/BCTC kiểm toán
(công bố trên website doanh nghiệp, UBCKNN/HNX/HSX nếu là công ty niêm yết)
② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)', 2.974403, 5, TRUE, @group_B_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'B1.6', 'Khả năng huy động vốn/bảo lãnh thực hiện hợp đồng', '[B1.6] Khả năng huy động vốn/bảo lãnh thực hiện hợp đồng
→ Có thư bảo lãnh ngân hàng phù hợp quy mô gói thầu', 'B1', 'Năng lực tài chính', 'Hàng hóa, PTV', '• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP
• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)', 2.974403, 6, TRUE, @group_B_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'B1.7', 'Không có nợ xấu/nợ quá hạn tại các TCTD', '[B1.7] Không có nợ xấu/nợ quá hạn tại các TCTD
→ Không có nợ xấu nhóm 3–5 tại bất kỳ TCTD nào', 'B1', 'Năng lực tài chính', 'Hàng hóa, PTV', '• Thông tư 09/2020/TT-NHNN – An ninh thông tin ngân hàng
  https://thuvienphapluat.vn/van-ban/Tien-te-Ngan-hang/Thong-tu-09-2020-TT-NHNN
• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP', '④ Thông tin công khai – Trung tâm Thông tin Tín dụng Quốc gia (CIC)
https://cic.org.vn (tra cứu nợ xấu, xếp hạng tín dụng – qua đầu mối QLRR/QHKH)', 2.974403, 7, TRUE, @group_B_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'B2.1', 'Cơ sở hạ tầng kỹ thuật (phòng lab, server, thiết bị thử nghiệm)', '[B2.1] Cơ sở hạ tầng kỹ thuật (phòng lab, server, thiết bị thử nghiệm)
→ Có đủ cơ sở vật chất kỹ thuật phục vụ thực hiện hợp đồng', 'B2', 'Năng lực kỹ thuật & Công nghệ', 'Hàng hóa, PTV', '• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE
• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP', '① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)
② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)', 2.974403, 8, TRUE, @group_B_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'B2.2', 'Năng lực nghiên cứu và phát triển (R&D)', '[B2.2] Năng lực nghiên cứu và phát triển (R&D)
→ Có đội ngũ R&D, ngân sách R&D từ ≥3% doanh thu', 'B2', 'Năng lực kỹ thuật & Công nghệ', 'Hàng hóa, PTV', '• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
③ Thông tin cập nhật từ nhà cung cấp
(văn bản, báo cáo, chứng nhận do NCC chủ động cung cấp/cập nhật định kỳ)', 2.974403, 9, TRUE, @group_B_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'B2.3', 'Sản phẩm/giải pháp đáp ứng yêu cầu kỹ thuật theo HSYC', '[B2.3] Sản phẩm/giải pháp đáp ứng yêu cầu kỹ thuật theo HSYC
→ Điểm kỹ thuật theo yêu cầu cụ thể của từng gói thầu (đạt/không đạt hoặc chấm điểm)', 'B2', 'Năng lực kỹ thuật & Công nghệ', 'Hàng hóa, PTV', '• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP
• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
① Kiểm thử/đánh giá thực tế của BIDV
(pentest độc lập, UAT/SAT, đo SLA thực tế trong quá trình vận hành)', 2.974403, 10, TRUE, @group_B_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'B2.4', 'Năng lực tích hợp hệ thống với hạ tầng CNTT ngân hàng', '[B2.4] Năng lực tích hợp hệ thống với hạ tầng CNTT ngân hàng
→ Kinh nghiệm tích hợp với Core Banking, Switch, T24, v.v.', 'B2', 'Năng lực kỹ thuật & Công nghệ', 'Hàng hóa, PTV', '• Quy định BIDV số 3082 – Trình tự thủ tục ĐTMS thuê TSDV CNTT
  Nội bộ BIDV – B.ONE
• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
① Kiểm thử/đánh giá thực tế của BIDV
(pentest độc lập, UAT/SAT, đo SLA thực tế trong quá trình vận hành)', 2.974403, 11, TRUE, @group_B_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'B2.5', 'Bản quyền phần mềm và giấy phép sử dụng hợp lệ', '[B2.5] Bản quyền phần mềm và giấy phép sử dụng hợp lệ
→ Sản phẩm có bản quyền đầy đủ, không vi phạm SHTT', 'B2', 'Năng lực kỹ thuật & Công nghệ', 'Hàng hóa', '• Thông tư 40/2020/TT-BTTTT – Ưu tiên sản phẩm CNTT trong nước
  https://thuvienphapluat.vn/van-ban/Cong-nghe-thong-tin/Thong-tu-40-2020-TT-BTTTT
• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 2.974403, 12, TRUE, @group_B_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'B2.6', 'Năng lực bảo mật & an ninh thông tin của sản phẩm/dịch vụ', '[B2.6] Năng lực bảo mật & an ninh thông tin của sản phẩm/dịch vụ
→ Có kiểm thử bảo mật (pentest), vá lỗi kịp thời, tuân thủ PCI DSS nếu liên quan thẻ', 'B2', 'Năng lực kỹ thuật & Công nghệ', 'Hàng hóa, PTV', '• ISO/IEC 27001:2022 – Hệ thống quản lý an toàn thông tin
  https://www.iso.org/standard/27001
• PCI DSS v4.0 – Tiêu chuẩn bảo mật dữ liệu thẻ thanh toán
  https://www.pcisecuritystandards.org
• Thông tư 09/2020/TT-NHNN – An ninh thông tin ngân hàng
  https://thuvienphapluat.vn/van-ban/Tien-te-Ngan-hang/Thong-tu-09-2020-TT-NHNN', '① Kiểm thử/đánh giá thực tế của BIDV
(pentest độc lập, UAT/SAT, đo SLA thực tế trong quá trình vận hành)
② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)', 2.974403, 13, TRUE, @group_B_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'B2.7', 'Hỗ trợ đa nền tảng và khả năng tương thích hệ thống', '[B2.7] Hỗ trợ đa nền tảng và khả năng tương thích hệ thống
→ Tương thích với hạ tầng hiện tại của BIDV (OS, DB, network)', 'B2', 'Năng lực kỹ thuật & Công nghệ', 'Hàng hóa, PTV', '• Quy định BIDV số 3082 – Trình tự thủ tục ĐTMS thuê TSDV CNTT
  Nội bộ BIDV – B.ONE', '① Kiểm thử/đánh giá thực tế của BIDV
(pentest độc lập, UAT/SAT, đo SLA thực tế trong quá trình vận hành)
② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)', 2.974403, 14, TRUE, @group_B_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'B3.1', 'Số lượng nhân sự kỹ thuật chuyên trách', '[B3.1] Số lượng nhân sự kỹ thuật chuyên trách
→ ≥50 kỹ sư: 5đ | 20–50: 4đ | 10–20: 3đ | <10: 1đ (tùy quy mô gói thầu)', 'B3', 'Năng lực nhân sự', 'Hàng hóa, PTV', '• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP
• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 2.974403, 15, TRUE, @group_B_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'B3.2', 'Trình độ chuyên môn của nhân sự chủ chốt', '[B3.2] Trình độ chuyên môn của nhân sự chủ chốt
→ ≥70% có bằng đại học kỹ thuật CNTT trở lên; có chứng chỉ quốc tế', 'B3', 'Năng lực nhân sự', 'Hàng hóa, TV, PTV', '• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 2.974403, 16, TRUE, @group_B_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'B3.3', 'Chứng chỉ chuyên môn quốc tế (CISSP, CISA, PMP, AWS, v.v.)', '[B3.3] Chứng chỉ chuyên môn quốc tế (CISSP, CISA, PMP, AWS, v.v.)
→ Số lượng và cấp độ chứng chỉ liên quan đến loại hàng hóa/dịch vụ', 'B3', 'Năng lực nhân sự', 'TV, PTV', '• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP
• ISO/IEC 27001:2022 – Hệ thống quản lý an toàn thông tin
  https://www.iso.org/standard/27001', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)', 2.974403, 17, TRUE, @group_B_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'B3.4', 'Chuyên gia có kinh nghiệm dự án ngân hàng/tài chính', '[B3.4] Chuyên gia có kinh nghiệm dự án ngân hàng/tài chính
→ Chuyên gia có ≥3 năm kinh nghiệm triển khai tại ngân hàng', 'B3', 'Năng lực nhân sự', 'TV, PTV', '• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP
• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 2.974403, 18, TRUE, @group_B_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'B3.5', 'Tỷ lệ giữ chân nhân sự (Retention Rate)', '[B3.5] Tỷ lệ giữ chân nhân sự (Retention Rate)
→ ≥85%: 5đ | 70–85%: 4đ | 55–70%: 3đ | <55%: 1đ', 'B3', 'Năng lực nhân sự', 'TV, PTV', '• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
③ Thông tin cập nhật từ nhà cung cấp
(văn bản, báo cáo, chứng nhận do NCC chủ động cung cấp/cập nhật định kỳ)', 2.974403, 19, TRUE, @group_B_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'B3.6', 'Chính sách đào tạo và phát triển nhân lực nội bộ', '[B3.6] Chính sách đào tạo và phát triển nhân lực nội bộ
→ Có chương trình đào tạo có hệ thống, ngân sách đào tạo hàng năm', 'B3', 'Năng lực nhân sự', 'Hàng hóa, TV, PTV', '• ISO 9001:2015 – Hệ thống quản lý chất lượng
  https://www.iso.org/iso-9001-quality-management.html
• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
③ Thông tin cập nhật từ nhà cung cấp
(văn bản, báo cáo, chứng nhận do NCC chủ động cung cấp/cập nhật định kỳ)', 2.974403, 20, TRUE, @group_B_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'B3.7', 'Nhân sự dự phòng cho vị trí chủ chốt', '[B3.7] Nhân sự dự phòng cho vị trí chủ chốt
→ Có phương án thay thế nhân sự chủ chốt khi cần thiết (Điều 45 NĐ214)', 'B3', 'Năng lực nhân sự', 'TV, PTV', '• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)', 2.974403, 21, TRUE, @group_B_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'B4.1', 'Số lượng hợp đồng tương tự đã thực hiện (5 năm gần nhất)', '[B4.1] Số lượng hợp đồng tương tự đã thực hiện (5 năm gần nhất)
→ ≥5 hợp đồng: 5đ | 3–4: 4đ | 1–2: 3đ | 0: 1đ', 'B4', 'Kinh nghiệm thực hiện hợp đồng tương tự', 'Hàng hóa, TV, PTV', '• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP
• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
③ Khảo sát tham chiếu khách hàng (Reference Check)
(BIDV liên hệ trực tiếp khách hàng cũ của NCC để xác minh thông tin)', 2.974403, 22, TRUE, @group_B_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'B4.2', 'Giá trị hợp đồng lớn nhất đã thực hiện thành công', '[B4.2] Giá trị hợp đồng lớn nhất đã thực hiện thành công
→ Giá trị ≥ dự toán gói thầu hiện tại: 5đ | 50–100%: 3đ | <50%: 1đ', 'B4', 'Kinh nghiệm thực hiện hợp đồng tương tự', 'Hàng hóa, PTV', '• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
③ Khảo sát tham chiếu khách hàng (Reference Check)
(BIDV liên hệ trực tiếp khách hàng cũ của NCC để xác minh thông tin)', 2.974403, 23, TRUE, @group_B_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'B4.3', 'Kinh nghiệm tại các ngân hàng quy mô tương đương BIDV', '[B4.3] Kinh nghiệm tại các ngân hàng quy mô tương đương BIDV
→ Có hợp đồng với Top 5 NHTM Việt Nam: 5đ | Ngân hàng khác: 3đ', 'B4', 'Kinh nghiệm thực hiện hợp đồng tương tự', 'Hàng hóa, TV, PTV', '• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
③ Khảo sát tham chiếu khách hàng (Reference Check)
(BIDV liên hệ trực tiếp khách hàng cũ của NCC để xác minh thông tin)', 2.974403, 24, TRUE, @group_B_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'B4.4', 'Dự án có độ phức tạp tương đương (số lượng chi nhánh, user)', '[B4.4] Dự án có độ phức tạp tương đương (số lượng chi nhánh, user)
→ Kinh nghiệm triển khai quy mô lớn (>100 chi nhánh)', 'B4', 'Kinh nghiệm thực hiện hợp đồng tương tự', 'Hàng hóa, PTV', '• Quy định BIDV số 3082 – Trình tự thủ tục ĐTMS thuê TSDV CNTT
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
③ Khảo sát tham chiếu khách hàng (Reference Check)
(BIDV liên hệ trực tiếp khách hàng cũ của NCC để xác minh thông tin)', 2.974403, 25, TRUE, @group_B_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'B4.5', 'Hợp đồng đã và đang thực hiện với BIDV (nếu có)', '[B4.5] Hợp đồng đã và đang thực hiện với BIDV (nếu có)
→ Lịch sử hợp tác tích cực với BIDV trong 5 năm gần nhất', 'B4', 'Kinh nghiệm thực hiện hợp đồng tương tự', 'Hàng hóa, TV, PTV', '• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE
• Quy định BIDV số 3082 – Trình tự thủ tục ĐTMS thuê TSDV CNTT
  Nội bộ BIDV – B.ONE', '① Hồ sơ/đánh giá nội bộ BIDV
(lịch sử hợp đồng, biên bản nghiệm thu, phản hồi đơn vị sử dụng – lưu trữ B.ONE)', 2.974403, 26, TRUE, @group_B_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'B4.6', 'Mức độ hoàn thành đúng tiến độ của các hợp đồng trước', '[B4.6] Mức độ hoàn thành đúng tiến độ của các hợp đồng trước
→ ≥90% hợp đồng hoàn thành đúng hạn: 5đ | 70–90%: 3đ | <70%: 1đ', 'B4', 'Kinh nghiệm thực hiện hợp đồng tương tự', 'Hàng hóa, TV, PTV', '• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP
• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '① Hồ sơ/đánh giá nội bộ BIDV
(lịch sử hợp đồng, biên bản nghiệm thu, phản hồi đơn vị sử dụng – lưu trữ B.ONE)
③ Khảo sát tham chiếu khách hàng (Reference Check)
(BIDV liên hệ trực tiếp khách hàng cũ của NCC để xác minh thông tin)', 2.974403, 27, TRUE, @group_B_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'B4.7', 'Kinh nghiệm cung cấp dịch vụ bảo trì dài hạn (>3 năm)', '[B4.7] Kinh nghiệm cung cấp dịch vụ bảo trì dài hạn (>3 năm)
→ Có hợp đồng bảo trì/hỗ trợ kỹ thuật dài hạn với khách hàng lớn', 'B4', 'Kinh nghiệm thực hiện hợp đồng tương tự', 'PTV', '• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE
• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
③ Khảo sát tham chiếu khách hàng (Reference Check)
(BIDV liên hệ trực tiếp khách hàng cũ của NCC để xác minh thông tin)', 2.974403, 28, TRUE, @group_B_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'B5.1', 'Quan hệ với nhà sản xuất gốc (OEM) & chuỗi phân phối', '[B5.1] Quan hệ với nhà sản xuất gốc (OEM) & chuỗi phân phối
→ Đại lý cấp 1/đối tác ủy quyền trực tiếp của OEM', 'B5', 'Năng lực sản xuất & Chuỗi cung ứng', 'Hàng hóa', '• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE
• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
④ Thông tin công khai – Cổng tra cứu đối tác ủy quyền của hãng (OEM Partner Portal)
(ví dụ: Cisco Partner Locator, Microsoft Partner Center…)', 2.786119, 29, TRUE, @group_B_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'B5.2', 'Khả năng cung ứng số lượng lớn theo yêu cầu đột xuất', '[B5.2] Khả năng cung ứng số lượng lớn theo yêu cầu đột xuất
→ Có kho dự trữ/cam kết thời gian giao hàng cụ thể', 'B5', 'Năng lực sản xuất & Chuỗi cung ứng', 'Hàng hóa', '• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 2.786119, 30, TRUE, @group_B_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'B5.3', 'Quản lý rủi ro chuỗi cung ứng (nguồn thay thế)', '[B5.3] Quản lý rủi ro chuỗi cung ứng (nguồn thay thế)
→ Có ít nhất 2 nguồn cung thay thế cho sản phẩm chủ lực', 'B5', 'Năng lực sản xuất & Chuỗi cung ứng', 'Hàng hóa', '• ISO 9001:2015 – Hệ thống quản lý chất lượng
  https://www.iso.org/iso-9001-quality-management.html
• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 2.786119, 31, TRUE, @group_B_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'B5.4', 'Quy trình kiểm soát chất lượng đầu vào (QC/QA)', '[B5.4] Quy trình kiểm soát chất lượng đầu vào (QC/QA)
→ Có quy trình QC/QA tài liệu hóa và thực hiện nghiêm túc', 'B5', 'Năng lực sản xuất & Chuỗi cung ứng', 'Hàng hóa', '• ISO 9001:2015 – Hệ thống quản lý chất lượng
  https://www.iso.org/iso-9001-quality-management.html', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 2.786119, 32, TRUE, @group_B_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'B5.5', 'Năng lực kho bãi, logistics và giao nhận', '[B5.5] Năng lực kho bãi, logistics và giao nhận
→ Có kho bãi đạt chuẩn, hệ thống theo dõi vận chuyển', 'B5', 'Năng lực sản xuất & Chuỗi cung ứng', 'Hàng hóa', '• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)
② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)', 2.786119, 33, TRUE, @group_B_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'B5.6', 'Khả năng cung cấp linh kiện thay thế trong thời gian bảo hành', '[B5.6] Khả năng cung cấp linh kiện thay thế trong thời gian bảo hành
→ Cam kết thời gian cung cấp linh kiện thay thế <24h', 'B5', 'Năng lực sản xuất & Chuỗi cung ứng', 'Hàng hóa', '• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE
• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)', 2.786119, 34, TRUE, @group_B_id);

SET @group_C_id = UUID();
INSERT INTO evaluation_groups (id, code, name, weight, sortOrder, isActive, configId)
VALUES (@group_C_id, 'C', 'KHẢ NĂNG THỰC THI HỢP ĐỒNG', 30, 3, TRUE, @config_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C1.1', '[NCC] Tỷ lệ nghiệm thu đạt yêu cầu ngay lần đầu (First Pass Rate)', '[C1.1] [NCC] Tỷ lệ nghiệm thu đạt yêu cầu ngay lần đầu (First Pass Rate)
→ ≥95% hạng mục nghiệm thu đạt ngay lần đầu: 5đ | 85–95%: 4đ | 75–85%: 3đ | <75%: 1đ', 'C1', 'Chất lượng thực hiện hợp đồng (đánh giá nhà cung cấp & sản phẩm/dịch vụ)', 'Hàng hóa, PTV', '• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE
• Quy định BIDV số 3082 – Trình tự thủ tục ĐTMS thuê TSDV CNTT
  Nội bộ BIDV – B.ONE
• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP', '① Hồ sơ/đánh giá nội bộ BIDV
(lịch sử hợp đồng, biên bản nghiệm thu, phản hồi đơn vị sử dụng – lưu trữ B.ONE)', 2.082082, 1, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C1.2', '[NCC] Chất lượng quản lý và điều phối đội ngũ triển khai', '[C1.2] [NCC] Chất lượng quản lý và điều phối đội ngũ triển khai
→ Đội ngũ được tổ chức rõ ràng, có đầu mối liên lạc, phản hồi kịp thời', 'C1', 'Chất lượng thực hiện hợp đồng (đánh giá nhà cung cấp & sản phẩm/dịch vụ)', 'TV, PTV', '• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP
• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '① Hồ sơ/đánh giá nội bộ BIDV
(lịch sử hợp đồng, biên bản nghiệm thu, phản hồi đơn vị sử dụng – lưu trữ B.ONE)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 2.082082, 2, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C1.3', '[NCC] Chất lượng tài liệu bàn giao (hồ sơ kỹ thuật, hướng dẫn vận hành)', '[C1.3] [NCC] Chất lượng tài liệu bàn giao (hồ sơ kỹ thuật, hướng dẫn vận hành)
→ Tài liệu đầy đủ, chuẩn xác, tiếng Việt/song ngữ theo yêu cầu hợp đồng', 'C1', 'Chất lượng thực hiện hợp đồng (đánh giá nhà cung cấp & sản phẩm/dịch vụ)', 'Hàng hóa, TV, PTV', '• Quy định BIDV số 3082 – Trình tự thủ tục ĐTMS thuê TSDV CNTT
  Nội bộ BIDV – B.ONE
• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '① Hồ sơ/đánh giá nội bộ BIDV
(lịch sử hợp đồng, biên bản nghiệm thu, phản hồi đơn vị sử dụng – lưu trữ B.ONE)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 2.082082, 3, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C1.4', '[NCC] Chất lượng dịch vụ tư vấn – giá trị thực tiễn của báo cáo/khuyến nghị', '[C1.4] [NCC] Chất lượng dịch vụ tư vấn – giá trị thực tiễn của báo cáo/khuyến nghị
→ Báo cáo/tư vấn có giá trị ứng dụng thực tế, được BIDV áp dụng vào hoạt động', 'C1', 'Chất lượng thực hiện hợp đồng (đánh giá nhà cung cấp & sản phẩm/dịch vụ)', 'TV', '• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP
• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '① Hồ sơ/đánh giá nội bộ BIDV
(lịch sử hợp đồng, biên bản nghiệm thu, phản hồi đơn vị sử dụng – lưu trữ B.ONE)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 2.082082, 4, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C1.5', '[NCC] Sự hài lòng của người dùng cuối (khảo sát nội bộ BIDV)', '[C1.5] [NCC] Sự hài lòng của người dùng cuối (khảo sát nội bộ BIDV)
→ Điểm satisfaction ≥4/5: 5đ | 3.5–4: 4đ | 3–3.5: 3đ | <3: 1đ', 'C1', 'Chất lượng thực hiện hợp đồng (đánh giá nhà cung cấp & sản phẩm/dịch vụ)', 'Hàng hóa, PTV', '• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE
• Quy định BIDV số 3082 – Trình tự thủ tục ĐTMS thuê TSDV CNTT
  Nội bộ BIDV – B.ONE', '① Hồ sơ/đánh giá nội bộ BIDV
(lịch sử hợp đồng, biên bản nghiệm thu, phản hồi đơn vị sử dụng – lưu trữ B.ONE)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 2.082082, 5, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C1.6', '[SP] Mức độ đáp ứng yêu cầu kỹ thuật so với cam kết hợp đồng', '[C1.6] [SP] Mức độ đáp ứng yêu cầu kỹ thuật so với cam kết hợp đồng
→ Đạt 100% tối thiểu yêu cầu kỹ thuật theo HSYC và hợp đồng: 5đ | 90–100%: 3đ', 'C1', 'Chất lượng thực hiện hợp đồng (đánh giá nhà cung cấp & sản phẩm/dịch vụ)', 'Hàng hóa, PTV', '• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP
• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '① Kiểm thử/đánh giá thực tế của BIDV
(pentest độc lập, UAT/SAT, đo SLA thực tế trong quá trình vận hành)
① Hồ sơ/đánh giá nội bộ BIDV
(lịch sử hợp đồng, biên bản nghiệm thu, phản hồi đơn vị sử dụng – lưu trữ B.ONE)', 2.082082, 6, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C1.7', '[SP] Kết quả kiểm thử chấp nhận người dùng (UAT/SAT)', '[C1.7] [SP] Kết quả kiểm thử chấp nhận người dùng (UAT/SAT)
→ Vượt qua UAT/SAT với ≥95% test cases: 5đ | 85–95%: 3đ | <85%: 1đ', 'C1', 'Chất lượng thực hiện hợp đồng (đánh giá nhà cung cấp & sản phẩm/dịch vụ)', 'PTV', '• Quy định BIDV số 3082 – Trình tự thủ tục ĐTMS thuê TSDV CNTT
  Nội bộ BIDV – B.ONE
• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP', '① Kiểm thử/đánh giá thực tế của BIDV
(pentest độc lập, UAT/SAT, đo SLA thực tế trong quá trình vận hành)
① Hồ sơ/đánh giá nội bộ BIDV
(lịch sử hợp đồng, biên bản nghiệm thu, phản hồi đơn vị sử dụng – lưu trữ B.ONE)', 2.082082, 7, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C1.8', '[SP] Độ ổn định và tin cậy của sản phẩm sau khi đưa vào vận hành', '[C1.8] [SP] Độ ổn định và tin cậy của sản phẩm sau khi đưa vào vận hành
→ Không có lỗi nghiêm trọng (P1/P2) trong 3 tháng đầu sau golive: 5đ | 1–2 sự cố: 3đ', 'C1', 'Chất lượng thực hiện hợp đồng (đánh giá nhà cung cấp & sản phẩm/dịch vụ)', 'Hàng hóa, PTV', '• Quy định BIDV số 3082 – Trình tự thủ tục ĐTMS thuê TSDV CNTT
  Nội bộ BIDV – B.ONE
• Thông tư 09/2020/TT-NHNN – An ninh thông tin ngân hàng
  https://thuvienphapluat.vn/van-ban/Tien-te-Ngan-hang/Thong-tu-09-2020-TT-NHNN', '① Hồ sơ/đánh giá nội bộ BIDV
(lịch sử hợp đồng, biên bản nghiệm thu, phản hồi đơn vị sử dụng – lưu trữ B.ONE)
① Kiểm thử/đánh giá thực tế của BIDV
(pentest độc lập, UAT/SAT, đo SLA thực tế trong quá trình vận hành)', 2.082082, 8, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C1.9', '[SP] Tính bảo mật của sản phẩm/dịch vụ khi triển khai thực tế', '[C1.9] [SP] Tính bảo mật của sản phẩm/dịch vụ khi triển khai thực tế
→ Không có lỗ hổng bảo mật nghiêm trọng phát hiện sau golive; đã qua kiểm thử pentest', 'C1', 'Chất lượng thực hiện hợp đồng (đánh giá nhà cung cấp & sản phẩm/dịch vụ)', 'Hàng hóa, PTV', '• ISO/IEC 27001:2022 – Hệ thống quản lý an toàn thông tin
  https://www.iso.org/standard/27001
• PCI DSS v4.0 – Tiêu chuẩn bảo mật dữ liệu thẻ thanh toán
  https://www.pcisecuritystandards.org
• Thông tư 09/2020/TT-NHNN – An ninh thông tin ngân hàng
  https://thuvienphapluat.vn/van-ban/Tien-te-Ngan-hang/Thong-tu-09-2020-TT-NHNN', '① Kiểm thử/đánh giá thực tế của BIDV
(pentest độc lập, UAT/SAT, đo SLA thực tế trong quá trình vận hành)', 2.082082, 9, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C1.10', '[SP] Khả năng tương thích và tích hợp thực tế với hệ thống BIDV', '[C1.10] [SP] Khả năng tương thích và tích hợp thực tế với hệ thống BIDV
→ Tích hợp thành công với các hệ thống BIDV theo đúng thiết kế kỹ thuật đã phê duyệt', 'C1', 'Chất lượng thực hiện hợp đồng (đánh giá nhà cung cấp & sản phẩm/dịch vụ)', 'Hàng hóa, PTV', '• Quy định BIDV số 3082 – Trình tự thủ tục ĐTMS thuê TSDV CNTT
  Nội bộ BIDV – B.ONE
• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '① Kiểm thử/đánh giá thực tế của BIDV
(pentest độc lập, UAT/SAT, đo SLA thực tế trong quá trình vận hành)
① Hồ sơ/đánh giá nội bộ BIDV
(lịch sử hợp đồng, biên bản nghiệm thu, phản hồi đơn vị sử dụng – lưu trữ B.ONE)', 2.082082, 10, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C2.1', 'Tỷ lệ hoàn thành đúng tiến độ cam kết', '[C2.1] Tỷ lệ hoàn thành đúng tiến độ cam kết
→ ≥95%: 5đ | 85–95%: 4đ | 75–85%: 3đ | <75%: 1đ', 'C2', 'Tuân thủ tiến độ & Quản lý dự án', 'Hàng hóa, TV, PTV', '• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP
• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE
• Quy định BIDV số 3082 – Trình tự thủ tục ĐTMS thuê TSDV CNTT
  Nội bộ BIDV – B.ONE', '① Hồ sơ/đánh giá nội bộ BIDV
(lịch sử hợp đồng, biên bản nghiệm thu, phản hồi đơn vị sử dụng – lưu trữ B.ONE)', 2.974403, 11, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C2.2', 'Phương pháp luận quản lý dự án được áp dụng', '[C2.2] Phương pháp luận quản lý dự án được áp dụng
→ Có áp dụng PMI/PRINCE2/Agile/Waterfall phù hợp với đặc thù dự án', 'C2', 'Tuân thủ tiến độ & Quản lý dự án', 'PTV, TV', '• Chuẩn mực quản lý dự án PMI/PMBOK và PRINCE2
  https://www.pmi.org/pmbok-guide-standards
• Quy định BIDV số 3082 – Trình tự thủ tục ĐTMS thuê TSDV CNTT
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 2.974403, 12, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C2.3', 'Năng lực báo cáo tiến độ định kỳ cho BIDV', '[C2.3] Năng lực báo cáo tiến độ định kỳ cho BIDV
→ Báo cáo đúng hạn, đầy đủ nội dung, cảnh báo sớm rủi ro theo biểu mẫu BIDV', 'C2', 'Tuân thủ tiến độ & Quản lý dự án', 'Hàng hóa, PTV', '• Quy định BIDV số 3082 – Trình tự thủ tục ĐTMS thuê TSDV CNTT
  Nội bộ BIDV – B.ONE
• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '① Hồ sơ/đánh giá nội bộ BIDV
(lịch sử hợp đồng, biên bản nghiệm thu, phản hồi đơn vị sử dụng – lưu trữ B.ONE)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 2.974403, 13, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C2.4', 'Xử lý thay đổi phạm vi (Change Management)', '[C2.4] Xử lý thay đổi phạm vi (Change Management)
→ Quy trình xử lý thay đổi rõ ràng, không phát sinh tranh chấp ngoài phạm vi hợp đồng', 'C2', 'Tuân thủ tiến độ & Quản lý dự án', 'PTV, TV', '• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP
• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '① Hồ sơ/đánh giá nội bộ BIDV
(lịch sử hợp đồng, biên bản nghiệm thu, phản hồi đơn vị sử dụng – lưu trữ B.ONE)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 2.974403, 14, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C2.5', 'Khả năng xử lý sự cố khẩn cấp ảnh hưởng hoạt động ngân hàng', '[C2.5] Khả năng xử lý sự cố khẩn cấp ảnh hưởng hoạt động ngân hàng
→ Có quy trình P1/P2 incident với SLA cam kết cụ thể', 'C2', 'Tuân thủ tiến độ & Quản lý dự án', 'PTV', '• Thông tư 09/2020/TT-NHNN – An ninh thông tin ngân hàng
  https://thuvienphapluat.vn/van-ban/Tien-te-Ngan-hang/Thong-tu-09-2020-TT-NHNN
• Quy định BIDV số 3082 – Trình tự thủ tục ĐTMS thuê TSDV CNTT
  Nội bộ BIDV – B.ONE', '① Hồ sơ/đánh giá nội bộ BIDV
(lịch sử hợp đồng, biên bản nghiệm thu, phản hồi đơn vị sử dụng – lưu trữ B.ONE)
① Kiểm thử/đánh giá thực tế của BIDV
(pentest độc lập, UAT/SAT, đo SLA thực tế trong quá trình vận hành)', 2.974403, 15, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C2.6', 'Quản lý rủi ro và kế hoạch dự phòng dự án', '[C2.6] Quản lý rủi ro và kế hoạch dự phòng dự án
→ Có Risk Register và Contingency Plan được phê duyệt', 'C2', 'Tuân thủ tiến độ & Quản lý dự án', 'PTV, TV', '• Chuẩn mực quản lý dự án PMI/PMBOK và PRINCE2
  https://www.pmi.org/pmbok-guide-standards
• Quy định BIDV số 3082 – Trình tự thủ tục ĐTMS thuê TSDV CNTT
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 2.974403, 16, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C2.7', 'Không tự ý thay đổi nhân sự chủ chốt khi chưa được chấp thuận', '[C2.7] Không tự ý thay đổi nhân sự chủ chốt khi chưa được chấp thuận
→ Tuân thủ điều khoản nhân sự theo Điều 45 NĐ214', 'C2', 'Tuân thủ tiến độ & Quản lý dự án', 'TV, PTV', '• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP', '① Hồ sơ/đánh giá nội bộ BIDV
(lịch sử hợp đồng, biên bản nghiệm thu, phản hồi đơn vị sử dụng – lưu trữ B.ONE)', 2.974403, 17, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C3.1', 'Cam kết SLA bảo hành (thời gian phản hồi và khắc phục)', '[C3.1] Cam kết SLA bảo hành (thời gian phản hồi và khắc phục)
→ Response <4h, Resolve <8h (P1): 5đ | <8h/<24h: 4đ | Chưa cam kết: 2đ', 'C3', 'Dịch vụ bảo hành, bảo trì & Hỗ trợ kỹ thuật', 'Hàng hóa, PTV', '• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE
• Quy định BIDV số 3082 – Trình tự thủ tục ĐTMS thuê TSDV CNTT
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
① Kiểm thử/đánh giá thực tế của BIDV
(pentest độc lập, UAT/SAT, đo SLA thực tế trong quá trình vận hành)', 2.974403, 18, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C3.2', 'Thời gian bảo hành tối thiểu cam kết', '[C3.2] Thời gian bảo hành tối thiểu cam kết
→ ≥24 tháng: 5đ | 12–24 tháng: 3đ | <12 tháng: 1đ', 'C3', 'Dịch vụ bảo hành, bảo trì & Hỗ trợ kỹ thuật', 'Hàng hóa', '• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE
• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)', 2.974403, 19, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C3.3', 'Chất lượng và tốc độ hỗ trợ kỹ thuật (Helpdesk/NOC)', '[C3.3] Chất lượng và tốc độ hỗ trợ kỹ thuật (Helpdesk/NOC)
→ Có Helpdesk 24/7, NOC, hệ thống ticketing; SLA đo lường được', 'C3', 'Dịch vụ bảo hành, bảo trì & Hỗ trợ kỹ thuật', 'PTV', '• ISO/IEC 20000-1:2018 – Hệ thống quản lý dịch vụ CNTT
  https://www.iso.org/standard/70636.html
• Quy định BIDV số 3082 – Trình tự thủ tục ĐTMS thuê TSDV CNTT
  Nội bộ BIDV – B.ONE', '① Kiểm thử/đánh giá thực tế của BIDV
(pentest độc lập, UAT/SAT, đo SLA thực tế trong quá trình vận hành)
① Hồ sơ/đánh giá nội bộ BIDV
(lịch sử hợp đồng, biên bản nghiệm thu, phản hồi đơn vị sử dụng – lưu trữ B.ONE)', 2.974403, 20, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C3.4', 'Năng lực cung cấp bản vá lỗi, cập nhật phiên bản (patch management)', '[C3.4] Năng lực cung cấp bản vá lỗi, cập nhật phiên bản (patch management)
→ Vá lỗi bảo mật critical trong <24h; bản cập nhật định kỳ theo lịch', 'C3', 'Dịch vụ bảo hành, bảo trì & Hỗ trợ kỹ thuật', 'Hàng hóa, PTV', '• ISO/IEC 27001:2022 – Hệ thống quản lý an toàn thông tin
  https://www.iso.org/standard/27001
• Thông tư 09/2020/TT-NHNN – An ninh thông tin ngân hàng
  https://thuvienphapluat.vn/van-ban/Tien-te-Ngan-hang/Thong-tu-09-2020-TT-NHNN', '① Kiểm thử/đánh giá thực tế của BIDV
(pentest độc lập, UAT/SAT, đo SLA thực tế trong quá trình vận hành)
① Hồ sơ/đánh giá nội bộ BIDV
(lịch sử hợp đồng, biên bản nghiệm thu, phản hồi đơn vị sử dụng – lưu trữ B.ONE)', 2.974403, 21, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C3.5', 'Hỗ trợ onsite khi cần thiết (bao gồm chi nhánh vùng sâu/xa)', '[C3.5] Hỗ trợ onsite khi cần thiết (bao gồm chi nhánh vùng sâu/xa)
→ Có đội kỹ thuật onsite hoặc cam kết thời gian di chuyển <4h', 'C3', 'Dịch vụ bảo hành, bảo trì & Hỗ trợ kỹ thuật', 'Hàng hóa, PTV', '• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE
• Quy định BIDV số 3082 – Trình tự thủ tục ĐTMS thuê TSDV CNTT
  Nội bộ BIDV – B.ONE', '① Hồ sơ/đánh giá nội bộ BIDV
(lịch sử hợp đồng, biên bản nghiệm thu, phản hồi đơn vị sử dụng – lưu trữ B.ONE)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 2.974403, 22, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C3.6', 'Cung cấp đào tạo vận hành cho cán bộ BIDV', '[C3.6] Cung cấp đào tạo vận hành cho cán bộ BIDV
→ Có chương trình đào tạo chuyển giao kiến thức sau triển khai', 'C3', 'Dịch vụ bảo hành, bảo trì & Hỗ trợ kỹ thuật', 'PTV', '• Quy định BIDV số 3082 – Trình tự thủ tục ĐTMS thuê TSDV CNTT
  Nội bộ BIDV – B.ONE
• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '① Hồ sơ/đánh giá nội bộ BIDV
(lịch sử hợp đồng, biên bản nghiệm thu, phản hồi đơn vị sử dụng – lưu trữ B.ONE)', 2.974403, 23, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C3.7', 'Tài liệu kỹ thuật và hướng dẫn vận hành bằng tiếng Việt', '[C3.7] Tài liệu kỹ thuật và hướng dẫn vận hành bằng tiếng Việt
→ Tài liệu đầy đủ bằng tiếng Việt hoặc song ngữ (Việt–Anh)', 'C3', 'Dịch vụ bảo hành, bảo trì & Hỗ trợ kỹ thuật', 'Hàng hóa, PTV', '• Quy định BIDV số 3082 – Trình tự thủ tục ĐTMS thuê TSDV CNTT
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 2.974403, 24, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C4.1', 'Tuân thủ điều kiện, điều khoản hợp đồng (không thương thảo lại các cam kết cốt lõi)', '[C4.1] Tuân thủ điều kiện, điều khoản hợp đồng (không thương thảo lại các cam kết cốt lõi)
→ Không vi phạm các điều khoản cốt lõi của hợp đồng đã ký', 'C4', 'Tuân thủ pháp lý & Điều khoản hợp đồng', 'Hàng hóa, TV, PTV', '• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP
• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '① Hồ sơ/đánh giá nội bộ BIDV
(lịch sử hợp đồng, biên bản nghiệm thu, phản hồi đơn vị sử dụng – lưu trữ B.ONE)', 2.974403, 25, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C4.2', 'Thực hiện bảo lãnh thực hiện hợp đồng đầy đủ, đúng hạn', '[C4.2] Thực hiện bảo lãnh thực hiện hợp đồng đầy đủ, đúng hạn
→ Nộp bảo lãnh đúng hạn, đúng hình thức theo quy định NĐ214', 'C4', 'Tuân thủ pháp lý & Điều khoản hợp đồng', 'Hàng hóa, PTV', '• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP
• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '① Hồ sơ/đánh giá nội bộ BIDV
(lịch sử hợp đồng, biên bản nghiệm thu, phản hồi đơn vị sử dụng – lưu trữ B.ONE)', 2.974403, 26, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C4.3', 'Không để xảy ra tranh chấp/kiện tụng hợp đồng', '[C4.3] Không để xảy ra tranh chấp/kiện tụng hợp đồng
→ 0 vụ tranh chấp với BIDV: 5đ | 1 vụ nhỏ đã xử lý: 3đ | Nhiều vụ: 1đ', 'C4', 'Tuân thủ pháp lý & Điều khoản hợp đồng', 'Hàng hóa, TV, PTV', '• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP
• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '① Hồ sơ/đánh giá nội bộ BIDV
(lịch sử hợp đồng, biên bản nghiệm thu, phản hồi đơn vị sử dụng – lưu trữ B.ONE)
④ Thông tin công khai – Cổng thông tin điện tử Tòa án nhân dân
https://congbobanan.toaan.gov.vn (tra cứu án lệ, bản án liên quan)', 2.974403, 27, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C4.4', 'Tuân thủ quy định bảo mật thông tin trong quá trình thực hiện', '[C4.4] Tuân thủ quy định bảo mật thông tin trong quá trình thực hiện
→ Có NDA, tuân thủ chính sách bảo mật BIDV trong suốt vòng đời hợp đồng', 'C4', 'Tuân thủ pháp lý & Điều khoản hợp đồng', 'Hàng hóa, TV, PTV', '• Thông tư 09/2020/TT-NHNN – An ninh thông tin ngân hàng
  https://thuvienphapluat.vn/van-ban/Tien-te-Ngan-hang/Thong-tu-09-2020-TT-NHNN
• ISO/IEC 27001:2022 – Hệ thống quản lý an toàn thông tin
  https://www.iso.org/standard/27001
• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '① Hồ sơ/đánh giá nội bộ BIDV
(lịch sử hợp đồng, biên bản nghiệm thu, phản hồi đơn vị sử dụng – lưu trữ B.ONE)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 2.974403, 28, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C4.5', 'Xử lý khiếu nại/kiến nghị trong thời hạn quy định (Điều 22 NĐ214)', '[C4.5] Xử lý khiếu nại/kiến nghị trong thời hạn quy định (Điều 22 NĐ214)
→ Phản hồi khiếu nại trong 7 ngày làm việc theo quy định NĐ214', 'C4', 'Tuân thủ pháp lý & Điều khoản hợp đồng', 'Hàng hóa, TV, PTV', '• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP
• Quy định BIDV số 3082 – Trình tự thủ tục ĐTMS thuê TSDV CNTT
  Nội bộ BIDV – B.ONE', '① Hồ sơ/đánh giá nội bộ BIDV
(lịch sử hợp đồng, biên bản nghiệm thu, phản hồi đơn vị sử dụng – lưu trữ B.ONE)', 2.974403, 29, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C4.6', 'Tuân thủ quy trình nghiệm thu theo Quy định BIDV (Mục 7 QĐ3082)', '[C4.6] Tuân thủ quy trình nghiệm thu theo Quy định BIDV (Mục 7 QĐ3082)
→ Tham gia đầy đủ quy trình nghiệm thu, ký biên bản đúng hạn', 'C4', 'Tuân thủ pháp lý & Điều khoản hợp đồng', 'Hàng hóa, TV, PTV', '• Quy định BIDV số 3082 – Trình tự thủ tục ĐTMS thuê TSDV CNTT
  Nội bộ BIDV – B.ONE
• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '① Hồ sơ/đánh giá nội bộ BIDV
(lịch sử hợp đồng, biên bản nghiệm thu, phản hồi đơn vị sử dụng – lưu trữ B.ONE)', 2.974403, 30, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C4.7', 'Tuân thủ ưu tiên sản phẩm CNTT nội địa (TT40/2020/TT-BTTTT)', '[C4.7] Tuân thủ ưu tiên sản phẩm CNTT nội địa (TT40/2020/TT-BTTTT)
→ Ưu tiên sản phẩm CNTT sản xuất trong nước được Bộ TTTT xác nhận', 'C4', 'Tuân thủ pháp lý & Điều khoản hợp đồng', 'Hàng hóa', '• Thông tư 40/2020/TT-BTTTT – Ưu tiên sản phẩm CNTT trong nước
  https://thuvienphapluat.vn/van-ban/Cong-nghe-thong-tin/Thong-tu-40-2020-TT-BTTTT
• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 2.974403, 31, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C5.1', 'Kế hoạch liên tục kinh doanh (BCP/DRP) của nhà cung cấp', '[C5.1] Kế hoạch liên tục kinh doanh (BCP/DRP) của nhà cung cấp
→ Có BCP/DRP được kiểm thử hàng năm: 5đ | Có nhưng chưa test: 3đ | Không có: 1đ', 'C5', 'Khả năng ứng phó rủi ro & Liên tục kinh doanh', 'PTV', '• Tiêu chuẩn ISO 22301:2019 – Quản lý liên tục kinh doanh (BCM)
  https://www.iso.org/standard/75106.html
• Quy định BIDV số 3082 – Trình tự thủ tục ĐTMS thuê TSDV CNTT
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 2.786119, 32, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C5.2', 'Trung tâm dữ liệu dự phòng (DR Site) đạt chuẩn', '[C5.2] Trung tâm dữ liệu dự phòng (DR Site) đạt chuẩn
→ Có DR Site tại data center đạt chuẩn Uptime Institute Tier 3+', 'C5', 'Khả năng ứng phó rủi ro & Liên tục kinh doanh', 'PTV', '• Tiêu chuẩn Uptime Institute Tier Classification cho Data Center
  https://uptimeinstitute.com/tiers
• Quy định BIDV số 3082 – Trình tự thủ tục ĐTMS thuê TSDV CNTT
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 2.786119, 33, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C5.3', 'Khả năng scale up/down theo nhu cầu của BIDV', '[C5.3] Khả năng scale up/down theo nhu cầu của BIDV
→ Cam kết mở rộng năng lực trong <1 tháng khi BIDV có yêu cầu', 'C5', 'Khả năng ứng phó rủi ro & Liên tục kinh doanh', 'PTV', '• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE
• Quy định BIDV số 3082 – Trình tự thủ tục ĐTMS thuê TSDV CNTT
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
① Hồ sơ/đánh giá nội bộ BIDV
(lịch sử hợp đồng, biên bản nghiệm thu, phản hồi đơn vị sử dụng – lưu trữ B.ONE)', 2.786119, 34, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C5.4', 'Quản lý rủi ro bên thứ ba (Third Party Risk Management)', '[C5.4] Quản lý rủi ro bên thứ ba (Third Party Risk Management)
→ Có quy trình đánh giá nhà thầu phụ; không thuê lại toàn bộ gói thầu', 'C5', 'Khả năng ứng phó rủi ro & Liên tục kinh doanh', 'PTV, TV', '• Nghị định 214/2025/NĐ-CP hướng dẫn Luật Đấu thầu
  https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-214-2025-ND-CP
• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 2.786119, 35, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C5.5', 'Bảo hiểm trách nhiệm nghề nghiệp và bảo hiểm rủi ro', '[C5.5] Bảo hiểm trách nhiệm nghề nghiệp và bảo hiểm rủi ro
→ Có hợp đồng bảo hiểm phù hợp với loại rủi ro của dịch vụ cung cấp', 'C5', 'Khả năng ứng phó rủi ro & Liên tục kinh doanh', 'PTV, TV', '• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)', 2.786119, 36, TRUE, @group_C_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'C5.6', 'Kế hoạch chuyển giao khi kết thúc hợp đồng (Exit Plan)', '[C5.6] Kế hoạch chuyển giao khi kết thúc hợp đồng (Exit Plan)
→ Có Exit Plan rõ ràng, hỗ trợ bàn giao đầy đủ cho nhà cung cấp mới', 'C5', 'Khả năng ứng phó rủi ro & Liên tục kinh doanh', 'PTV', '• Quy định BIDV số 3082 – Trình tự thủ tục ĐTMS thuê TSDV CNTT
  Nội bộ BIDV – B.ONE
• Quy chế BIDV số 321/QĐ-BIDV – Đầu tư mua sắm thuê TS CNTT
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
③ Thông tin cập nhật từ nhà cung cấp
(văn bản, báo cáo, chứng nhận do NCC chủ động cung cấp/cập nhật định kỳ)', 2.786119, 37, TRUE, @group_C_id);

SET @group_D_id = UUID();
INSERT INTO evaluation_groups (id, code, name, weight, sortOrder, isActive, configId)
VALUES (@group_D_id, 'D', 'PHÁT TRIỂN BỀN VỮNG (ESG)', 15, 4, TRUE, @config_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'D1.1', '[NCC] Chính sách giảm thiểu phát thải carbon và Net Zero', '[D1.1] [NCC] Chính sách giảm thiểu phát thải carbon và Net Zero
→ Có mục tiêu giảm phát thải bằng văn bản, báo cáo định kỳ (GHG Protocol)', 'D1', 'Môi trường – Nhà cung cấp (Environmental – Supplier)', 'Hàng hóa, TV, PTV', '• GRI Standards – Khung báo cáo phát triển bền vững
  https://www.globalreporting.org/standards/
• TCFD – Task Force on Climate-related Financial Disclosures
  https://www.fsb-tcfd.org
• Phụ lục QĐ3082 BIDV – Danh mục tiêu chuẩn đánh giá mua sắm bền vững
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
③ Thông tin cập nhật từ nhà cung cấp
(văn bản, báo cáo, chứng nhận do NCC chủ động cung cấp/cập nhật định kỳ)', 3.971429, 1, TRUE, @group_D_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'D1.2', '[NCC] Chứng nhận ISO 14001 (Hệ thống quản lý môi trường)', '[D1.2] [NCC] Chứng nhận ISO 14001 (Hệ thống quản lý môi trường)
→ ISO 14001:2015 còn hiệu lực: 5đ | Đang xây dựng: 3đ | Không có: 1đ', 'D1', 'Môi trường – Nhà cung cấp (Environmental – Supplier)', 'Hàng hóa, PTV', '• ISO 14001:2015 – Hệ thống quản lý môi trường
  https://www.iso.org/iso-14001-environmental-management.html
• Phụ lục QĐ3082 BIDV – Danh mục tiêu chuẩn đánh giá mua sắm bền vững
  Nội bộ BIDV – B.ONE
• ISO 20400:2017 – Mua sắm bền vững
  https://www.iso.org/standard/63026.html', '④ Thông tin công khai – Cổng tra cứu chứng chỉ của tổ chức chứng nhận
(IAF CertSearch: https://www.iafcertsearch.org hoặc website tổ chức cấp chứng nhận)
② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)', 3.971429, 2, TRUE, @group_D_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'D1.3', '[NCC] Chứng nhận ISO 50001 (Quản lý năng lượng) hoặc tương đương', '[D1.3] [NCC] Chứng nhận ISO 50001 (Quản lý năng lượng) hoặc tương đương
→ Có chiến lược và hệ thống quản lý năng lượng theo ISO 50001', 'D1', 'Môi trường – Nhà cung cấp (Environmental – Supplier)', 'Hàng hóa, PTV', '• ISO 50001:2018 – Quản lý năng lượng
  https://www.iso.org/iso-50001-energy-management.html
• Phụ lục QĐ3082 BIDV – Danh mục tiêu chuẩn đánh giá mua sắm bền vững
  Nội bộ BIDV – B.ONE', '④ Thông tin công khai – Cổng tra cứu chứng chỉ của tổ chức chứng nhận
(IAF CertSearch: https://www.iafcertsearch.org hoặc website tổ chức cấp chứng nhận)
② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)', 3.971429, 3, TRUE, @group_D_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'D1.4', '[NCC] Chính sách tái chế và xử lý thiết bị cuối vòng đời (WEEE)', '[D1.4] [NCC] Chính sách tái chế và xử lý thiết bị cuối vòng đời (WEEE)
→ Có chương trình thu hồi thiết bị cũ, xử lý đúng quy định môi trường VN', 'D1', 'Môi trường – Nhà cung cấp (Environmental – Supplier)', 'Hàng hóa', '• ISO 14001:2015 – Hệ thống quản lý môi trường
  https://www.iso.org/iso-14001-environmental-management.html
• Phụ lục QĐ3082 BIDV – Danh mục tiêu chuẩn đánh giá mua sắm bền vững
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 3.971429, 4, TRUE, @group_D_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'D1.5', '[NCC] Cam kết và lộ trình sử dụng năng lượng tái tạo (RE100/tương đương)', '[D1.5] [NCC] Cam kết và lộ trình sử dụng năng lượng tái tạo (RE100/tương đương)
→ Có cam kết hoặc đang trong lộ trình chuyển sang năng lượng tái tạo', 'D1', 'Môi trường – Nhà cung cấp (Environmental – Supplier)', 'Hàng hóa, PTV', '• Science Based Targets initiative (SBTi) – Mục tiêu giảm phát thải khoa học
  https://sciencebasedtargets.org
• GRI Standards – Khung báo cáo phát triển bền vững
  https://www.globalreporting.org/standards/', '③ Thông tin cập nhật từ nhà cung cấp
(văn bản, báo cáo, chứng nhận do NCC chủ động cung cấp/cập nhật định kỳ)
② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)', 3.971429, 5, TRUE, @group_D_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'D1.6', '[NCC] Tham gia đánh giá ESG bởi tổ chức độc lập (EcoVadis, CDP…)', '[D1.6] [NCC] Tham gia đánh giá ESG bởi tổ chức độc lập (EcoVadis, CDP…)
→ Được đánh giá tích cực bởi tổ chức ESG uy tín quốc tế', 'D1', 'Môi trường – Nhà cung cấp (Environmental – Supplier)', 'Hàng hóa, PTV', '• EcoVadis – Nền tảng đánh giá ESG độc lập cho chuỗi cung ứng
  https://ecovadis.com
• TCFD – Task Force on Climate-related Financial Disclosures
  https://www.fsb-tcfd.org
• Phụ lục QĐ3082 BIDV – Danh mục tiêu chuẩn đánh giá mua sắm bền vững
  Nội bộ BIDV – B.ONE', '④ Thông tin công khai – Nền tảng đánh giá ESG bên thứ ba
(EcoVadis: https://ecovadis.com, CDP: https://www.cdp.net)', 3.971429, 6, TRUE, @group_D_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'D1.7', '[NCC] Lộ trình Net Zero với mốc thời gian cụ thể (SBTi hoặc tương đương)', '[D1.7] [NCC] Lộ trình Net Zero với mốc thời gian cụ thể (SBTi hoặc tương đương)
→ Có mục tiêu giảm phát thải dựa trên khoa học (Science-Based Targets)', 'D1', 'Môi trường – Nhà cung cấp (Environmental – Supplier)', 'Hàng hóa, PTV', '• Science Based Targets initiative (SBTi) – Mục tiêu giảm phát thải khoa học
  https://sciencebasedtargets.org
• GRI Standards – Khung báo cáo phát triển bền vững
  https://www.globalreporting.org/standards/', '③ Thông tin cập nhật từ nhà cung cấp
(văn bản, báo cáo, chứng nhận do NCC chủ động cung cấp/cập nhật định kỳ)
② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)', 3.971429, 7, TRUE, @group_D_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'D2.1', '[SP] Chứng nhận ENERGY STAR cho thiết bị phần cứng', '[D2.1] [SP] Chứng nhận ENERGY STAR cho thiết bị phần cứng
→ Thiết bị đạt chứng nhận ENERGY STAR (theo Phụ lục 01 QĐ3082)', 'D2', 'Môi trường – Sản phẩm/Dịch vụ (Environmental – Product/Service)', 'Hàng hóa', '• ENERGY STAR – Nhãn hiệu quả năng lượng (EPA Hoa Kỳ)
  https://www.energystar.gov
• Phụ lục QĐ3082 BIDV – Danh mục tiêu chuẩn đánh giá mua sắm bền vững
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 3.971429, 8, TRUE, @group_D_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'D2.2', '[SP] Chứng nhận EPEAT (Gold/Silver/Bronze) cho sản phẩm điện tử', '[D2.2] [SP] Chứng nhận EPEAT (Gold/Silver/Bronze) cho sản phẩm điện tử
→ Sản phẩm được xếp hạng EPEAT phù hợp theo Phụ lục 01 QĐ3082', 'D2', 'Môi trường – Sản phẩm/Dịch vụ (Environmental – Product/Service)', 'Hàng hóa', '• EPEAT – Electronic Product Environmental Assessment Tool
  https://www.epeat.net
• Phụ lục QĐ3082 BIDV – Danh mục tiêu chuẩn đánh giá mua sắm bền vững
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 3.971429, 9, TRUE, @group_D_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'D2.3', '[SP] Chứng nhận TCO Certified (bền vững toàn diện sản phẩm CNTT)', '[D2.3] [SP] Chứng nhận TCO Certified (bền vững toàn diện sản phẩm CNTT)
→ Sản phẩm có nhãn TCO Certified (môi trường + xã hội + an ninh mạng)', 'D2', 'Môi trường – Sản phẩm/Dịch vụ (Environmental – Product/Service)', 'Hàng hóa', '• TCO Certified – Nhãn bền vững sản phẩm CNTT
  https://tcocertified.com
• Phụ lục QĐ3082 BIDV – Danh mục tiêu chuẩn đánh giá mua sắm bền vững
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 3.971429, 10, TRUE, @group_D_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'D2.4', '[SP] Chỉ số PUE của data center/dịch vụ cloud (nếu áp dụng)', '[D2.4] [SP] Chỉ số PUE của data center/dịch vụ cloud (nếu áp dụng)
→ PUE ≤1.4: 5đ | 1.4–1.6: 4đ | 1.6–2.0: 3đ | >2.0: 1đ', 'D2', 'Môi trường – Sản phẩm/Dịch vụ (Environmental – Product/Service)', 'PTV', '• Tiêu chuẩn PUE theo TCVN 14285-2:2024 / ISO/IEC 30134-2:2016
  https://www.iso.org/standard/63451.html
• Phụ lục QĐ3082 BIDV – Danh mục tiêu chuẩn đánh giá mua sắm bền vững
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
① Kiểm thử/đánh giá thực tế của BIDV
(pentest độc lập, UAT/SAT, đo SLA thực tế trong quá trình vận hành)', 3.971429, 11, TRUE, @group_D_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'D2.5', '[SP] Sử dụng vật liệu tái chế/thân thiện môi trường trong sản phẩm', '[D2.5] [SP] Sử dụng vật liệu tái chế/thân thiện môi trường trong sản phẩm
→ Tỷ lệ vật liệu tái chế ≥20%: 5đ | 10–20%: 3đ | <10%: 1đ', 'D2', 'Môi trường – Sản phẩm/Dịch vụ (Environmental – Product/Service)', 'Hàng hóa', '• EPEAT – Electronic Product Environmental Assessment Tool
  https://www.epeat.net
• ISO 14001:2015 – Hệ thống quản lý môi trường
  https://www.iso.org/iso-14001-environmental-management.html
• Phụ lục QĐ3082 BIDV – Danh mục tiêu chuẩn đánh giá mua sắm bền vững
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 3.971429, 12, TRUE, @group_D_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'D2.6', '[SP/DV] Sản phẩm/dịch vụ hỗ trợ chuyển đổi số xanh của ngân hàng', '[D2.6] [SP/DV] Sản phẩm/dịch vụ hỗ trợ chuyển đổi số xanh của ngân hàng
→ Giải pháp giúp BIDV giảm tiêu thụ năng lượng/giấy tờ/in ấn', 'D2', 'Môi trường – Sản phẩm/Dịch vụ (Environmental – Product/Service)', 'Hàng hóa, PTV', '• ISO 20400:2017 – Mua sắm bền vững
  https://www.iso.org/standard/63026.html
• TCVN 12874:2020 – Mua sắm bền vững Việt Nam
  https://www.tcvn.gov.vn', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 3.971429, 13, TRUE, @group_D_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'D2.7', '[SP] Ưu tiên sản phẩm CNTT sản xuất trong nước (TT40/2020/TT-BTTTT)', '[D2.7] [SP] Ưu tiên sản phẩm CNTT sản xuất trong nước (TT40/2020/TT-BTTTT)
→ Sản phẩm/giải pháp nội địa được Bộ TTTT xác nhận; áp dụng ưu đãi', 'D2', 'Môi trường – Sản phẩm/Dịch vụ (Environmental – Product/Service)', 'Hàng hóa', '• Thông tư 40/2020/TT-BTTTT – Ưu tiên sản phẩm CNTT trong nước
  https://thuvienphapluat.vn/van-ban/Cong-nghe-thong-tin/Thong-tu-40-2020-TT-BTTTT
• Phụ lục QĐ3082 BIDV – Danh mục tiêu chuẩn đánh giá mua sắm bền vững
  Nội bộ BIDV – B.ONE', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 3.971429, 14, TRUE, @group_D_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'D3.1', '[NCC] Chính sách sức khỏe và an toàn nghề nghiệp (ISO 45001)', '[D3.1] [NCC] Chính sách sức khỏe và an toàn nghề nghiệp (ISO 45001)
→ Có chính sách OHS tài liệu hóa; chứng nhận ISO 45001 là lợi thế', 'D3', 'Xã hội (Social – Nhà cung cấp & chuỗi cung ứng)', 'Hàng hóa, TV, PTV', '• ISO 45001:2018 – Hệ thống quản lý an toàn sức khỏe nghề nghiệp
  https://www.iso.org/iso-45001-occupational-health-and-safety.html
• Phụ lục QĐ3082 BIDV – Danh mục tiêu chuẩn đánh giá mua sắm bền vững
  Nội bộ BIDV – B.ONE', '④ Thông tin công khai – Cổng tra cứu chứng chỉ của tổ chức chứng nhận
(IAF CertSearch: https://www.iafcertsearch.org hoặc website tổ chức cấp chứng nhận)
② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)', 3.7, 15, TRUE, @group_D_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'D3.2', '[NCC] Tuân thủ quy định lao động (không lao động trẻ em, cưỡng bức)', '[D3.2] [NCC] Tuân thủ quy định lao động (không lao động trẻ em, cưỡng bức)
→ Tuân thủ Bộ Luật Lao động VN và các tiêu chuẩn cốt lõi ILO', 'D3', 'Xã hội (Social – Nhà cung cấp & chuỗi cung ứng)', 'Hàng hóa, PTV', '• Bộ Luật Lao động số 45/2019/QH14
  https://thuvienphapluat.vn/van-ban/Lao-dong-Tien-luong/Bo-luat-Lao-dong-2019-333670.aspx
• Tiêu chuẩn lao động cốt lõi ILO (Core Labour Standards)
  https://www.ilo.org/global/standards/introduction-to-international-labour-standards
• ISO 26000:2010 – Hướng dẫn trách nhiệm xã hội
  https://www.iso.org/iso-26000-social-responsibility.html', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
③ Thông tin cập nhật từ nhà cung cấp
(văn bản, báo cáo, chứng nhận do NCC chủ động cung cấp/cập nhật định kỳ)', 3.7, 16, TRUE, @group_D_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'D3.3', '[NCC] Chính sách bình đẳng, không phân biệt đối xử và đa dạng', '[D3.3] [NCC] Chính sách bình đẳng, không phân biệt đối xử và đa dạng
→ Có chính sách EDI (Equity, Diversity & Inclusion) bằng văn bản và thực thi', 'D3', 'Xã hội (Social – Nhà cung cấp & chuỗi cung ứng)', 'Hàng hóa, TV, PTV', '• ISO 26000:2010 – Hướng dẫn trách nhiệm xã hội
  https://www.iso.org/iso-26000-social-responsibility.html
• Tiêu chuẩn lao động cốt lõi ILO (Core Labour Standards)
  https://www.ilo.org/global/standards/introduction-to-international-labour-standards', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
③ Thông tin cập nhật từ nhà cung cấp
(văn bản, báo cáo, chứng nhận do NCC chủ động cung cấp/cập nhật định kỳ)', 3.7, 17, TRUE, @group_D_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'D3.4', '[NCC] Trách nhiệm xã hội doanh nghiệp (CSR) – chương trình cộng đồng', '[D3.4] [NCC] Trách nhiệm xã hội doanh nghiệp (CSR) – chương trình cộng đồng
→ Có ngân sách CSR và hoạt động cộng đồng có thể xác minh', 'D3', 'Xã hội (Social – Nhà cung cấp & chuỗi cung ứng)', 'Hàng hóa, TV, PTV', '• ISO 26000:2010 – Hướng dẫn trách nhiệm xã hội
  https://www.iso.org/iso-26000-social-responsibility.html
• GRI Standards – Khung báo cáo phát triển bền vững
  https://www.globalreporting.org/standards/', '③ Thông tin cập nhật từ nhà cung cấp
(văn bản, báo cáo, chứng nhận do NCC chủ động cung cấp/cập nhật định kỳ)
② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)', 3.7, 18, TRUE, @group_D_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'D3.5', '[NCC] Chính sách phúc lợi nhân viên vượt mức tối thiểu pháp luật', '[D3.5] [NCC] Chính sách phúc lợi nhân viên vượt mức tối thiểu pháp luật
→ Bảo hiểm, phúc lợi bổ sung, Work-Life Balance, lương cạnh tranh', 'D3', 'Xã hội (Social – Nhà cung cấp & chuỗi cung ứng)', 'Hàng hóa, TV, PTV', '• Bộ Luật Lao động số 45/2019/QH14
  https://thuvienphapluat.vn/van-ban/Lao-dong-Tien-luong/Bo-luat-Lao-dong-2019-333670.aspx
• ISO 45001:2018 – Hệ thống quản lý an toàn sức khỏe nghề nghiệp
  https://www.iso.org/iso-45001-occupational-health-and-safety.html', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
③ Thông tin cập nhật từ nhà cung cấp
(văn bản, báo cáo, chứng nhận do NCC chủ động cung cấp/cập nhật định kỳ)', 3.7, 19, TRUE, @group_D_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'D3.6', '[NCC] Trách nhiệm trong chuỗi cung ứng (Responsible Sourcing)', '[D3.6] [NCC] Trách nhiệm trong chuỗi cung ứng (Responsible Sourcing)
→ Có chính sách kiểm tra điều kiện lao động tại nhà thầu phụ/đối tác', 'D3', 'Xã hội (Social – Nhà cung cấp & chuỗi cung ứng)', 'Hàng hóa, PTV', '• ISO 26000:2010 – Hướng dẫn trách nhiệm xã hội
  https://www.iso.org/iso-26000-social-responsibility.html
• Tiêu chuẩn lao động cốt lõi ILO (Core Labour Standards)
  https://www.ilo.org/global/standards/introduction-to-international-labour-standards
• TCVN 12874:2020 – Mua sắm bền vững Việt Nam
  https://www.tcvn.gov.vn', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
③ Thông tin cập nhật từ nhà cung cấp
(văn bản, báo cáo, chứng nhận do NCC chủ động cung cấp/cập nhật định kỳ)', 3.7, 20, TRUE, @group_D_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'D4.1', '[NCC] Cơ cấu quản trị doanh nghiệp bền vững (Board Diversity & Independence)', '[D4.1] [NCC] Cơ cấu quản trị doanh nghiệp bền vững (Board Diversity & Independence)
→ Có thành viên HĐQT độc lập, đa dạng về chuyên môn và giới tính', 'D4', 'Quản trị bền vững (Governance)', 'Hàng hóa, TV, PTV', '• ISO 26000:2010 – Hướng dẫn trách nhiệm xã hội
  https://www.iso.org/iso-26000-social-responsibility.html
• GRI Standards – Khung báo cáo phát triển bền vững
  https://www.globalreporting.org/standards/', '③ Thông tin cập nhật từ nhà cung cấp
(văn bản, báo cáo, chứng nhận do NCC chủ động cung cấp/cập nhật định kỳ)
② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)', 3.7, 21, TRUE, @group_D_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'D4.2', '[NCC] Công bố thông tin ESG (Báo cáo phát triển bền vững định kỳ)', '[D4.2] [NCC] Công bố thông tin ESG (Báo cáo phát triển bền vững định kỳ)
→ Có báo cáo ESG hàng năm theo GRI Standards hoặc khung tương đương', 'D4', 'Quản trị bền vững (Governance)', 'Hàng hóa, TV, PTV', '• GRI Standards – Khung báo cáo phát triển bền vững
  https://www.globalreporting.org/standards/
• ISO 20400:2017 – Mua sắm bền vững
  https://www.iso.org/standard/63026.html
• TCVN 12874:2020 – Mua sắm bền vững Việt Nam
  https://www.tcvn.gov.vn', '④ Thông tin công khai – Nền tảng đánh giá ESG bên thứ ba
(EcoVadis: https://ecovadis.com, CDP: https://www.cdp.net)
③ Thông tin cập nhật từ nhà cung cấp
(văn bản, báo cáo, chứng nhận do NCC chủ động cung cấp/cập nhật định kỳ)', 3.7, 22, TRUE, @group_D_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'D4.3', '[NCC] Chính sách quản lý rủi ro khí hậu (TCFD Framework)', '[D4.3] [NCC] Chính sách quản lý rủi ro khí hậu (TCFD Framework)
→ Có đánh giá rủi ro khí hậu theo TCFD hoặc đang xây dựng', 'D4', 'Quản trị bền vững (Governance)', 'Hàng hóa, PTV', '• TCFD – Task Force on Climate-related Financial Disclosures
  https://www.fsb-tcfd.org
• Science Based Targets initiative (SBTi) – Mục tiêu giảm phát thải khoa học
  https://sciencebasedtargets.org', '③ Thông tin cập nhật từ nhà cung cấp
(văn bản, báo cáo, chứng nhận do NCC chủ động cung cấp/cập nhật định kỳ)
② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)', 3.7, 23, TRUE, @group_D_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'D4.4', '[NCC] Tuân thủ ISO 26000 (Hướng dẫn trách nhiệm xã hội)', '[D4.4] [NCC] Tuân thủ ISO 26000 (Hướng dẫn trách nhiệm xã hội)
→ Áp dụng hướng dẫn ISO 26000 trong hoạt động kinh doanh hàng ngày', 'D4', 'Quản trị bền vững (Governance)', 'Hàng hóa, TV, PTV', '• ISO 26000:2010 – Hướng dẫn trách nhiệm xã hội
  https://www.iso.org/iso-26000-social-responsibility.html
• TCVN 12874:2020 – Mua sắm bền vững Việt Nam
  https://www.tcvn.gov.vn', '③ Thông tin cập nhật từ nhà cung cấp
(văn bản, báo cáo, chứng nhận do NCC chủ động cung cấp/cập nhật định kỳ)
② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)', 3.7, 24, TRUE, @group_D_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'D4.5', '[SP/DV] Chính sách bảo vệ dữ liệu người dùng (Nghị định 13/2023)', '[D4.5] [SP/DV] Chính sách bảo vệ dữ liệu người dùng (Nghị định 13/2023)
→ Tuân thủ NĐ13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân và thông lệ GDPR', 'D4', 'Quản trị bền vững (Governance)', 'PTV, TV', '• Nghị định 13/2023/NĐ-CP – Bảo vệ dữ liệu cá nhân
  https://thuvienphapluat.vn/van-ban/Cong-nghe-thong-tin/Nghi-dinh-13-2023-ND-CP
• ISO/IEC 27001:2022 – Hệ thống quản lý an toàn thông tin
  https://www.iso.org/standard/27001', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
① Người khảo sát chủ động đánh giá
(quan sát thực tế, kiểm tra hiện trường, phỏng vấn, đối chiếu hồ sơ nội bộ BIDV)', 3.7, 25, TRUE, @group_D_id);
INSERT INTO evaluation_criteria
  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)
VALUES
  (UUID(), 'D4.6', '[DV] Ứng dụng AI/ML để tối ưu hóa tiêu thụ tài nguyên và năng lượng', '[D4.6] [DV] Ứng dụng AI/ML để tối ưu hóa tiêu thụ tài nguyên và năng lượng
→ Sử dụng công nghệ để giảm footprint vận hành dịch vụ CNTT', 'D4', 'Quản trị bền vững (Governance)', 'PTV', '• ISO 50001:2018 – Quản lý năng lượng
  https://www.iso.org/iso-50001-energy-management.html
• GRI Standards – Khung báo cáo phát triển bền vững
  https://www.globalreporting.org/standards/', '② Thông tin tại Hồ sơ dự thầu/Hồ sơ đề xuất
(HSDT/HSĐX do nhà cung cấp nộp khi tham gia LCNT/LCNCC)
③ Thông tin cập nhật từ nhà cung cấp
(văn bản, báo cáo, chứng nhận do NCC chủ động cung cấp/cập nhật định kỳ)', 3.7, 26, TRUE, @group_D_id);

INSERT INTO score_options (id, value, label, sortOrder, isActive, configId)
VALUES (UUID(), 1, 'Không đạt / Không có thông tin', 1, TRUE, @config_id);
INSERT INTO score_options (id, value, label, sortOrder, isActive, configId)
VALUES (UUID(), 2, 'Yếu', 2, TRUE, @config_id);
INSERT INTO score_options (id, value, label, sortOrder, isActive, configId)
VALUES (UUID(), 3, 'Đạt yêu cầu tối thiểu', 3, TRUE, @config_id);
INSERT INTO score_options (id, value, label, sortOrder, isActive, configId)
VALUES (UUID(), 4, 'Tốt', 4, TRUE, @config_id);
INSERT INTO score_options (id, value, label, sortOrder, isActive, configId)
VALUES (UUID(), 5, 'Xuất sắc', 5, TRUE, @config_id);

INSERT INTO rank_rules (id, code, name, color, minScore, maxScore, sortOrder, isActive, configId)
VALUES (UUID(), 'A', 'Nhà cung cấp chiến lược', '#16a34a', 85, 100, 1, TRUE, @config_id);
INSERT INTO rank_rules (id, code, name, color, minScore, maxScore, sortOrder, isActive, configId)
VALUES (UUID(), 'B', 'Nhà cung cấp đủ điều kiện', '#2563eb', 70, 84.99, 2, TRUE, @config_id);
INSERT INTO rank_rules (id, code, name, color, minScore, maxScore, sortOrder, isActive, configId)
VALUES (UUID(), 'C', 'Nhà cung cấp cần cải thiện', '#f59e0b', 55, 69.99, 3, TRUE, @config_id);
INSERT INTO rank_rules (id, code, name, color, minScore, maxScore, sortOrder, isActive, configId)
VALUES (UUID(), 'D', 'Nhà cung cấp yếu kém', '#dc2626', 0, 54.99, 4, TRUE, @config_id);

SELECT @config_id AS importedConfigId, COUNT(*) AS criteriaCount
FROM evaluation_criteria
WHERE groupId IN (SELECT id FROM evaluation_groups WHERE configId = @config_id);
