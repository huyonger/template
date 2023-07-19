
import { ApiProperty } from '@nestjs/swagger'
export class UserListDTO {

  @ApiProperty({
    description: '当前页',
    required: true
  })
  pageNum: number

  @ApiProperty({
    description: '当前条数',
    required: true
  })
  pageSize: number

  @ApiProperty({
    description: '用户昵称',
    required: false
  })
  name: string

  @ApiProperty({
    description: '用户手机',
    required: false
  })
  phone: string

  @ApiProperty({
    description: '字段',
    required: false
  })
  orderBy: string

  @ApiProperty({
    description: '排序方式',
    enum: ['DEAS', 'AES'],
    required: false
  })
  sort: any
}