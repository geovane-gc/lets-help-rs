import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { FindAllResponseDto } from 'src/shared/domain/dtos/find-all-response.dto';
import { CreateCollectPointDto } from '../../domain/dtos/create-collect-point.dto';
import { ListCollectPointParamsDto } from '../../domain/dtos/list-collect-point.dto';
import CollectPointEntity from '../../domain/entities/collect-point.entity';
import { CollectPointService } from '../../services/collect-point.service';

@ApiTags('Collect Points')
@Controller('collect-points')
export class CollectPointController {
  constructor(private readonly collectPointService: CollectPointService) {}

  @ApiOperation({
    summary: 'Cadastrar um ponto de coleta',
    description: 'Cadastra um ponto de coleta para doações',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'O ponto de coleta foi cadastrado com sucesso',
  })
  @Post()
  create(
    @Body() createCollectPointDto: CreateCollectPointDto,
  ): Promise<CollectPointEntity> {
    return this.collectPointService.create(createCollectPointDto);
  }

  @ApiOperation({
    summary: 'Listar todos os pontos de coleta cadastrados na plataforma',
    description: 'Lista os pontos de coleta e suas informações',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Pontos de coleta encontrados com sucesso',
  })
  @Get()
  findAll(
    @Query() params: ListCollectPointParamsDto,
  ): Promise<FindAllResponseDto<Array<CollectPointEntity>>> {
    return this.collectPointService.findAll(params);
  }

  @ApiOperation({
    summary: 'Buscar um ponto de coleta',
    description:
      'Busca um ponto de coleta pelo seu ID e exibe suas informações',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ponto de coleta encontrado com sucesso',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<CollectPointEntity> {
    return this.collectPointService.findOne(id);
  }
}
