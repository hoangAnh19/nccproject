import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateEvaluationItemDto {
  @IsUUID()
  criterionId: string;

  @IsInt()
  @Min(0)
  score: number;

  @IsOptional()
  @IsString()
  note?: string;
}

export class CreateEvaluationDto {
  @IsUUID()
  supplierId: string;

  @IsOptional()
  @IsUUID()
  configId?: string;

  @IsString()
  @MaxLength(40)
  period: string;

  @IsString()
  @MaxLength(120)
  evaluator: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateEvaluationItemDto)
  items: CreateEvaluationItemDto[];
}
