/**
 * Main Application Entry Point
 * Bootstraps the NestJS application
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);

  // Enable CORS for development
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  });

  const port = process.env.PORT || 3000;

  // Bind to 0.0.0.0 to allow access from Windows host
  await app.listen(port, '0.0.0.0');

  logger.log(`🚀 Application is running on: http://localhost:${port}`);
  logger.log(`📚 API endpoints available at: http://localhost:${port}/api`);
  logger.log(`🌐 Accessible from Windows at: http://localhost:${port}`);
}

bootstrap();
