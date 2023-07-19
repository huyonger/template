import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ValidationPipe } from './common/pipe/validation.pipe';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { XMLMiddleware } from './common/middleware/xml.middleware';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局注册通用验证管道ValidationPipe
  app.useGlobalPipes(new ValidationPipe());

  // 全局注册通用异常过滤器HttpExceptionFilter
  app.useGlobalFilters(new HttpExceptionFilter());

  // 全局注册xml支持中间件(这里必须调用.use才能够注册)
  app.use(new XMLMiddleware().use);

  // 全局注册响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(3000);
}
bootstrap();
