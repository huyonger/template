import { Module } from '@nestjs/common';
import { UploadController } from './file.upload.controller';
import { UploadService } from './file.upload.service';

@Module({
  imports: [],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
