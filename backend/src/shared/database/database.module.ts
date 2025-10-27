import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserOrmEntity } from '../../infrastructure/user/database/entity/user.orm-entity';

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
        migrations: ['dist/shared/database/migrations/**/*.js'],
        synchronize: false,
        logging: configService.get('NODE_ENV') === 'development',
        migrationsRun: true,
      }),
    }),
    TypeOrmModule.forFeature([UserOrmEntity]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
