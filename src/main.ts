import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import {ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule, ObserveInstrument } from './app.module.js';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  app.use(helmet());
  const allowedOrigins = (process.env.CORS_ORIGINS ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

    app.enableCors({
      origin: allowedOrigins,
      methods: [ 'GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: [ 'Content-Type', 'Authorization'],
      Credentials: true,
      maxAge: 3600,
    });

  app.setGlobalPrefix( 'api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
