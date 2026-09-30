-- Xóa các phiếu đánh giá thuộc bộ tiêu chí cũ, chỉ giữ phiếu thuộc
-- bộ tiêu chí mặc định đang áp dụng. Các evaluation_items được xóa theo
-- khóa ngoại ON DELETE CASCADE.
--
-- Chạy bằng UTF-8:
-- docker compose exec -T mysql mysql --default-character-set=utf8mb4 -uncc_user -pncc_pass ncc_db < database/delete-evaluations-old-criteria.sql

SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;
SET CHARACTER SET utf8mb4;

START TRANSACTION;

-- Khóa bộ tiêu chí hiện hành để không vô tình xóa dữ liệu khi chưa có config mặc định.
SET @current_config_id = NULL;
SELECT id INTO @current_config_id
FROM evaluation_configs
WHERE isDefault = TRUE AND isActive = TRUE
ORDER BY updatedAt DESC, createdAt DESC
LIMIT 1;

-- Nếu không có config mặc định, các lệnh thay đổi bên dưới đều là no-op.
SELECT @current_config_id AS current_config_id;

DELETE FROM evaluations
WHERE @current_config_id IS NOT NULL
  AND configId <> @current_config_id;

-- Làm mới điểm/rank tổng hợp của NCC theo phiếu còn lại mới nhất.
UPDATE suppliers
SET latestScore = NULL,
    latestRankCode = NULL,
    latestRankName = NULL,
    latestRankColor = NULL,
    lastEvaluatedAt = NULL,
    updatedAt = NOW()
WHERE @current_config_id IS NOT NULL;

UPDATE suppliers supplier
JOIN evaluations evaluation
  ON evaluation.supplierId = supplier.id
 AND evaluation.configId = @current_config_id
LEFT JOIN evaluations newer
  ON newer.supplierId = evaluation.supplierId
 AND newer.configId = @current_config_id
 AND (newer.createdAt > evaluation.createdAt OR (newer.createdAt = evaluation.createdAt AND newer.id > evaluation.id))
SET supplier.latestScore = evaluation.totalScore,
    supplier.latestRankCode = evaluation.rankCode,
    supplier.latestRankName = evaluation.rankName,
    supplier.latestRankColor = evaluation.rankColor,
    supplier.lastEvaluatedAt = evaluation.createdAt,
    supplier.updatedAt = NOW()
WHERE @current_config_id IS NOT NULL
  AND newer.id IS NULL;

SELECT @current_config_id AS retainedConfigId,
       (SELECT COUNT(*) FROM evaluations) AS retainedEvaluations,
       (SELECT COUNT(*) FROM evaluation_items) AS retainedEvaluationItems;

COMMIT;
