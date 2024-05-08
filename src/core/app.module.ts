import { Module } from '@nestjs/common';
import { CollectPointModule } from 'src/modules/collect-point/collect-point.module';
import { LocationModule } from 'src/modules/location/location.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule, CollectPointModule, LocationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
