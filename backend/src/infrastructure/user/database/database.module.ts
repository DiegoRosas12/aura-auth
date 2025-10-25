/**
 * Database Module
 * Configures TypeORM connection and provides database-related services
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserOrmEntity } from './entity/user.orm-entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [UserOrmEntity],
        migrations: ['dist/infrastructure/database/migration/**/*.js'],
        synchronize: false,
        logging: configService.get('NODE_ENV') === 'development',
        migrationsRun: true, // Auto-run migrations on startup
      }),
    }),
    TypeOrmModule.forFeature([UserOrmEntity]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
