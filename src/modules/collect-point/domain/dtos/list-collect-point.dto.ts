import { ApiProperty } from '@nestjs/swagger';
import { BrazilianStates } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty } from 'class-validator';

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
}
