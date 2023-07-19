import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'id',
    required: false
  })
  id: number;

  @Column({ type: 'varchar', name: 'name' })
  @ApiProperty({
    description: '用户昵称',
    required: false
  })
  name: string;

  @Column({ type: 'varchar', name: 'phone' })
  @ApiProperty({
    description: '用户手机',
    required: false
  })
  phone: string;

  @Exclude()
  @Column({ type: 'varchar', name: 'password', select: false })
  password: string;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP'
  })
  @ApiProperty({
    description: '用户创建时间',
    required: false
  })
  createTime: Date;

  @Column({
    name: 'update_time',
    type: 'timestamp',
    nullable: false,
    default: () => 'NOW()'
  })
  @ApiProperty({
    description: '用户修改时间',
    required: false
  })
  updateTime: Date;

}