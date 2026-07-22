import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsInt, IsOptional, IsString, IsUUID, Min, ValidateNested } from 'class-validator';

class PreviewScoreItemDto {
  @IsUUID()
  criterionId: string;

  @IsInt()
  @Min(0)
  score: number;

  @IsOptional()
  @IsString()
  note?: string;
}

export class PreviewScoreDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PreviewScoreItemDto)
  items: PreviewScoreItemDto[];
}
