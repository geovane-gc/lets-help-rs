import { BadRequestException, Injectable } from '@nestjs/common';
import { CollectPoint } from '@prisma/client';

import { FindAllResponseDto } from 'src/shared/domain/dtos/find-all-response.dto';

import { CreateCollectPointDto } from '../domain/dtos/create-collect-point.dto';
import { ListCollectPointParamsDto } from '../domain/dtos/list-collect-point.dto';
import CollectPointEntity from '../domain/entities/collect-point.entity';

import { CollectPointRepository } from '../infra/repositories/collect-point.repository';

import {
  CREATION_ACCURACY_RADIUS_IN_DEGREES,
  LOCALIZATION_ACCURACY_RADIUS_IN_DEGREES,
} from 'src/shared/domain/constants/localization.constants';

@Injectable()
export class CollectPointService {
  constructor(
    private readonly collectPointRepository: CollectPointRepository,
  ) {}

  async create(
    createCollectPointDto: CreateCollectPointDto,
  ): Promise<CollectPointEntity> {
    const [
      latitudeLowerBound,
      latitudeUpperBound,
      longitudeLowerBound,
      longitudeUpperBound,
    ] = this.generateCreationCoordinatesRadius(
      createCollectPointDto.latitude,
      createCollectPointDto.longitude,
    );

    const collectPointExists = await this.collectPointRepository.findAll({
      where: {
        deletedAt: null,
        ...(createCollectPointDto.latitude && {
          latitude: {
            gte: latitudeLowerBound,
            lte: latitudeUpperBound,
          },
        }),
        ...(createCollectPointDto.longitude && {
          longitude: {
            gte: longitudeLowerBound,
            lte: longitudeUpperBound,
          },
        }),
      },
    });

    if (collectPointExists.total) {
      throw new BadRequestException(
        'Já existe um ponto de coleta cadastrado nesse raio/perímetro!',
      );
    }

    return await this.collectPointRepository.create(createCollectPointDto);
  }

  async findAll(
    params: ListCollectPointParamsDto,
  ): Promise<FindAllResponseDto<Array<CollectPointEntity>>> {
    const [
      latitudeLowerBound,
      latitudeUpperBound,
      longitudeLowerBound,
      longitudeUpperBound,
    ] = this.generateLocalizationCoordinatesRadius(
      params.latitude,
      params.longitude,
    );

    return await this.collectPointRepository.findAll({
      where: {
        deletedAt: null,
        ...(params.latitude && {
          latitude: {
            gte: latitudeLowerBound,
            lte: latitudeUpperBound,
          },
        }),
        ...(params.longitude && {
          longitude: {
            gte: longitudeLowerBound,
            lte: longitudeUpperBound,
          },
        }),
      },
    });
  }

  async findOne(id: string): Promise<CollectPointEntity> {
    return await this.collectPointRepository.findOne(id);
  }

  async findOneBy(where: Partial<CollectPoint>): Promise<CollectPointEntity> {
    return await this.collectPointRepository.findOneBy(where);
  }

  async remove(id: string): Promise<CollectPointEntity> {
    const collectPointExists = await this.collectPointRepository.findOneBy({
      id,
      deletedAt: null,
    });

    if (!collectPointExists?.id)
      throw new BadRequestException('Esse ponto de coleta não existe!');

    return await this.collectPointRepository.remove(id);
  }

  private generateCreationCoordinatesRadius(
    latitude: number,
    longitude: number,
  ): Array<number> {
    const variance = CREATION_ACCURACY_RADIUS_IN_DEGREES / 2;

    return [
      latitude - variance,
      latitude + variance,
      longitude - variance,
      longitude + variance,
    ];
  }

  private generateLocalizationCoordinatesRadius(
    latitude: number,
    longitude: number,
  ): Array<number> {
    const variance = LOCALIZATION_ACCURACY_RADIUS_IN_DEGREES / 2;

    return [
      latitude - variance,
      latitude + variance,
      longitude - variance,
      longitude + variance,
    ];
  }
}
