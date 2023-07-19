import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ description: '昵称', required: true })
  name: string;
  @ApiProperty({ description: '手机号', required: true })
  phone: string;
  @ApiProperty({ description: '验证码', required: true })
  code: string;
  @ApiProperty({ description: '密码', required: true })
  password: string
}
