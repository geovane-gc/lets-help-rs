import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { CollectPointModule } from 'src/modules/collect-point/collect-point.module';

@Module({
  imports: [ConfigModule, CollectPointModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
