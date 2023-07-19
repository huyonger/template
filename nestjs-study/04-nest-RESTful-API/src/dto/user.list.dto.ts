import { IsNotIn } from 'class-validator';

export class UserListDTO{

  pageNum: number

  pageSize: number

  name: string

  phone: string

  orderBy: string

  sort: any
}