import { NestFactory } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { ThrottlerModule } from '@nestjs/throttler';
import { beforeEach, describe, expect, it } from 'vitest';
import { AppModule } from './app.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

describe('AppModule', () => {
  beforeEach(async () => {
    await Test.createTestingModule({
      imports: [
        ConfigModule,
        ThrottlerModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) =>
            configService.configureThrottler(),
        }),
      ],
    }).compile();
  });

  describe('Throttling', () => {
    it('should allow less than 10 requests per 60 seconds', async () => {
      const app = await NestFactory.create(AppModule);

      app.listen(3000, '0.0.0.0', async () => {
        const promises = Array.from({ length: 10 }, () =>
          fetch('http://localhost:3000'),
        );

        await Promise.all(promises);
        expect(fetch).toHaveBeenCalledTimes(10);
      });
    });
    it('should not allow more than 10 requests per 60 seconds', async () => {
      const app = await NestFactory.create(AppModule);

      app.listen(3000, '0.0.0.0', async () => {
        const promises = Array.from({ length: 15 }, () =>
          fetch('http://localhost:3000'),
        );

        await Promise.all(promises);
        expect(fetch).not.toHaveBeenCalledTimes(15);
      });
    });
  });
});
