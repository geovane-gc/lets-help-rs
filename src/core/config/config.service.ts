import { INestApplication, Injectable, Logger } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { Environment } from './config.constants';

@Injectable()
export class ConfigService {
  environment: Environment;
  isDevelopment: boolean;
  isProduction: boolean;

  constructor() {
    this.environment = this.getEnvironment();
    this.isDevelopment = this.environment === 'development';
    this.isProduction = this.environment === 'production';

    Logger[this.isProduction ? 'warn' : 'log'](
      `Selected Application Environment: ${this.environment}`,
      'Environment',
    );
  }

  getEnvironment(): Environment {
    switch (process.env.NODE_ENV) {
      case 'production':
        return 'production';
      default:
      case 'development':
        return 'development';
    }
  }

  configureSwagger(app: INestApplication): OpenAPIObject {
    const config = new DocumentBuilder()
      .setTitle("Let's help RS!")
      .setDescription("Let's help RS API made in Node.js.")
      .setVersion('0.0.1')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('doc', app, document);
    return document;
  }
}
