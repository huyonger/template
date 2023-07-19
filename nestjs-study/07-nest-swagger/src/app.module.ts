import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { UploadModule } from './views/upload/upload.module';
import config from './config';

// 子模块加载
import { UserModule } from './views/user/user.module'

@Module({
  imports: [
    // 配置模块
    ConfigModule.forRoot({
      isGlobal: true, // 作用于全局
      load: [config], // 加载自定义配置项
    }),
    // 连接数据库
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        name: 'default',
        host: configService.get('db.host'),
        port: configService.get('db.port'),
        username: configService.get('db.name'),
        password: configService.get('db.password'),
        database: configService.get('db.database'),
        entities: [__dirname + '/**/*.entity.ts'],
        autoLoadEntities: true,
        synchronize: false,
        dateStrings: true,
        timezone: '+08:00', // 东八区
      })
    }),
    UserModule,
    UploadModule
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
})
export class AppModule { }
