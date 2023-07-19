import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './common/pipe/validation.pipe';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import { initSwagger, initSwaggerFileModule } from './swagger/swagger.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局注册通用验证管道ValidationPipe
  app.useGlobalPipes(new ValidationPipe());

  // 全局注册通用异常过滤器HttpExceptionFilter
  app.useGlobalFilters(new HttpExceptionFilter());

  // 全局注册响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());

  if (process.env.NODE_ENV !== 'prod') {
    initSwagger(app)
    initSwaggerFileModule(app)
  }
  await app.listen(3000);
}
bootstrap();
