import fs from 'node:fs';

const source = JSON.parse(fs.readFileSync('database/criteria-from-workbook.json', 'utf8'));

const config = {
  name: 'Bộ tiêu chí đánh giá NCC CNTT 17062026',
  description: 'Import từ workbook Bộ_tiêu_chí_đánh_giá_NCC_CNTT_17062026.xlsx',
  evaluationPeriod: source.evaluationPeriod,
  scaleMin: source.scaleMin,
  scaleMax: source.scaleMax,
  useCriterionWeights: true,
  groups: source.groups,
  scoreOptions: [
    { value: 1, label: 'Không đạt / Không có thông tin', sortOrder: 1, isActive: true },
    { value: 2, label: 'Yếu', sortOrder: 2, isActive: true },
    { value: 3, label: 'Đạt yêu cầu tối thiểu', sortOrder: 3, isActive: true },
    { value: 4, label: 'Tốt', sortOrder: 4, isActive: true },
    { value: 5, label: 'Xuất sắc', sortOrder: 5, isActive: true },
  ],
  rankRules: source.ranks,
};

function sqlString(value) {
  if (value === null || value === undefined || value === '') return 'NULL';
  return `'${String(value).replaceAll('\\', '\\\\').replaceAll("'", "''")}'`;
}

function sqlNumber(value) {
  return Number(value).toFixed(6).replace(/\.?0+$/, '');
}

fs.writeFileSync(
  'apps/api/src/database/default-evaluation-config.ts',
  `export const defaultEvaluationConfig = ${JSON.stringify(config, null, 2)} as const;\n`,
  'utf8',
);

const lines = [];
lines.push('-- Import cấu hình đánh giá từ workbook Bộ_tiêu_chí_đánh_giá_NCC_CNTT_17062026.xlsx');
lines.push('-- Chạy bằng mysql client với UTF-8:');
lines.push('-- docker compose exec -T mysql mysql --default-character-set=utf8mb4 -uncc_user -pncc_pass ncc_db < database/import-workbook-evaluation-config.sql');
lines.push('');
lines.push('SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;');
lines.push('SET CHARACTER SET utf8mb4;');
lines.push('');
lines.push('DELIMITER //');
lines.push('DROP PROCEDURE IF EXISTS add_eval_criteria_column//');
lines.push('CREATE PROCEDURE add_eval_criteria_column(IN p_column_name VARCHAR(64), IN p_column_definition TEXT)');
lines.push('BEGIN');
lines.push('  IF NOT EXISTS (');
lines.push('    SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS');
lines.push('    WHERE TABLE_SCHEMA = DATABASE()');
lines.push("      AND TABLE_NAME = 'evaluation_criteria'");
lines.push('      AND COLUMN_NAME = p_column_name');
lines.push('  ) THEN');
lines.push("    SET @ddl = CONCAT('ALTER TABLE evaluation_criteria ADD COLUMN ', p_column_name, ' ', p_column_definition);");
lines.push('    PREPARE stmt FROM @ddl;');
lines.push('    EXECUTE stmt;');
lines.push('    DEALLOCATE PREPARE stmt;');
lines.push('  END IF;');
lines.push('END//');
lines.push('DELIMITER ;');
lines.push('');
lines.push("CALL add_eval_criteria_column('layer1Code', 'VARCHAR(40) NULL');");
lines.push("CALL add_eval_criteria_column('layer1Name', 'VARCHAR(255) NULL');");
lines.push("CALL add_eval_criteria_column('applicableType', 'VARCHAR(120) NULL');");
lines.push("CALL add_eval_criteria_column('reference', 'TEXT NULL');");
lines.push("CALL add_eval_criteria_column('source', 'TEXT NULL');");
lines.push('DROP PROCEDURE IF EXISTS add_eval_criteria_column;');
lines.push('');
lines.push('SET @config_id = UUID();');
lines.push('');
lines.push('UPDATE evaluation_configs SET isDefault = FALSE;');
lines.push('');
lines.push(`INSERT INTO evaluation_configs`);
lines.push(`  (id, name, description, isActive, isDefault, useCriterionWeights, evaluationPeriod, scaleMin, scaleMax, createdAt, updatedAt)`);
lines.push(`VALUES`);
lines.push(`  (@config_id, ${sqlString(config.name)}, ${sqlString(config.description)}, TRUE, TRUE, TRUE, ${sqlString(config.evaluationPeriod)}, ${config.scaleMin}, ${config.scaleMax}, NOW(), NOW());`);
lines.push('');

config.groups.forEach((group, groupIndex) => {
  lines.push(`SET @group_${group.code}_id = UUID();`);
  lines.push(`INSERT INTO evaluation_groups (id, code, name, weight, sortOrder, isActive, configId)`);
  lines.push(`VALUES (@group_${group.code}_id, ${sqlString(group.code)}, ${sqlString(group.name)}, ${sqlNumber(group.weight)}, ${groupIndex + 1}, TRUE, @config_id);`);
  group.criteria.forEach((criterion, criterionIndex) => {
    lines.push(`INSERT INTO evaluation_criteria`);
    lines.push(`  (id, code, name, description, layer1Code, layer1Name, applicableType, reference, source, weight, sortOrder, isActive, groupId)`);
    lines.push(`VALUES`);
    lines.push(
      `  (UUID(), ${sqlString(criterion.code)}, ${sqlString(criterion.name)}, ${sqlString(criterion.description)}, ${sqlString(criterion.layer1Code)}, ${sqlString(criterion.layer1Name)}, ${sqlString(criterion.applicableType)}, ${sqlString(criterion.reference)}, ${sqlString(criterion.source)}, ${sqlNumber(criterion.weight)}, ${criterionIndex + 1}, TRUE, @group_${group.code}_id);`,
    );
  });
  lines.push('');
});

config.scoreOptions.forEach((option) => {
  lines.push(`INSERT INTO score_options (id, value, label, sortOrder, isActive, configId)`);
  lines.push(
    `VALUES (UUID(), ${option.value}, ${sqlString(option.label)}, ${option.sortOrder}, TRUE, @config_id);`,
  );
});
lines.push('');

config.rankRules.forEach((rank) => {
  lines.push(`INSERT INTO rank_rules (id, code, name, color, minScore, maxScore, sortOrder, isActive, configId)`);
  lines.push(
    `VALUES (UUID(), ${sqlString(rank.code)}, ${sqlString(rank.name)}, ${sqlString(rank.color)}, ${sqlNumber(rank.minScore)}, ${sqlNumber(rank.maxScore)}, ${rank.sortOrder}, TRUE, @config_id);`,
  );
});
lines.push('');
lines.push('SELECT @config_id AS importedConfigId, COUNT(*) AS criteriaCount');
lines.push('FROM evaluation_criteria');
lines.push('WHERE groupId IN (SELECT id FROM evaluation_groups WHERE configId = @config_id);');

fs.writeFileSync('database/import-workbook-evaluation-config.sql', `${lines.join('\n')}\n`, 'utf8');

console.log(`Generated ${config.groups.length} groups and ${config.groups.reduce((sum, group) => sum + group.criteria.length, 0)} criteria.`);
