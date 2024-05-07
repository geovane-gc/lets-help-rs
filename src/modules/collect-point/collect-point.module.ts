import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma/prisma.module';

import { CollectPointService } from './services/collect-point.service';
import { CollectPointController } from './infra/controllers/collect-point.controller';
import { CollectPointRepository } from './infra/repositories/collect-point.repository';

@Module({
  imports: [PrismaModule],
  controllers: [CollectPointController],
  providers: [CollectPointService, CollectPointRepository],
  exports: [],
})
export class CollectPointModule {}
