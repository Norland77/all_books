import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as process from 'process';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  //app.enableCors();
  app.use(cors({ credentials: true, origin: process.env.FRONT_BASE_URL }));
  await app.listen(process.env.SERVER_PORT || 5000);
}
bootstrap();
