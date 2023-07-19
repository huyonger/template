import { Body, Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  /**
   * 单文件上传
   * @returns 
   */
  @Post('file')
  @UseInterceptors(FileInterceptor("file"))
  uploadFile(@UploadedFile() file, @Body() body) {
    return this.uploadService.uploadFile(file,body)
  }

  /**
   * 多文件上传
   * 多文件和单文件差不太多无非就是获取的files是一个file的数组
   * @returns 
   */
  @Post('files')
  @UseInterceptors(FileInterceptor("files"))
  uploadFiles(@UploadedFiles() files, @Body() body) {
    return this.uploadService.uploadFiles(files,body)
  }

}
