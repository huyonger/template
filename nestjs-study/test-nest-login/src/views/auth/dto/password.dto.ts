import { ApiProperty } from "@nestjs/swagger";

export class PasswordCheckDto {
  @ApiProperty({ description: 'id', required: true })
  id: number
  @ApiProperty({ description: '旧密码', required: true })
  oldPassword: string;
  @ApiProperty({ description: '新密码', required: true })
  newPassword: string;
}