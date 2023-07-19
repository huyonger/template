import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'varchar', name: 'name'})
  name: string;
  
  @Column({type:'varchar', name: 'phone'})
  phone: string;

  @Exclude()
  @Column({type:'varchar', name: 'password', select: false})
  password: string;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP'
  })
  createTime: Date;
  
}