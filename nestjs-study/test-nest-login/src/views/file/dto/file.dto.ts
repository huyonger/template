
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'
export class FileDTO {
  @ApiProperty({ description: '文件名称', example: '测试文件名称', required: false })
  @IsString()
  name: string

  @ApiProperty({ type: 'string', format: 'binary' })
  file: any
}