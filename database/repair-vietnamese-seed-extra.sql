-- Sửa lại dữ liệu tiếng Việt cho 30 nhà cung cấp NCC-IT-101..130 nếu đã từng import sai charset.
-- Chạy bằng mysql client với utf8mb4:
-- docker compose exec -T mysql mysql --default-character-set=utf8mb4 -uncc_user -pncc_pass ncc_db < database/repair-vietnamese-seed-extra.sql

SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;
SET CHARACTER SET utf8mb4;

DROP TEMPORARY TABLE IF EXISTS tmp_repair_suppliers;
CREATE TEMPORARY TABLE tmp_repair_suppliers (
  code VARCHAR(40) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(120) NOT NULL,
  contactName VARCHAR(120),
  address VARCHAR(255),
  note TEXT
);

INSERT INTO tmp_repair_suppliers
  (code, name, type, contactName, address, note)
VALUES
  ('NCC-IT-101', 'Công ty Cổ phần Giải pháp Số An Phát', 'Phần mềm', 'Nguyễn Hoài An', 'Hà Nội', 'Nhà cung cấp bổ sung 2025-2026'),
  ('NCC-IT-102', 'Công ty TNHH Cloud Ánh Dương', 'Cloud', 'Trần Minh Bảo', 'Hà Nội', 'Nhà cung cấp bổ sung 2025-2026'),
  ('NCC-IT-103', 'Công ty Hạ tầng Mạng Bắc Nam', 'Hạ tầng', 'Lê Đức Cường', 'Đà Nẵng', 'Nhà cung cấp bổ sung 2025-2026'),
  ('NCC-IT-104', 'Công ty An ninh mạng Đại Việt', 'Bảo mật', 'Phạm Thu Dung', 'TP. Hồ Chí Minh', 'Nhà cung cấp bổ sung 2025-2026'),
  ('NCC-IT-105', 'Công ty Tích hợp Hệ thống Đông Á', 'Tích hợp hệ thống', 'Hoàng Gia Huy', 'TP. Hồ Chí Minh', 'Nhà cung cấp bổ sung 2025-2026'),
  ('NCC-IT-106', 'Công ty Dữ liệu và AI Lạc Việt', 'Dữ liệu', 'Đặng Khánh Linh', 'Hà Nội', 'Nhà cung cấp bổ sung 2025-2026'),
  ('NCC-IT-107', 'Công ty Dịch vụ Vận hành Số Minh Long', 'Dịch vụ vận hành', 'Vũ Thành Nam', 'Cần Thơ', 'Nhà cung cấp bổ sung 2025-2026'),
  ('NCC-IT-108', 'Công ty ERP Hưng Thịnh', 'Phần mềm', 'Đỗ Ngọc Phương', 'Đà Nẵng', 'Nhà cung cấp bổ sung 2025-2026'),
  ('NCC-IT-109', 'Công ty Nền tảng Cloud Việt', 'Cloud', 'Bùi Quang Sơn', 'Hà Nội', 'Nhà cung cấp bổ sung 2025-2026'),
  ('NCC-IT-110', 'Công ty Hạ tầng Số Phương Nam', 'Hạ tầng', 'Ngô Hải Tú', 'TP. Hồ Chí Minh', 'Nhà cung cấp bổ sung 2025-2026'),
  ('NCC-IT-111', 'Công ty Bảo mật Sao Khuê', 'Bảo mật', 'Nguyễn Lan Anh', 'Hà Nội', 'Nhà cung cấp bổ sung 2025-2026'),
  ('NCC-IT-112', 'Công ty Tư vấn Chuyển đổi Số Việt Tín', 'Tư vấn CNTT', 'Trần Việt Đức', 'Đà Nẵng', 'Nhà cung cấp bổ sung 2025-2026'),
  ('NCC-IT-113', 'Công ty Phần mềm Nam Việt', 'Phần mềm', 'Lê Mai Chi', 'TP. Hồ Chí Minh', 'Nhà cung cấp bổ sung 2025-2026'),
  ('NCC-IT-114', 'Công ty Cloud Tây Đô', 'Cloud', 'Phạm Quốc Đạt', 'Cần Thơ', 'Nhà cung cấp bổ sung 2025-2026'),
  ('NCC-IT-115', 'Công ty Trung tâm Dữ liệu Hòa Bình', 'Hạ tầng', 'Hoàng Minh Hà', 'Hà Nội', 'Nhà cung cấp bổ sung 2025-2026'),
  ('NCC-IT-116', 'Công ty Giám sát An toàn Thông tin Việt', 'Bảo mật', 'Đặng Nhật Khôi', 'TP. Hồ Chí Minh', 'Nhà cung cấp bổ sung 2025-2026'),
  ('NCC-IT-117', 'Công ty Tích hợp Số Trường Sơn', 'Tích hợp hệ thống', 'Vũ Thanh Lam', 'Đà Nẵng', 'Nhà cung cấp bổ sung 2025-2026'),
  ('NCC-IT-118', 'Công ty Phân tích Dữ liệu Đông Dương', 'Dữ liệu', 'Đỗ Minh Long', 'Hà Nội', 'Nhà cung cấp bổ sung 2025-2026'),
  ('NCC-IT-119', 'Công ty Vận hành Hệ thống Thiên Phúc', 'Dịch vụ vận hành', 'Bùi Thảo My', 'TP. Hồ Chí Minh', 'Nhà cung cấp bổ sung 2025-2026'),
  ('NCC-IT-120', 'Công ty Giải pháp CRM Gia Định', 'Phần mềm', 'Ngô Đức Nghĩa', 'TP. Hồ Chí Minh', 'Nhà cung cấp bổ sung 2025-2026'),
  ('NCC-IT-121', 'Công ty Nền tảng Số Hải Đăng', 'Cloud', 'Nguyễn Minh Quân', 'Hải Phòng', 'Nhà cung cấp bổ sung 2025-2026'),
  ('NCC-IT-122', 'Công ty Mạng và Máy chủ Long Châu', 'Hạ tầng', 'Trần Kim Quyên', 'Hà Nội', 'Nhà cung cấp bổ sung 2025-2026'),
  ('NCC-IT-123', 'Công ty SOC Việt Nam', 'Bảo mật', 'Lê Anh Tài', 'Đà Nẵng', 'Nhà cung cấp bổ sung 2025-2026'),
  ('NCC-IT-124', 'Công ty Tư vấn Kiến trúc CNTT Sen Vàng', 'Tư vấn CNTT', 'Phạm Minh Trang', 'TP. Hồ Chí Minh', 'Nhà cung cấp bổ sung 2025-2026'),
  ('NCC-IT-125', 'Công ty Ứng dụng Doanh nghiệp Đại Nam', 'Phần mềm', 'Hoàng Tuấn Việt', 'Hà Nội', 'Nhà cung cấp bổ sung 2025-2026'),
  ('NCC-IT-126', 'Công ty Cloud và DevOps An Khang', 'Cloud', 'Đặng Hải Yến', 'Đà Nẵng', 'Nhà cung cấp bổ sung 2025-2026'),
  ('NCC-IT-127', 'Công ty Thiết bị Mạng Việt Long', 'Hạ tầng', 'Vũ Anh Dũng', 'TP. Hồ Chí Minh', 'Nhà cung cấp bổ sung 2025-2026'),
  ('NCC-IT-128', 'Công ty Bảo mật và Tuân thủ Tân Phát', 'Bảo mật', 'Đỗ Thanh Hằng', 'Hà Nội', 'Nhà cung cấp bổ sung 2025-2026'),
  ('NCC-IT-129', 'Công ty Dữ liệu Thông minh Mekong', 'Dữ liệu', 'Bùi Hoàng Khải', 'Cần Thơ', 'Nhà cung cấp bổ sung 2025-2026'),
  ('NCC-IT-130', 'Công ty Dịch vụ CNTT Thành Công', 'Dịch vụ vận hành', 'Ngô Mỹ Linh', 'TP. Hồ Chí Minh', 'Nhà cung cấp bổ sung 2025-2026');

