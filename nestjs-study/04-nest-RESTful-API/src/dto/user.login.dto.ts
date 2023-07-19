import { IsMobilePhone, IsNotIn, MinLength } from 'class-validator';
export class UserLoginDTO{
  id: number

  @IsNotIn(['',undefined,null],{
    message: '账号不能为空'
  })
  name: string;

  @IsNotIn(['',undefined,null],{
    message: '手机号码不能为空'
  })
  @IsMobilePhone()
  phone: string;

  @MinLength(6,{
    message: '密码长度不能小于6位数'
  })
  password: string;
}