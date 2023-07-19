import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { UploadModule } from '../views/upload/upload.module'
import { UserModule } from '../views/user/user.module'

export function initSwagger(app) {
  const options = new DocumentBuilder()
    .setTitle('通用文档')
    .setDescription('通用模块内容')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    include: [UserModule]
  });
  SwaggerModule.setup('api', app, document);
}

export function initSwaggerFileModule(app) {
  const options = new DocumentBuilder()
    .setTitle('文件文档')
    .setDescription('全局文件相关的管理内容')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    include: [UploadModule],
  });
  SwaggerModule.setup('api/file', app, document);
}