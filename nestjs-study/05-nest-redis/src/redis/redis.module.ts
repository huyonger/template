import { Module } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { RedisConfigModule } from 'src/redisConfig/redis.config.module';
import { RedisController } from './redis.controller';


@Module({
  imports: [RedisConfigModule],
  controllers: [RedisController],
  providers: [
    RedisService
  ],
})
export class RedisModule {}