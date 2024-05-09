import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class ListCollectPointParams {
  where: Prisma.CollectPointWhereInput;
}

export class ListCollectPointParamsDto {
  @ApiProperty({
    description: 'Latitude do ponto de coleta',
    example: -28.47648,
    required: false,
  })
  @Type(() => Number)
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'Latitude em formato inválido' },
  )
  @IsOptional()
  readonly latitude?: number;

  @ApiProperty({
    description: 'Longitude do ponto de coleta',
    example: -49.016991,
    required: false,
  })
  @Type(() => Number)
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'Longitude em formato inválido' },
  )
  @IsOptional()
  readonly longitude?: number;
}
