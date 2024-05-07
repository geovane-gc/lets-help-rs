import { BadRequestException, Injectable } from '@nestjs/common';
import { CollectPoint } from '@prisma/client';

import { FindAllResponseDto } from 'src/shared/domain/dtos/find-all-response.dto';

import { CreateCollectPointDto } from '../domain/dtos/create-collect-point.dto';
import { ListCollectPointParamsDto } from '../domain/dtos/list-collect-point.dto';
import CollectPointEntity from '../domain/entities/collect-point.entity';

import { CollectPointRepository } from '../infra/repositories/collect-point.repository';

@Injectable()
export class CollectPointService {
  constructor(
    private readonly collectPointRepository: CollectPointRepository,
  ) {}

  async create(
    createCollectPointDto: CreateCollectPointDto,
  ): Promise<CollectPointEntity> {
    const collectPointExists = await this.collectPointRepository.findOneBy({
      latitude: createCollectPointDto.latitude,
      longitude: createCollectPointDto.longitude,
      deletedAt: null,
    });

    if (collectPointExists?.id) {
      throw new BadRequestException(
        'Ponto de coleta já é cadastrado na plataforma!',
      );
    }

    return await this.collectPointRepository.create(collectPointExists);
  }

  async findAll(
    params: ListCollectPointParamsDto,
  ): Promise<FindAllResponseDto<Array<CollectPointEntity>>> {
    return await this.collectPointRepository.findAll(params);
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
}
