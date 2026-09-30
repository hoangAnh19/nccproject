-- Xóa các phiếu đánh giá thuộc bộ tiêu chí cũ, chỉ giữ phiếu thuộc
-- bộ tiêu chí mặc định đang áp dụng. Các evaluation_items được xóa theo
-- khóa ngoại ON DELETE CASCADE.
--
-- Có thể chạy toàn bộ script trong DBeaver/Workbench hoặc mysql CLI.
-- docker compose exec -T mysql mysql --default-character-set=utf8mb4 -uncc_user -pncc_pass ncc_db < database/delete-evaluations-old-criteria.sql

SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;
START TRANSACTION;

-- Câu lệnh chỉ tác động khi tồn tại một bộ tiêu chí mặc định đang bật.
-- Không dùng session variable để tương thích khi thực thi từng câu lệnh trong SQL client.
DELETE evaluation
FROM evaluations AS evaluation
JOIN evaluation_configs AS config ON config.id = evaluation.configId
WHERE NOT (config.isDefault = TRUE AND config.isActive = TRUE)
  AND EXISTS (
    SELECT 1
    FROM evaluation_configs AS active_config
    WHERE active_config.isDefault = TRUE AND active_config.isActive = TRUE
  );

-- Làm mới điểm/rank tổng hợp của NCC theo các phiếu còn lại.
UPDATE suppliers
SET latestScore = NULL,
    latestRankCode = NULL,
    latestRankName = NULL,
    latestRankColor = NULL,
    lastEvaluatedAt = NULL,
    updatedAt = NOW()
WHERE EXISTS (
  SELECT 1
  FROM evaluation_configs AS active_config
  WHERE active_config.isDefault = TRUE AND active_config.isActive = TRUE
);

-- Sau DELETE, chỉ còn phiếu thuộc config mặc định đang bật; lấy phiếu mới nhất của từng NCC.
UPDATE suppliers AS supplier
JOIN evaluations AS evaluation ON evaluation.supplierId = supplier.id
LEFT JOIN evaluations AS newer
  ON newer.supplierId = evaluation.supplierId
 AND (newer.createdAt > evaluation.createdAt OR (newer.createdAt = evaluation.createdAt AND newer.id > evaluation.id))
SET supplier.latestScore = evaluation.totalScore,
    supplier.latestRankCode = evaluation.rankCode,
    supplier.latestRankName = evaluation.rankName,
    supplier.latestRankColor = evaluation.rankColor,
    supplier.lastEvaluatedAt = evaluation.createdAt,
    supplier.updatedAt = NOW()
WHERE newer.id IS NULL
  AND EXISTS (
    SELECT 1
    FROM evaluation_configs AS active_config
    WHERE active_config.id = evaluation.configId
      AND active_config.isDefault = TRUE
      AND active_config.isActive = TRUE
  );

SELECT
  (SELECT COUNT(*) FROM evaluation_configs WHERE isDefault = TRUE AND isActive = TRUE) AS activeDefaultConfigs,
  (SELECT COUNT(*) FROM evaluations) AS retainedEvaluations,
  (SELECT COUNT(*) FROM evaluation_items) AS retainedEvaluationItems;

COMMIT;
