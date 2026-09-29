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
  ValidateIf,
  IsIn,
  IsNotEmpty,
} from 'class-validator';

export class CreateEvaluationItemDto {
  @IsUUID()
  criterionId: string;

  @ValidateIf((_object, value) => value !== null)
  @IsInt()
  @Min(0)
  score: number | null;

  @IsOptional()
  @IsString()
  note?: string;
}

export class EvaluationContractDto {
  @IsString() @IsNotEmpty() @MaxLength(120)
  code: string;

  @IsString() @IsNotEmpty() @MaxLength(255)
  name: string;

  @IsIn(['Hàng hóa', 'TV', 'PTV'])
  procurementType: string;

  @IsString() @IsNotEmpty() @MaxLength(120)
  evaluator: string;

  @IsArray() @ValidateNested({ each: true }) @Type(() => CreateEvaluationItemDto)
  items: CreateEvaluationItemDto[];
}

export class CreateEvaluationDto {
  @IsOptional() @IsString() @MaxLength(120)
  procurementField?: string;

  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => EvaluationContractDto)
  contracts?: EvaluationContractDto[];

  @IsUUID()
  supplierId: string;

  @IsOptional()
  @IsUUID()
  configId?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  period: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  evaluator: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateEvaluationItemDto)
  items: CreateEvaluationItemDto[];
}