UPDATE suppliers supplier
JOIN tmp_repair_suppliers repair ON repair.code = supplier.code
SET
  supplier.name = repair.name,
  supplier.type = repair.type,
  supplier.contactName = repair.contactName,
  supplier.address = repair.address,
  supplier.note = repair.note,
  supplier.updatedAt = NOW();

UPDATE evaluations evaluation
JOIN suppliers supplier ON supplier.id = evaluation.supplierId
JOIN tmp_repair_suppliers repair ON repair.code = supplier.code
SET evaluation.evaluator = 'Ban đánh giá dữ liệu bổ sung'
WHERE evaluation.period IN ('2025-Q1', '2025-Q2', '2025-Q3', '2025-Q4', '2026-Q1');

UPDATE evaluation_items item
JOIN evaluations evaluation ON evaluation.id = item.evaluationId
JOIN suppliers supplier ON supplier.id = evaluation.supplierId
JOIN tmp_repair_suppliers repair ON repair.code = supplier.code
SET item.note = 'Dữ liệu đánh giá bổ sung bằng SQL'
WHERE evaluation.period IN ('2025-Q1', '2025-Q2', '2025-Q3', '2025-Q4', '2026-Q1');

SELECT supplier.code, supplier.name, supplier.type, supplier.contactName, supplier.address
FROM suppliers supplier
JOIN tmp_repair_suppliers repair ON repair.code = supplier.code
ORDER BY supplier.code;

DROP TEMPORARY TABLE IF EXISTS tmp_repair_suppliers;
