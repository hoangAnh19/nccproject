import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { DatabaseModule } from './database/database.module';
import { EvaluationConfigsModule } from './evaluation-configs/evaluation-configs.module';
import { EvaluationsModule } from './evaluations/evaluations.module';
import { ReportsModule } from './reports/reports.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { HealthController } from './health.controller';
import {
  Evaluation,
  EvaluationConfig,
  EvaluationCriterion,
  EvaluationGroup,
  EvaluationItem,
  RankRule,
  ScoreOption,
  Supplier,
} from './database/entities';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 13306),
      username: process.env.DB_USER ?? 'ncc_user',
      password: process.env.DB_PASSWORD ?? 'ncc_pass',
      database: process.env.DB_NAME ?? 'ncc_db',
      entities: [
        Supplier,
        EvaluationConfig,
        EvaluationGroup,
        EvaluationCriterion,
        ScoreOption,
        RankRule,
        Evaluation,
        EvaluationItem,
      ],
      synchronize: (process.env.DB_SYNC ?? 'true') === 'true',
      charset: 'utf8mb4_unicode_ci',
    }),
    SuppliersModule,
    EvaluationConfigsModule,
    EvaluationsModule,
    ReportsModule,
    AdminModule,
    DatabaseModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
