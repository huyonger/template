/* 
 * xml请求支持中间件,依赖于xml2js来处理xml格式内容并且将其转换为json
 *
*/

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
const xml2js = require('xml2js');
const parser = new xml2js.Parser();

@Injectable()
export class XMLMiddleware implements NestMiddleware {
  // 参数是固定的Request/Response/next
  use(req: Request, res: Response, next: Function) {
    console.log('进入全局xml中间件...');
    // 获取express原生请求对象req,找到其请求头内容，如果包含application/xml，则执行转换
    if(req.headers['content-type'] && req.headers['content-type'].includes('application/xml')){
      // 监听data方法获取到对应的参数数据
      req.on('data', mreq => {
        // 使用xml2js对xml数据进行转换
        parser.parseString(mreq,function(err,result){
          // 将转换后的数据放入到请求对象的req中
          console.log('parseString转换后的数据',result);
          // 这里根据需要做一些修改以补充完善内容
          req['body']= result;
        })
      })
    }
    // 调用next方法进入到下一个中间件或者路由
    next();
  }
}