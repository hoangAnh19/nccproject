-- Seed thêm 30 nhà cung cấp và đánh giá cho các kỳ:
-- 2025-Q1, 2025-Q2, 2025-Q3, 2025-Q4, 2026-Q1.
--
-- Script lấy config mặc định, criteria và rank_rules từ database hiện tại.
-- Có thể chạy lại nhiều lần: không insert trùng supplier code và không insert trùng evaluation theo supplier + period.

SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;
SET CHARACTER SET utf8mb4;

DELIMITER //

DROP PROCEDURE IF EXISTS seed_extra_supplier_evaluations//

CREATE PROCEDURE seed_extra_supplier_evaluations()
BEGIN
  DECLARE v_config_id VARCHAR(36);
  DECLARE v_scale_max INT;
  DECLARE v_use_criterion_weights BOOLEAN;
  DECLARE v_requested_suppliers INT DEFAULT 0;
  DECLARE v_available_seed_suppliers INT DEFAULT 0;
  DECLARE v_inserted_evaluations INT DEFAULT 0;
  DECLARE v_inserted_evaluation_items INT DEFAULT 0;

  SELECT id, scaleMax, useCriterionWeights
    INTO v_config_id, v_scale_max, v_use_criterion_weights
  FROM evaluation_configs
  WHERE isDefault = TRUE AND isActive = TRUE
  ORDER BY createdAt DESC
  LIMIT 1;

  IF v_config_id IS NULL THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Không tìm thấy evaluation config mặc định đang bật';
  END IF;

  DROP TEMPORARY TABLE IF EXISTS tmp_extra_suppliers;
  CREATE TEMPORARY TABLE tmp_extra_suppliers (
    seq INT PRIMARY KEY,
    code VARCHAR(40) NOT NULL,
    name VARCHAR(255) NOT NULL,
    taxCode VARCHAR(40) NOT NULL,
    type VARCHAR(120) NOT NULL,
    contactName VARCHAR(120),
    email VARCHAR(255),
    phone VARCHAR(40),
    address VARCHAR(255),
    note TEXT
  );

  INSERT INTO tmp_extra_suppliers
    (seq, code, name, taxCode, type, contactName, email, phone, address, note)
  VALUES
    (1, 'NCC-IT-101', 'Công ty Cổ phần Giải pháp Số An Phát', '0105000101', 'Phần mềm', 'Nguyễn Hoài An', 'an@ncc101.vn', '0910000101', 'Hà Nội', 'Nhà cung cấp bổ sung 2025-2026'),
    (2, 'NCC-IT-102', 'Công ty TNHH Cloud Ánh Dương', '0105000102', 'Cloud', 'Trần Minh Bảo', 'bao@ncc102.vn', '0910000102', 'Hà Nội', 'Nhà cung cấp bổ sung 2025-2026'),
    (3, 'NCC-IT-103', 'Công ty Hạ tầng Mạng Bắc Nam', '0105000103', 'Hạ tầng', 'Lê Đức Cường', 'cuong@ncc103.vn', '0910000103', 'Đà Nẵng', 'Nhà cung cấp bổ sung 2025-2026'),
    (4, 'NCC-IT-104', 'Công ty An ninh mạng Đại Việt', '0105000104', 'Bảo mật', 'Phạm Thu Dung', 'dung@ncc104.vn', '0910000104', 'TP. Hồ Chí Minh', 'Nhà cung cấp bổ sung 2025-2026'),
    (5, 'NCC-IT-105', 'Công ty Tích hợp Hệ thống Đông Á', '0105000105', 'Tích hợp hệ thống', 'Hoàng Gia Huy', 'huy@ncc105.vn', '0910000105', 'TP. Hồ Chí Minh', 'Nhà cung cấp bổ sung 2025-2026'),
    (6, 'NCC-IT-106', 'Công ty Dữ liệu và AI Lạc Việt', '0105000106', 'Dữ liệu', 'Đặng Khánh Linh', 'linh@ncc106.vn', '0910000106', 'Hà Nội', 'Nhà cung cấp bổ sung 2025-2026'),
    (7, 'NCC-IT-107', 'Công ty Dịch vụ Vận hành Số Minh Long', '0105000107', 'Dịch vụ vận hành', 'Vũ Thành Nam', 'nam@ncc107.vn', '0910000107', 'Cần Thơ', 'Nhà cung cấp bổ sung 2025-2026'),
    (8, 'NCC-IT-108', 'Công ty ERP Hưng Thịnh', '0105000108', 'Phần mềm', 'Đỗ Ngọc Phương', 'phuong@ncc108.vn', '0910000108', 'Đà Nẵng', 'Nhà cung cấp bổ sung 2025-2026'),
    (9, 'NCC-IT-109', 'Công ty Nền tảng Cloud Việt', '0105000109', 'Cloud', 'Bùi Quang Sơn', 'son@ncc109.vn', '0910000109', 'Hà Nội', 'Nhà cung cấp bổ sung 2025-2026'),
    (10, 'NCC-IT-110', 'Công ty Hạ tầng Số Phương Nam', '0105000110', 'Hạ tầng', 'Ngô Hải Tú', 'tu@ncc110.vn', '0910000110', 'TP. Hồ Chí Minh', 'Nhà cung cấp bổ sung 2025-2026'),
    (11, 'NCC-IT-111', 'Công ty Bảo mật Sao Khuê', '0105000111', 'Bảo mật', 'Nguyễn Lan Anh', 'lananh@ncc111.vn', '0910000111', 'Hà Nội', 'Nhà cung cấp bổ sung 2025-2026'),
    (12, 'NCC-IT-112', 'Công ty Tư vấn Chuyển đổi Số Việt Tín', '0105000112', 'Tư vấn CNTT', 'Trần Việt Đức', 'duc@ncc112.vn', '0910000112', 'Đà Nẵng', 'Nhà cung cấp bổ sung 2025-2026'),
    (13, 'NCC-IT-113', 'Công ty Phần mềm Nam Việt', '0105000113', 'Phần mềm', 'Lê Mai Chi', 'chi@ncc113.vn', '0910000113', 'TP. Hồ Chí Minh', 'Nhà cung cấp bổ sung 2025-2026'),
    (14, 'NCC-IT-114', 'Công ty Cloud Tây Đô', '0105000114', 'Cloud', 'Phạm Quốc Đạt', 'dat@ncc114.vn', '0910000114', 'Cần Thơ', 'Nhà cung cấp bổ sung 2025-2026'),
    (15, 'NCC-IT-115', 'Công ty Trung tâm Dữ liệu Hòa Bình', '0105000115', 'Hạ tầng', 'Hoàng Minh Hà', 'ha@ncc115.vn', '0910000115', 'Hà Nội', 'Nhà cung cấp bổ sung 2025-2026'),
    (16, 'NCC-IT-116', 'Công ty Giám sát An toàn Thông tin Việt', '0105000116', 'Bảo mật', 'Đặng Nhật Khôi', 'khoi@ncc116.vn', '0910000116', 'TP. Hồ Chí Minh', 'Nhà cung cấp bổ sung 2025-2026'),
    (17, 'NCC-IT-117', 'Công ty Tích hợp Số Trường Sơn', '0105000117', 'Tích hợp hệ thống', 'Vũ Thanh Lam', 'lam@ncc117.vn', '0910000117', 'Đà Nẵng', 'Nhà cung cấp bổ sung 2025-2026'),
    (18, 'NCC-IT-118', 'Công ty Phân tích Dữ liệu Đông Dương', '0105000118', 'Dữ liệu', 'Đỗ Minh Long', 'long@ncc118.vn', '0910000118', 'Hà Nội', 'Nhà cung cấp bổ sung 2025-2026'),
    (19, 'NCC-IT-119', 'Công ty Vận hành Hệ thống Thiên Phúc', '0105000119', 'Dịch vụ vận hành', 'Bùi Thảo My', 'my@ncc119.vn', '0910000119', 'TP. Hồ Chí Minh', 'Nhà cung cấp bổ sung 2025-2026'),
    (20, 'NCC-IT-120', 'Công ty Giải pháp CRM Gia Định', '0105000120', 'Phần mềm', 'Ngô Đức Nghĩa', 'nghia@ncc120.vn', '0910000120', 'TP. Hồ Chí Minh', 'Nhà cung cấp bổ sung 2025-2026'),
    (21, 'NCC-IT-121', 'Công ty Nền tảng Số Hải Đăng', '0105000121', 'Cloud', 'Nguyễn Minh Quân', 'quan@ncc121.vn', '0910000121', 'Hải Phòng', 'Nhà cung cấp bổ sung 2025-2026'),
    (22, 'NCC-IT-122', 'Công ty Mạng và Máy chủ Long Châu', '0105000122', 'Hạ tầng', 'Trần Kim Quyên', 'quyen@ncc122.vn', '0910000122', 'Hà Nội', 'Nhà cung cấp bổ sung 2025-2026'),
    (23, 'NCC-IT-123', 'Công ty SOC Việt Nam', '0105000123', 'Bảo mật', 'Lê Anh Tài', 'tai@ncc123.vn', '0910000123', 'Đà Nẵng', 'Nhà cung cấp bổ sung 2025-2026'),
    (24, 'NCC-IT-124', 'Công ty Tư vấn Kiến trúc CNTT Sen Vàng', '0105000124', 'Tư vấn CNTT', 'Phạm Minh Trang', 'trang@ncc124.vn', '0910000124', 'TP. Hồ Chí Minh', 'Nhà cung cấp bổ sung 2025-2026'),
    (25, 'NCC-IT-125', 'Công ty Ứng dụng Doanh nghiệp Đại Nam', '0105000125', 'Phần mềm', 'Hoàng Tuấn Việt', 'viet@ncc125.vn', '0910000125', 'Hà Nội', 'Nhà cung cấp bổ sung 2025-2026'),
    (26, 'NCC-IT-126', 'Công ty Cloud và DevOps An Khang', '0105000126', 'Cloud', 'Đặng Hải Yến', 'yen@ncc126.vn', '0910000126', 'Đà Nẵng', 'Nhà cung cấp bổ sung 2025-2026'),
    (27, 'NCC-IT-127', 'Công ty Thiết bị Mạng Việt Long', '0105000127', 'Hạ tầng', 'Vũ Anh Dũng', 'dung@ncc127.vn', '0910000127', 'TP. Hồ Chí Minh', 'Nhà cung cấp bổ sung 2025-2026'),
    (28, 'NCC-IT-128', 'Công ty Bảo mật và Tuân thủ Tân Phát', '0105000128', 'Bảo mật', 'Đỗ Thanh Hằng', 'hang@ncc128.vn', '0910000128', 'Hà Nội', 'Nhà cung cấp bổ sung 2025-2026'),
    (29, 'NCC-IT-129', 'Công ty Dữ liệu Thông minh Mekong', '0105000129', 'Dữ liệu', 'Bùi Hoàng Khải', 'khai@ncc129.vn', '0910000129', 'Cần Thơ', 'Nhà cung cấp bổ sung 2025-2026'),
    (30, 'NCC-IT-130', 'Công ty Dịch vụ CNTT Thành Công', '0105000130', 'Dịch vụ vận hành', 'Ngô Mỹ Linh', 'linh@ncc130.vn', '0910000130', 'TP. Hồ Chí Minh', 'Nhà cung cấp bổ sung 2025-2026');

  INSERT INTO suppliers
    (id, code, name, taxCode, type, contactName, email, phone, address, note,
     latestScore, latestRankCode, latestRankName, latestRankColor, lastEvaluatedAt,
     createdAt, updatedAt)
  SELECT
    UUID(), s.code, s.name, s.taxCode, s.type, s.contactName, s.email, s.phone, s.address, s.note,
    NULL, NULL, NULL, NULL, NULL,
    NOW(), NOW()
  FROM tmp_extra_suppliers s
  WHERE NOT EXISTS (
    SELECT 1 FROM suppliers existing_supplier WHERE existing_supplier.code = s.code
  );

  DROP TEMPORARY TABLE IF EXISTS tmp_periods;
  CREATE TEMPORARY TABLE tmp_periods (
    periodOrder INT PRIMARY KEY,
    period VARCHAR(20) NOT NULL,
    evaluatedAt DATETIME NOT NULL
  );

  INSERT INTO tmp_periods (periodOrder, period, evaluatedAt)
  VALUES
    (1, '2025-Q1', '2025-03-31 09:00:00'),
    (2, '2025-Q2', '2025-06-30 09:00:00'),
    (3, '2025-Q3', '2025-09-30 09:00:00'),
    (4, '2025-Q4', '2025-12-31 09:00:00'),
    (5, '2026-Q1', '2026-03-31 09:00:00');

  DROP TEMPORARY TABLE IF EXISTS tmp_supplier_ids;
  CREATE TEMPORARY TABLE tmp_supplier_ids AS
  SELECT s.seq, supplier.id AS supplierId, supplier.code
  FROM tmp_extra_suppliers s
  JOIN suppliers supplier ON supplier.code = s.code;

  DROP TEMPORARY TABLE IF EXISTS tmp_criteria;
  CREATE TEMPORARY TABLE tmp_criteria AS
  SELECT
    criterion.id AS criterionId,
    criterion.weight AS criterionWeight,
    criterion.sortOrder AS criterionSortOrder,
    criteria_group.id AS groupId,
    criteria_group.code AS groupCode,
    criteria_group.name AS groupName,
    criteria_group.weight AS groupWeight,
    criteria_group.sortOrder AS groupSortOrder,
    ROW_NUMBER() OVER (ORDER BY criteria_group.sortOrder, criterion.sortOrder, criterion.code) AS criterionNo
  FROM evaluation_groups criteria_group
  JOIN evaluation_criteria criterion ON criterion.groupId = criteria_group.id
  WHERE criteria_group.configId = v_config_id
    AND criteria_group.isActive = TRUE
    AND criterion.isActive = TRUE;

  DROP TEMPORARY TABLE IF EXISTS tmp_item_scores;
  CREATE TEMPORARY TABLE tmp_item_scores AS
  SELECT
    supplier.seq,
    supplier.supplierId,
    period.period,
    period.periodOrder,
    period.evaluatedAt,
    criterion.criterionId,
    criterion.criterionWeight,
    criterion.criterionSortOrder,
    criterion.groupId,
    criterion.groupCode,
    criterion.groupName,
    criterion.groupWeight,
    criterion.groupSortOrder,
    CASE
      WHEN supplier.seq MOD 10 IN (1, 2) THEN 4 + ((period.periodOrder + criterion.criterionNo) MOD 2)
      WHEN supplier.seq MOD 10 IN (3, 4, 5) THEN 3 + ((period.periodOrder + criterion.criterionNo) MOD 3)
      WHEN supplier.seq MOD 10 IN (6, 7, 8) THEN 2 + ((period.periodOrder + criterion.criterionNo) MOD 3)
      ELSE 1 + ((period.periodOrder + criterion.criterionNo) MOD 3)
    END AS score,
    'Dữ liệu đánh giá bổ sung bằng SQL' AS note
  FROM tmp_supplier_ids supplier
  CROSS JOIN tmp_periods period
  CROSS JOIN tmp_criteria criterion;

  DROP TEMPORARY TABLE IF EXISTS tmp_group_scores;
  CREATE TEMPORARY TABLE tmp_group_scores AS
  SELECT
    supplierId,
    period,
    groupId,
    groupCode,
    groupName,
    groupWeight,
    groupSortOrder,
    ROUND(
      (
        CASE
          WHEN v_use_criterion_weights THEN SUM(score * criterionWeight / 100)
          ELSE AVG(score)
        END
      ) / v_scale_max * 100,
      2
    ) AS groupScore
  FROM tmp_item_scores
  GROUP BY supplierId, period, groupId, groupCode, groupName, groupWeight, groupSortOrder;

  DROP TEMPORARY TABLE IF EXISTS tmp_evaluation_scores;
  CREATE TEMPORARY TABLE tmp_evaluation_scores AS
  SELECT
    group_score.supplierId,
    group_score.period,
    ROUND(SUM(group_score.groupScore * group_score.groupWeight / 100), 2) AS totalScore,
    JSON_ARRAYAGG(
      JSON_OBJECT(
        'groupId', group_score.groupId,
        'code', group_score.groupCode,
        'name', group_score.groupName,
        'score', group_score.groupScore,
        'weight', group_score.groupWeight
      )
    ) AS groupScores
  FROM tmp_group_scores group_score
  GROUP BY group_score.supplierId, group_score.period;

  DROP TEMPORARY TABLE IF EXISTS tmp_evaluations_to_insert;
  CREATE TEMPORARY TABLE tmp_evaluations_to_insert AS
  SELECT
    UUID() AS evaluationId,
    score.supplierId,
    score.period,
    score.totalScore,
    rank_rule.code AS rankCode,
    rank_rule.name AS rankName,
    rank_rule.color AS rankColor,
    score.groupScores,
    period.evaluatedAt
  FROM tmp_evaluation_scores score
  JOIN tmp_periods period ON period.period = score.period
  JOIN rank_rules rank_rule
    ON rank_rule.configId = v_config_id
   AND rank_rule.isActive = TRUE
   AND score.totalScore >= rank_rule.minScore
   AND score.totalScore <= rank_rule.maxScore
  WHERE NOT EXISTS (
    SELECT 1
    FROM evaluations existing_evaluation
    WHERE existing_evaluation.supplierId = score.supplierId
      AND existing_evaluation.period = score.period
  );

  INSERT INTO evaluations
    (id, period, evaluator, totalScore, rankCode, rankName, rankColor,
     groupScores, supplierId, configId, createdAt)
  SELECT
    evaluationId,
    period,
    'Ban đánh giá dữ liệu bổ sung',
    totalScore,
    rankCode,
    rankName,
    rankColor,
    groupScores,
    supplierId,
    v_config_id,
    evaluatedAt
  FROM tmp_evaluations_to_insert;

  INSERT INTO evaluation_items
    (id, score, note, normalizedScore, evaluationId, criterionId)
  SELECT
    UUID(),
    item.score,
    item.note,
    ROUND(item.score / v_scale_max * 100, 2),
    evaluation.evaluationId,
    item.criterionId
  FROM tmp_item_scores item
  JOIN tmp_evaluations_to_insert evaluation
    ON evaluation.supplierId = item.supplierId
   AND evaluation.period = item.period;

  UPDATE suppliers supplier
  JOIN tmp_supplier_ids supplier_seed ON supplier_seed.supplierId = supplier.id
  JOIN evaluations latest_evaluation
    ON latest_evaluation.supplierId = supplier.id
   AND latest_evaluation.period = '2026-Q1'
  SET
    supplier.latestScore = latest_evaluation.totalScore,
    supplier.latestRankCode = latest_evaluation.rankCode,
    supplier.latestRankName = latest_evaluation.rankName,
    supplier.latestRankColor = latest_evaluation.rankColor,
    supplier.lastEvaluatedAt = latest_evaluation.createdAt,
    supplier.updatedAt = NOW();

  SELECT COUNT(*) INTO v_requested_suppliers FROM tmp_extra_suppliers;
  SELECT COUNT(*) INTO v_available_seed_suppliers FROM tmp_supplier_ids;
  SELECT COUNT(*) INTO v_inserted_evaluations FROM tmp_evaluations_to_insert;
  SELECT COUNT(*)
    INTO v_inserted_evaluation_items
  FROM evaluation_items item
  JOIN tmp_evaluations_to_insert evaluation ON evaluation.evaluationId = item.evaluationId;

  SELECT
    v_requested_suppliers AS requestedSuppliers,
    v_available_seed_suppliers AS availableSeedSuppliers,
    v_inserted_evaluations AS insertedEvaluations,
    v_inserted_evaluation_items AS insertedEvaluationItems;

  DROP TEMPORARY TABLE IF EXISTS tmp_evaluations_to_insert;
  DROP TEMPORARY TABLE IF EXISTS tmp_evaluation_scores;
  DROP TEMPORARY TABLE IF EXISTS tmp_group_scores;
  DROP TEMPORARY TABLE IF EXISTS tmp_item_scores;
  DROP TEMPORARY TABLE IF EXISTS tmp_criteria;
  DROP TEMPORARY TABLE IF EXISTS tmp_supplier_ids;
  DROP TEMPORARY TABLE IF EXISTS tmp_periods;
  DROP TEMPORARY TABLE IF EXISTS tmp_extra_suppliers;
END//

CALL seed_extra_supplier_evaluations()//

DROP PROCEDURE IF EXISTS seed_extra_supplier_evaluations//

DELIMITER ;
