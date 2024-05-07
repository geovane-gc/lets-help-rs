import { Injectable } from '@nestjs/common';
import { CollectPoint } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';

import { FindAllResponseDto } from 'src/shared/domain/dtos/find-all-response.dto';

import { CreateCollectPointDto } from '../../domain/dtos/create-collect-point.dto';
import { ListCollectPointParamsDto } from '../../domain/dtos/list-collect-point.dto';
import CollectPointEntity from '../../domain/entities/collect-point.entity';

@Injectable()
export class CollectPointRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createCollectPointDto: CreateCollectPointDto,
  ): Promise<CollectPointEntity> {
    const collectPoint = await this.prismaService.collectPoint.create({
      data: {
        ...createCollectPointDto,
      },
    });

    return CollectPointEntity.fromPrisma(collectPoint);
  }

  async findAll(
    params: ListCollectPointParamsDto,
  ): Promise<FindAllResponseDto<Array<CollectPointEntity>>> {
    const skip = params.skip ? +params.skip : undefined;
    const take = params.take ? +params.take : undefined;
    const orderBy = params.orderBy ?? 'id';
    const ordering = params.ordering ?? 'desc';

    const [total, prismaCollectPoints] = await this.prismaService.$transaction([
      this.prismaService.collectPoint.count({
        where: {
          state: params.state,
          city: params.city,
          deletedAt: null,
        },
      }),
      this.prismaService.collectPoint.findMany({
        skip: skip,
        take: take,
        where: {
          state: params.state,
          city: params.city,
          deletedAt: null,
        },
        orderBy: {
          [orderBy]: ordering,
        },
      }),
    ]);

    const collectPoints = prismaCollectPoints.map((collectPoint) =>
      CollectPointEntity.fromPrisma(collectPoint),
    );

    // TODO - Maybe this is not going to be paginated
    return {
      data: collectPoints,
      total: total,
      pages: take ? Math.round(total / take) : 0,
    };
  }

  async findOne(id: string): Promise<CollectPointEntity> {
    const collectPoint = await this.prismaService.collectPoint.findUnique({
      where: {
        id,
      },
    });

    return CollectPointEntity.fromPrisma(collectPoint);
  }

  async findOneBy(where: Partial<CollectPoint>): Promise<CollectPointEntity> {
    const collectPoint = await this.prismaService.collectPoint.findFirst({
      where,
    });

    return CollectPointEntity.fromPrisma(collectPoint);
  }

  async remove(id: string): Promise<CollectPointEntity> {
    const collectPoint = await this.prismaService.collectPoint.delete({
      where: {
        id,
      },
    });

    return CollectPointEntity.fromPrisma(collectPoint);
  }

  async removeBy(where: Partial<CollectPoint>): Promise<CollectPointEntity> {
    const collectPoint = await this.prismaService.collectPoint.deleteMany({
      where,
    });

    return CollectPointEntity.fromPrisma(collectPoint[0]);
  }
}
