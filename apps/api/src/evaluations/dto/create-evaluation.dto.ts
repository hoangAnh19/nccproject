import { IsDateString, IsInt, IsNumber, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

export class CreateEvaluationDto {
  @IsInt()
  supplierId: number;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  period?: string;

  @IsOptional()
  @IsDateString()
  evaluatedAt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  evaluator?: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  scoreA: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  scoreB: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  scoreC: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  scoreD: number;
}
