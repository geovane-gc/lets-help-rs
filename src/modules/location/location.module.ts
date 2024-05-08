import { Module } from '@nestjs/common';
import { LocationController } from './infra/controllers/location.controller';
import { LocationApiService } from './services/location-api.service';
import { LocationService } from './services/location.service';

@Module({
  controllers: [LocationController],
  providers: [LocationService, LocationApiService],
})
export class LocationModule {}
