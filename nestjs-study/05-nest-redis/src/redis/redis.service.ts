import { Injectable } from '@nestjs/common';
import { RedisConfigService } from '../redisConfig/redis.config.service';


@Injectable()
export class RedisService {

  constructor(private redisService:RedisConfigService){}

  async getValue(key) {
    return await this.redisService.getRedis(key)
  }

  async setValue(key,value){
    return await this.redisService.setRedis(key,value)
  }

  async setTime(key,time){
    return await this.redisService.setRedisTime(key,time)
  }
}
