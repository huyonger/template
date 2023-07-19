import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import config from 'src/config/env.index';
import { JwtAuthGuard } from 'src/common/guard/jwt.guard';
import { APP_GUARD } from '@nestjs/core';

// 子模块加载
import { UserModule } from 'src/views/user/user.module';
import { AuthModule } from 'src/views/auth/auth.module';
import { UploadModule } from 'src/views/file/file.upload.module';
import { RedisConfigModule } from 'src/libs/redis/redis.config.module';


@Module({
  imports: [
    // redis配置模块
    RedisConfigModule,
    // 环境变量配置模块
    ConfigModule.forRoot({
      isGlobal: true, // 作用于全局
      load: [config], // 加载自定义配置项
    }),
    // 数据库配置
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('db'))
    }),

    // 加载子模块
    UserModule,
    AuthModule,
    UploadModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
