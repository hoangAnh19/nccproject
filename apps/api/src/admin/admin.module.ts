import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoringService } from '../common/scoring.service';
import { EvaluationConfig, EvaluationGroup, RankRule, ScoreOption } from '../database/entities';
import { EvaluationConfigsModule } from '../evaluation-configs/evaluation-configs.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EvaluationConfig, EvaluationGroup, ScoreOption, RankRule]),
    EvaluationConfigsModule,
  ],
  controllers: [AdminController],
  providers: [AdminService, ScoringService],
})
export class AdminModule {}
