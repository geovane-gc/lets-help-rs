import { ApiProperty } from '@nestjs/swagger';

export class Regiao {
  @ApiProperty({
    type: Number,
    description: 'ID da região no IBGE.',
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'Sigla da região no IBGE.',
  })
  sigla: string;

  @ApiProperty({
    type: String,
    description: 'Nome da região no IBGE.',
  })
  nome: string;
}

export class Uf {
  @ApiProperty({
    type: Number,
    description: 'ID da UF no IBGE.',
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'Sigla da UF no IBGE.',
  })
  sigla: string;

  @ApiProperty({
    type: String,
    description: 'Nome da UF no IBGE.',
  })
  nome: string;

  @ApiProperty({
    type: Regiao,
    description: 'Região da UF no IBGE.',
  })
  regiao: Regiao;
}

export class Mesorregiao {
  @ApiProperty({
    type: Number,
    description: 'ID da mesoregião no IBGE.',
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'Nome da mesoregião no IBGE.',
  })
  nome: string;

  @ApiProperty({
    type: Uf,
    description: 'UF da mesoregião no IBGE.',
  })
  UF: Uf;
}

export class Microrregiao {
  @ApiProperty({
    type: Number,
    description: 'ID da microrregião no IBGE.',
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'Nome da microrregião no IBGE.',
  })
  nome: string;

  @ApiProperty({
    type: Mesorregiao,
    description: 'Mesorregião da microrregião no IBGE.',
  })
  mesorregiao: Mesorregiao;
}

export class CityApi {
  @ApiProperty({
    type: Number,
    description: 'ID da cidade no IBGE.',
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'Nome da cidade no IBGE.',
  })
  nome: string;

  @ApiProperty({
    type: Microrregiao,
    description: 'Microrregião da cidade no IBGE.',
  })
  microrregiao: Microrregiao;
}
