import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsHexColor,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
  IsIn,
} from 'class-validator';

export class UpsertCriterionDto {
  @IsOptional() @IsNumber() @Min(0) @Max(100)
  layer1Weight?: number;

  @IsOptional() @IsIn(['supplier', 'contract'])
  scope?: string;

  @IsOptional() @IsArray() @IsString({ each: true })
  applicableFields?: string[];

  @IsOptional() @IsArray() @IsInt({ each: true }) @Min(0, { each: true }) @Max(5, { each: true })
  allowedScores?: number[];

  @IsOptional() @IsString()
  guidance?: string;

  @IsOptional() @IsString()
  sourceSheet?: string;

  @IsOptional() @IsInt()
  sourceRow?: number;
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  @MaxLength(40)
  code: string;

  @IsString()
  @MaxLength(4000)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  layer1Code?: string;

  @IsOptional()
  @IsString()
  layer1Name?: string;

  @IsOptional()
  @IsString()
  applicableType?: string;

  @IsOptional()
  @IsString()
  reference?: string;

  @IsOptional()
  @IsString()
  source?: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  weight: number;

  @IsInt()
  sortOrder: number;

  @IsBoolean()
  isActive: boolean;
}

export class UpsertGroupDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  @MaxLength(20)
  code: string;

  @IsString()
  @MaxLength(255)
  name: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  weight: number;

  @IsInt()
  sortOrder: number;

  @IsBoolean()
  isActive: boolean;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UpsertCriterionDto)
  criteria: UpsertCriterionDto[];
}

export class UpsertScoreOptionDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsInt()
  value: number;

  @IsString()
  @MaxLength(120)
  label: string;

  @IsInt()
  sortOrder: number;

  @IsBoolean()
  isActive: boolean;
}

export class UpsertRankRuleDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  @MaxLength(20)
  code: string;

  @IsString()
  @MaxLength(120)
  name: string;

  @IsHexColor()
  color: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  minScore: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  maxScore: number;

  @IsInt()
  sortOrder: number;

  @IsBoolean()
  isActive: boolean;
}

export class PartnerDto {
  @IsString() @MaxLength(120)
  field: string;
  @IsString() @MaxLength(255)
  name: string;
  @IsInt() @Min(1) @Max(3)
  tier: number;
}

export class UpsertEvaluationConfigDto {
  @IsOptional() @IsString()
  version?: string;

  @IsOptional() @IsIn(['legacy', 'layered'])
  scoringMethod?: string;

  @IsOptional() @IsBoolean()
  weightsConfirmed?: boolean;

  @IsOptional() @IsArray() @IsString({ each: true })
  procurementFields?: string[];

  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => PartnerDto)
  partners?: PartnerDto[];

  @IsOptional() @IsString()
  sourceFile?: string;

  @IsOptional() @IsString()
  sourceHash?: string;
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsBoolean()
  isActive: boolean;

  @IsBoolean()
  isDefault: boolean;

  @IsBoolean()
  useCriterionWeights: boolean;

  @IsString()
  @MaxLength(40)
  evaluationPeriod: string;

  @IsInt()
  @Min(0)
  scaleMin: number;

  @IsInt()
  @Min(1)
  scaleMax: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UpsertGroupDto)
  groups: UpsertGroupDto[];

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UpsertScoreOptionDto)
  scoreOptions: UpsertScoreOptionDto[];

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UpsertRankRuleDto)
  rankRules: UpsertRankRuleDto[];
}
