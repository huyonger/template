import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { join } from 'path';

@Injectable()
export class UploadService {
  constructor() { }

  /**
   * 单文件上传方式(通常情况下上传的文件都会使用云文件服务器，因此这里需要做上传云的各种封装)
   */
  async uploadFile(file, body) {
    console.log('file', file)
    console.log('body', body)
    // 相关操作
    this.uploadToLocal(file)
    return {
      url: '',
      message: '上传成功'
    }
  }

  /**
   * 上传文件保存在本地
   */
  private uploadToLocal(file) {
    console.log('__dirname: ', __dirname);
    var writeStream = createWriteStream(join(__dirname, '../../public', `${Date.now()}-${file.originalname}`))
    writeStream.write(file.buffer);
  }

  /**
   * 上传至文件服务器的方法，如腾讯云文件服务器
   */
  private async uploadToTencentYun() {

  }


}
