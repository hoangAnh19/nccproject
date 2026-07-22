import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoringService } from '../common/scoring.service';
import {
  Evaluation,
  EvaluationConfig,
  EvaluationCriterion,
  EvaluationGroup,
  EvaluationItem,
  RankRule,
  ScoreOption,
  Supplier,
} from './entities';
import { DatabaseSeederService } from './database-seeder.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Supplier,
      EvaluationConfig,
      EvaluationGroup,
      EvaluationCriterion,
      ScoreOption,
      RankRule,
      Evaluation,
      EvaluationItem,
    ]),
  ],
  providers: [DatabaseSeederService, ScoringService],
})
export class DatabaseModule {}
