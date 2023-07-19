import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({
    description: 'id',
    required: false
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '昵称',
    required: false
  })
  @Column({type:'varchar', name: 'name'})
  name: string;
  
  @ApiProperty({
    description: '手机号',
    required: false
  })
  @Column({type:'varchar', name: 'phone'})
  phone: string;

  @Exclude()
  @Column({type:'varchar', name: 'password'})
  password: string;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    name: 'update_time',
    type: 'timestamp',
    nullable: false,
    default: () => 'NOW()'
  })
  updateTime: Date;
  
}