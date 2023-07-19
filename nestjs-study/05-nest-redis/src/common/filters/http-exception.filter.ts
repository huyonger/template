/* 
 * 全局异常捕获过滤器
 *
*/

import { ExceptionFilter, Catch, ArgumentsHost, HttpException,Logger,HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  // exception 当前正在处理的异常对象
  // host 是传递给原始处理程序的参数的一个包装(Response/Request)的引用
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // HttpException 属于基础异常类，可自定义内容
    // 如果是自定义的异常类则抛出自定义的status 
    // 否则就是内置HTTP异常类，然后抛出其对应的内置Status内容
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    // 抛出错误信息
    const message =
      exception.message ||
      null;
    let msgLog = {
      code: status, // 系统错误状态
      timestamp: new Date().toISOString(), // 错误日期
      path: request.url, // 错误路由
      message: message, 
      data: message // 错误消息内容体(争取和拦截器中定义的响应体一样)
    }
     // 打印错误综合日志
     Logger.error(
      '错误信息',
      JSON.stringify(msgLog),
      'HttpExceptionFilter',
    );
    response
      .status(status)
      .json(msgLog);
  }
}