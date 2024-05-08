import { Injectable } from '@nestjs/common';
import { CollectPoint } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';

import { FindAllResponseDto } from 'src/shared/domain/dtos/find-all-response.dto';

import { LOCALIZATION_ACCURACY_RADIUS_IN_DEGREES } from 'src/shared/domain/constants/localization.constants';
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

    /**
     *  Both of these values include a radius that will be implied while searching for collect points
     *  in order to get better results based on the not-so-precise behavior of localization services
     *  on mobile devices.
     */
    const [
      latitudeLowerBound,
      latitudeUpperBound,
      longitudeLowerBound,
      longitudeUpperBound,
    ] = this.generateCoordinatesRadius(params.latitude, params.longitude);

    const [total, prismaCollectPoints] = await this.prismaService.$transaction([
      this.prismaService.collectPoint.count({
        where: {
          state: params.state,
          city: params.city,

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

  private generateCoordinatesRadius(
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
