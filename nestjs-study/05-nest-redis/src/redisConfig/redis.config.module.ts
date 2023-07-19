import { Module } from '@nestjs/common';
import { RedisConfigService } from './redis.config.service';


@Module({
  imports: [],
  controllers: [],
  providers: [RedisConfigService],
  exports: [RedisConfigService]
})
export class RedisConfigModule {}