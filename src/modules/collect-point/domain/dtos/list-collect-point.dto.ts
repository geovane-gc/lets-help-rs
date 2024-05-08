import { ApiProperty } from '@nestjs/swagger';
import { BrazilianStates } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ListParamsDto } from 'src/shared/domain/dtos/list-params.dto';

export class ListCollectPointParamsDto extends ListParamsDto {
  @ApiProperty({
    description: 'Busca pelo estado localizado do ponto de coleta',
  })
  @IsEnum(BrazilianStates, {
    message: 'Estado inválido',
  })
  @IsNotEmpty()
  readonly state: BrazilianStates;

  @ApiProperty({
    description: 'Busca pela cidade localizada do ponto de coleta',
  })
  @Type(() => String)
  @IsNotEmpty()
  readonly city: string;

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
