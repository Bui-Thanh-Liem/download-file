import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import * as compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/fengshui');
  app.use(json());
  app.use(helmet());
  app.use(compression());
  app.enableCors({
    origin: [
      process.env.CLIENT_HOST_CORS,
      'https://huyenhocviet.com',
      'https://www.huyenhocviet.com',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  const configSwagger = new DocumentBuilder()
    .setTitle('Fengshui Application')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('/api', app, document);

  await app.listen(9002);
}
bootstrap();
