import { Module } from '@nestjs/common';
import { RedisConfigModule } from './redisConfig/redis.config.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    RedisModule,
    RedisConfigModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
