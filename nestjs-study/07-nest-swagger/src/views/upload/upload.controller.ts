import { Body, Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { ApiTags, ApiConsumes, ApiQuery, ApiBody, ApiParam, ApiOkResponse } from '@nestjs/swagger'
import { FileDTO } from './dto/file.dto'

@Controller('upload')
@ApiTags('文件管理')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  /**
   * 单文件上传
   * @returns 
   */
  @Post('file')
  @UseInterceptors(FileInterceptor("file"))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '文件类型',
    type: FileDTO
  })
  uploadFile(@UploadedFile() file, @Body() body) {
    return this.uploadService.uploadFile(file, body)
  }

}
