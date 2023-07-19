import { IsMobilePhone, IsNotIn, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'
export class UserLoginDTO {
  id: number

  @IsNotIn(['', undefined, null], {
    message: '账号不能为空'
  })
  @ApiProperty({
    description: '用户名',
    required: true
  })
  name: string;

  @IsNotIn(['', undefined, null], {
    message: '手机号码不能为空'
  })
  @IsMobilePhone()
  @ApiProperty({
    description: '手机号',
    required: true
  })
  phone: string;

  @MinLength(6, {
    message: '密码长度不能小于6位数'
  })
  @ApiProperty({
    description: '密码',
    required: true
  })
  password: string;
}