import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

// redis单库
const redisConfig = {
  port: 6379,
  host: '127.0.0.1',
  password: '123456',
  db: 0
};


// redis集群配置
const redisClusterConfig = [
  {
    port: 6379,
    host: '127.0.0.1',
    password: '123456',
    db: 1
  },
  {
    port: 6379,
    host: '127.0.0.1',
    password: '123456',
    db: 2
  },
];

@Injectable()
export class RedisConfigService{
  private redisClient;
  constructor() {
    this.initRedis()
  }
  /**
   * 初始化登录
   * @param connectType 
   */
  private async initRedis(connectType ?: string) {
    if (connectType && connectType === 'cluster') {
      const cluster = new Redis.Cluster(redisClusterConfig);
      cluster.on('error', (err) => console.log('Redis cluster Error', err));
      cluster.on('connect', () => {
        console.log('redis连接成功')
        this.redisClient = cluster
      });
    } else {
      const redis = new Redis(redisConfig);
      redis.on('error', (err) => console.log('Redis cluster Error', err));
      redis.on('connect', () => {
        console.log('redis连接成功')
        this.redisClient = redis
      });
    }
  }

  /**
   * 设置redis键值对内容
   * @param key 健名
   * @param value 内容
   * @param time 过期时间
   * @returns 
   */
  async setRedis(key:string, value:any, time?: number): Promise<Boolean> {
    let isOk = true
    // 存储
    await this.redisClient.set(key, value, (err, data) => {
      // 为key 设定一个时长 单位为S
      if (err) {
        console.log('redis set error',err);
        isOk = false
      }
      return data //成功会返回ok
    })
    if(time){
      await this.setRedisTime(key,time)
    }
    return isOk
  }

  /**
   * 获取redis内容
   * @param key 
   * @returns 
   */
  async getRedis(key:string) {
    const result = await this.redisClient.get(key)
    if(result === null){
      return null
    }
    return result
  }

  /**
   * 设定指定key对应的过期时间，单位s
   * @param key 
   * @param time 
   * @returns null 为设置失败, 1为设置成功
   */
  async setRedisTime(key:string,time:number){
    const result = await this.redisClient.expire(key,time)
    if(result === 0){
      console.log('Result Error','<'+ result+'>','Set defeated or key not find...');
      return null
    }
    return result
  }

}