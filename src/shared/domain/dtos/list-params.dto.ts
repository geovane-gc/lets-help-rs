import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

import { OrderingEnum } from '../enums/ordering.enum';

export class ListParamsDto {
  @ApiPropertyOptional({
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  public page?: number;

  @ApiPropertyOptional({
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  public readonly take?: number;

  @ApiPropertyOptional()
  public skip?: number;

  @ApiPropertyOptional({
    default: 'id',
  })
  @Type(() => String)
  @IsOptional()
  public orderBy?: string = 'id';

  @ApiPropertyOptional({
    default: OrderingEnum.DESC,
  })
  @Type(() => String)
  @IsOptional()
  public readonly ordering?: OrderingEnum = OrderingEnum.DESC;
}
