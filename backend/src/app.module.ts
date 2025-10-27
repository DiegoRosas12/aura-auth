import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { DatabaseModule } from './shared/database/database.module';
import { AuthModule } from './infrastructure/user/security/auth.module';
import { UserDBRepository } from './infrastructure/user/repository/user-db.repository';
import { USER_REPOSITORY } from './domain/user/repository/user.repository.interface';
import { UserApplicationService } from './application/user/service/user.application-service';
import { AuthController } from './presentation/user/auth.controller';
import { UserController } from './presentation/user/user.controller';
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
    UserApplicationService,
    {
      provide: USER_REPOSITORY,
      useClass: UserDBRepository,
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
