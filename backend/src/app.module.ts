/**
 * App Module
 * Root module that orchestrates all feature modules and configurations
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';

// Infrastructure
import { DatabaseModule } from './infrastructure/user/database/database.module';
import { AuthModule } from './infrastructure/user/security/auth.module';
import { UserRepository } from './infrastructure/user/repository/user.repository';

// Domain
import { UserDomainService } from './domain/user/service/user.domain-service';
import { USER_REPOSITORY } from './domain/user/repository/user.repository.interface';

// Application
import { UserApplicationService } from './application/user/service/user.application-service';

// Presentation
import { AuthController } from './presentation/user/auth.controller';
import { UserController } from './presentation/user/user.controller';

// Shared
import { HttpExceptionFilter } from './shared/exception/http-exception.filter';
import { ValidationPipe } from './shared/pipe/validation.pipe';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AuthController, UserController],
  providers: [
    UserDomainService,
    UserApplicationService,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
