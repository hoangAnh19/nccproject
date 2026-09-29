import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

/** Additive migration: previous criteria and evaluations remain untouched. */
export class FinalCriteria1790640000000 implements MigrationInterface {
  async up(runner: QueryRunner): Promise<void> {
    if (!(await runner.hasTable('evaluation_configs'))) {
      // Bootstrap an empty installation from the registered entity schema.
      await runner.connection.synchronize();
      return;
    }
    const columns: Record<string, Array<[string, string, string?]>> = {
      evaluation_configs: [['version','varchar'], ['scoringMethod','varchar',"'legacy'"], ['weightsConfirmed','tinyint','0'], ['procurementFields','json'], ['partners','json'], ['sourceFile','text'], ['sourceHash','varchar']],
      evaluation_criteria: [['layer1Weight','double'], ['scope','varchar',"'supplier'"], ['applicableFields','json'], ['allowedScores','json'], ['guidance','text'], ['sourceSheet','varchar'], ['sourceRow','int']],
      evaluations: [['procurementField','varchar'], ['procurementTypes','json'], ['configSnapshot','json'], ['contracts','json'], ['calculationDetails','json']],
    };
    for (const [table, definitions] of Object.entries(columns)) {
      for (const [name, type, defaultValue] of definitions) {
        if (!(await runner.hasColumn(table, name))) await runner.addColumn(table, new TableColumn({
          name, type, length: type === 'varchar' ? '255' : undefined,
          isNullable: defaultValue === undefined, default: defaultValue,
        }));
      }
    }
    await runner.query('ALTER TABLE evaluation_criteria MODIFY name TEXT NOT NULL');
    await runner.query('ALTER TABLE evaluation_items MODIFY score INT NULL');
  }

  async down(): Promise<void> {
    throw new Error('Migration lưu dữ liệu đánh giá mới; khôi phục bản sao lưu để rollback, không xóa lịch sử tự động.');
  }
}
