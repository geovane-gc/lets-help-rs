import { faker } from '@faker-js/faker';
import CollectPointEntity from '../domain/entities/collect-point.entity';

export const generateMockCollectPoint = (
  partial?: CollectPointEntity,
): CollectPointEntity => {
  return {
    id: faker.string.uuid(),
    city: faker.location.city(),
    state: faker.location.state(),
    latitude: faker.number.float(),
    longitude: faker.number.float(),
    description: faker.lorem.sentence(),
    reviews: faker.number.int(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    deletedAt: null,
    ...partial,
  };
};
