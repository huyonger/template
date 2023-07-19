import { ApiProperty } from '@nestjs/swagger'
export class LoginDto {
  @ApiProperty({ description: '手机号', required: true })
  phone: string;
  @ApiProperty({ description: '密码', required: true })
  password: string
}