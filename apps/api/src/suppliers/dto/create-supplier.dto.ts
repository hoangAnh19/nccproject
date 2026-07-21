import { IsArray, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(180)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  code: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  taxCode?: string;

  @IsArray()
  @IsString({ each: true })
  types: string[];

  @IsOptional()
  @IsString()
  note?: string;
}
