import { ApiProperty } from "@nestjs/swagger";

export enum MessageType {
  register = 'register' // 注册
}

export class MessageDto {
  @ApiProperty({ description: '手机号', required: true })
  phone: string;
  @ApiProperty({ description: '验证码类型',enum: MessageType, required: true })
  messageType: string;
}
