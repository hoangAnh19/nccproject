-- Tạo lại toàn bộ dữ liệu evaluations/evaluation_items theo bộ tiêu chí mặc định hiện tại.
-- Dùng sau khi chạy database/import-workbook-evaluation-config.sql.
--
-- CẢNH BÁO: script này xóa toàn bộ phiếu đánh giá cũ rồi tạo lại theo config mặc định.
-- Chạy bằng UTF-8:
-- docker compose exec -T mysql mysql --default-character-set=utf8mb4 -uncc_user -pncc_pass ncc_db < database/rebuild-evaluations-for-workbook-config.sql

SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;
SET CHARACTER SET utf8mb4;

DROP PROCEDURE IF EXISTS rebuild_evaluations_for_default_config;

DELIMITER //

CREATE PROCEDURE rebuild_evaluations_for_default_config()
BEGIN
  DECLARE v_config_id VARCHAR(36);
  DECLARE v_scale_max INT;
  DECLARE v_use_criterion_weights BOOLEAN;

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

  DELETE FROM evaluation_items;
  DELETE FROM evaluations;

  UPDATE suppliers
  SET latestScore = NULL,
      latestRankCode = NULL,
      latestRankName = NULL,
      latestRankColor = NULL,
      lastEvaluatedAt = NULL,
      updatedAt = NOW();

  DROP TEMPORARY TABLE IF EXISTS tmp_rebuild_periods;
  CREATE TEMPORARY TABLE tmp_rebuild_periods (
    periodOrder INT PRIMARY KEY,
    period VARCHAR(20) NOT NULL,
    evaluatedAt DATETIME NOT NULL
  );

  INSERT INTO tmp_rebuild_periods (periodOrder, period, evaluatedAt)
  VALUES
    (1, '2025-Q1', '2025-03-31 09:00:00'),
    (2, '2025-Q2', '2025-06-30 09:00:00'),
    (3, '2025-Q3', '2025-09-30 09:00:00'),
    (4, '2025-Q4', '2025-12-31 09:00:00'),
    (5, '2026-Q1', '2026-03-31 09:00:00'),
    (6, '2026-Q2', '2026-06-30 09:00:00');

  DROP TEMPORARY TABLE IF EXISTS tmp_rebuild_suppliers;
  CREATE TEMPORARY TABLE tmp_rebuild_suppliers AS
  SELECT
    ROW_NUMBER() OVER (ORDER BY code) AS supplierNo,
    id AS supplierId,
    code
  FROM suppliers;

  DROP TEMPORARY TABLE IF EXISTS tmp_rebuild_criteria;
  CREATE TEMPORARY TABLE tmp_rebuild_criteria AS
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

  DROP TEMPORARY TABLE IF EXISTS tmp_rebuild_item_scores;
  CREATE TEMPORARY TABLE tmp_rebuild_item_scores AS
  SELECT
    supplier.supplierNo,
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
      WHEN supplier.supplierNo MOD 10 IN (1, 2, 3) THEN 4 + ((period.periodOrder + criterion.criterionNo) MOD 2)
      WHEN supplier.supplierNo MOD 10 IN (4, 5, 6) THEN 3 + ((period.periodOrder + criterion.criterionNo) MOD 3)
      WHEN supplier.supplierNo MOD 10 IN (7, 8) THEN 2 + ((period.periodOrder + criterion.criterionNo) MOD 3)
      ELSE 1 + ((period.periodOrder + criterion.criterionNo) MOD 3)
    END AS score,
    'Dữ liệu đánh giá rebuild theo bộ tiêu chí workbook 17062026' AS note
  FROM tmp_rebuild_suppliers supplier
  CROSS JOIN tmp_rebuild_periods period
  CROSS JOIN tmp_rebuild_criteria criterion;

  DROP TEMPORARY TABLE IF EXISTS tmp_rebuild_group_scores;
  CREATE TEMPORARY TABLE tmp_rebuild_group_scores AS
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
  FROM tmp_rebuild_item_scores
  GROUP BY supplierId, period, groupId, groupCode, groupName, groupWeight, groupSortOrder;

  DROP TEMPORARY TABLE IF EXISTS tmp_rebuild_evaluation_scores;
  CREATE TEMPORARY TABLE tmp_rebuild_evaluation_scores AS
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
  FROM tmp_rebuild_group_scores group_score
  GROUP BY group_score.supplierId, group_score.period;

  DROP TEMPORARY TABLE IF EXISTS tmp_rebuild_evaluations_to_insert;
  CREATE TEMPORARY TABLE tmp_rebuild_evaluations_to_insert AS
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
  FROM tmp_rebuild_evaluation_scores score
  JOIN tmp_rebuild_periods period ON period.period = score.period
  JOIN rank_rules rank_rule
    ON rank_rule.configId = v_config_id
   AND rank_rule.isActive = TRUE
   AND score.totalScore >= rank_rule.minScore
   AND score.totalScore <= rank_rule.maxScore;

  INSERT INTO evaluations
    (id, period, evaluator, totalScore, rankCode, rankName, rankColor,
     groupScores, supplierId, configId, createdAt)
  SELECT
    evaluationId,
    period,
    'Ban đánh giá dữ liệu workbook',
    totalScore,
    rankCode,
    rankName,
    rankColor,
    groupScores,
    supplierId,
    v_config_id,
    evaluatedAt
  FROM tmp_rebuild_evaluations_to_insert;

  INSERT INTO evaluation_items
    (id, score, note, normalizedScore, evaluationId, criterionId)
  SELECT
    UUID(),
    item.score,
    item.note,
    ROUND(item.score / v_scale_max * 100, 2),
    evaluation.evaluationId,
    item.criterionId
  FROM tmp_rebuild_item_scores item
  JOIN tmp_rebuild_evaluations_to_insert evaluation
    ON evaluation.supplierId = item.supplierId
   AND evaluation.period = item.period;

  UPDATE suppliers supplier
  JOIN evaluations latest_evaluation
    ON latest_evaluation.supplierId = supplier.id
   AND latest_evaluation.period = '2026-Q2'
  SET
    supplier.latestScore = latest_evaluation.totalScore,
    supplier.latestRankCode = latest_evaluation.rankCode,
    supplier.latestRankName = latest_evaluation.rankName,
    supplier.latestRankColor = latest_evaluation.rankColor,
    supplier.lastEvaluatedAt = latest_evaluation.createdAt,
    supplier.updatedAt = NOW();

  SELECT
    (SELECT COUNT(*) FROM suppliers) AS suppliers,
    (SELECT COUNT(*) FROM evaluations) AS evaluations,
    (SELECT COUNT(*) FROM evaluation_items) AS evaluationItems,
    (SELECT COUNT(*) FROM tmp_rebuild_criteria) AS criteriaPerEvaluation;

  DROP TEMPORARY TABLE IF EXISTS tmp_rebuild_evaluations_to_insert;
  DROP TEMPORARY TABLE IF EXISTS tmp_rebuild_evaluation_scores;
  DROP TEMPORARY TABLE IF EXISTS tmp_rebuild_group_scores;
  DROP TEMPORARY TABLE IF EXISTS tmp_rebuild_item_scores;
  DROP TEMPORARY TABLE IF EXISTS tmp_rebuild_criteria;
  DROP TEMPORARY TABLE IF EXISTS tmp_rebuild_suppliers;
  DROP TEMPORARY TABLE IF EXISTS tmp_rebuild_periods;
END//

CALL rebuild_evaluations_for_default_config()//

DROP PROCEDURE IF EXISTS rebuild_evaluations_for_default_config//

DELIMITER ;
