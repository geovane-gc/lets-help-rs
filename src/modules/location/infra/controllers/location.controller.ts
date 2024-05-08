import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BrazilianStates } from '@prisma/client';
import { CityApi } from '../../domain/interfaces/location.interface';
import { LocationApiService } from '../../services/location-api.service';
import { LocationService } from '../../services/location.service';

@Controller('location')
export class LocationController {
  constructor(
    private readonly locationService: LocationService,
    private readonly locationApiService: LocationApiService,
  ) {}

  @ApiOperation({
    summary: 'Listar cidades para UF enviada.',
    description: 'Lista todas as cidades para a UF enviada.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Cidades pertencentes à UF encontradas com sucesso.',
    type: CityApi,
  })
  @Get('cities/:stateId')
  async findCitiesForState(
    @Param('stateId') stateId: BrazilianStates,
  ): Promise<CityApi> {
    return this.locationApiService.findCitiesForState(stateId);
  }

  @ApiOperation({
    summary: 'Listar estados.',
    description: 'Lista todos os estados do Brasil.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Estados encontrados com sucesso.',
  })
  @Get('states')
  async findStates() {
    return this.locationService.findStates();
  }
}
