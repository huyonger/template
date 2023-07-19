import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function initSwagger(app) {
  const options = new DocumentBuilder()
    .setTitle('通用文档')
    .setDescription('所有模块内容')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options, {});
  SwaggerModule.setup('api', app, document);
}

/**
 * 分新页面
 */
// export function initSwaggerFileModule(app) {
//   const options = new DocumentBuilder()
//     .setTitle('文件文档')
//     .setDescription('全局文件相关的管理内容')
//     .setVersion('1.0')
//     .build();
//   const document = SwaggerModule.createDocument(app, options, {
//      include: [FileModule],
//   });
//   SwaggerModule.setup('api/file', app, document);
// }