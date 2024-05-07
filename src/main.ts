import { HttpStatus, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './core/app.module';
import { ConfigService } from './core/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.enableCors({
    credentials: true,
    optionsSuccessStatus: HttpStatus.OK,
    origin: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  configService.configureSwagger(app);

  const serverPort = Number(process.env.SERVER_PORT) || 3000;

  await app.listen(serverPort, '0.0.0.0', () => {
    Logger.log(`Server running on port ${serverPort}`, 'Bootstrap');
  });
}

bootstrap();
