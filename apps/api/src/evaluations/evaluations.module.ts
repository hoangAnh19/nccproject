import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoringService } from '../common/scoring.service';
import { Evaluation, EvaluationConfig, Supplier } from '../database/entities';
import { EvaluationConfigsModule } from '../evaluation-configs/evaluation-configs.module';
import { EvaluationsController } from './evaluations.controller';
import { EvaluationsService } from './evaluations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Evaluation, EvaluationConfig, Supplier]), EvaluationConfigsModule],
  controllers: [EvaluationsController],
  providers: [EvaluationsService, ScoringService],
  exports: [EvaluationsService],
})
export class EvaluationsModule {}
