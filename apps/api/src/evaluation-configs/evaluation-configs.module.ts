import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoringService } from '../common/scoring.service';
import { EvaluationConfig } from '../database/entities';
import { EvaluationConfigsController } from './evaluation-configs.controller';
import { EvaluationConfigsService } from './evaluation-configs.service';

@Module({
  imports: [TypeOrmModule.forFeature([EvaluationConfig])],
  controllers: [EvaluationConfigsController],
  providers: [EvaluationConfigsService, ScoringService],
  exports: [EvaluationConfigsService],
})
export class EvaluationConfigsModule {}
