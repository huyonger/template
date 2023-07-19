/* 
 * 全局响应拦截器，统一返回体内容
 *
*/

import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
// 返回体结构
interface Response<T> {
  data: T;
}
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    // 解析ExecutionContext的数据内容获取到请求体
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    // 实现数据的遍历与转变
    return next.handle().pipe(
      map(data => {
        return {
          code: 200,
          path: request.url,
          message: '请求成功',
          data:data
        };
      }),
    );
  }
}