import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

import { ListParamsDto } from 'src/shared/domain/dtos/list-params.dto';

export class ListCollectPointParamsDto extends ListParamsDto {
  @ApiProperty({
    description: 'Busca pelo estado localizado do ponto de coleta',
  })
  @Type(() => String)
  @IsNotEmpty()
  readonly state: string;

  @ApiProperty({
    description: 'Busca pela cidade localizada do ponto de coleta',
  })
  @Type(() => String)
  @IsNotEmpty()
  readonly city: string;
}
