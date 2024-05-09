import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCollectPointDto {
  @ApiProperty({
    description: 'Descrição do ponto de coleta',
    example: 'Farol Shopping',
  })
  @IsString({ message: 'Descrição em formato inválido' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Informações da latitude do ponto de coleta',
    example: -28.47648,
  })
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'Latitude em formato inválido' },
  )
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({
    description: 'Informações da longitude do ponto de coleta',
    example: -49.016991,
  })
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'Longitude em formato inválido' },
  )
  @IsNotEmpty()
  longitude: number;
}
