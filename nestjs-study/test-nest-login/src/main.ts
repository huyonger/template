import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter'
import { initSwagger } from './libs/swagger/swagger.config'
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局注册通用验证管道ValidationPipe
  app.useGlobalPipes(new ValidationPipe());

  // 注册全局通用响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());

  // 注册全局通用异常过滤器HttpExceptionFilter
  app.useGlobalFilters(new HttpExceptionFilter());

  if (process.env.NODE_ENV !== 'prod') {
    initSwagger(app)
  }

  await app.listen(3000);
}
bootstrap();
