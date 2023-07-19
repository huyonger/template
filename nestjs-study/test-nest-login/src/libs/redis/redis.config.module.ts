import { Module } from '@nestjs/common';
import { RedisConfigService } from './redis.config.service';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [RedisConfigService],
  exports: [RedisConfigService]
})
export class RedisConfigModule {}