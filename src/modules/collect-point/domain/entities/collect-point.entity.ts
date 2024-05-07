import { CollectPoint } from '@prisma/client';

export default class CollectPointEntity {
  readonly id: string;
  readonly state: string;
  readonly city: string;
  readonly description: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly reviews: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt?: Date | null;

  constructor({
    id,
    state,
    city,
    description,
    latitude,
    longitude,
    reviews,
    createdAt,
    updatedAt,
    deletedAt,
  }: CollectPointEntity) {
    this.id = id;
    this.state = state;
    this.city = city;
    this.description = description;
    this.latitude = latitude;
    this.longitude = longitude;
    this.reviews = reviews;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  static fromPrisma(collectPoint: CollectPoint): CollectPointEntity {
    if (!collectPoint) return null;

    return new CollectPointEntity({
      ...collectPoint,
    });
  }
}
