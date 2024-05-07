import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class FindAllResponseDto<T> {
  @ApiPropertyOptional()
  @IsOptional()
  public data: T;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  public total: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  public pages: number;
}
