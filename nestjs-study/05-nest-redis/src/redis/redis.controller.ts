import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {
  constructor(private readonly appService: RedisService) {}

  @Get('get')
  getRedisValue(@Query() que) {
    return this.appService.getValue(que.key);
  }

  @Post('set')
  setRedisValue(@Body() body){
    return this.appService.setValue(body.key,body.value)
  }

  @Post('time')
  setRedisTime(@Body() body){
    return this.appService.setTime(body.key,body.time)
  }

}
