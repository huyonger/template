import { User } from './../../entity/user.entity';
import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  Put,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginDTO } from '../../dto/user.login.dto';
import { UserListDTO } from 'src/dto/user.list.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 分页列表
   * @param que 
   * @returns 
   */
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('list')
  findAll(@Query() que: UserListDTO) {
    return this.userService.findAll(que)
  }

  /**
   * 详情
   */
  @UseInterceptors(ClassSerializerInterceptor)
  @Get("detail")
  finOne(@Query() que):Promise<User>{
    return this.userService.findOne(que.id)
  }

  /**
   * 新增
   * @param userdto 
   * @returns 
   */
  @Post('add')
  addUser(@Body() userdto: UserLoginDTO){
    return this.userService.addUser(userdto)
  }

  /**
   * 修改
   * @param user 
   * @returns 
   */
  @Put('update')
  updateUser(@Body() user: User){
    return this.userService.updateUser(user)
  }

  /**
   * 删除
   * @param que 
   * @returns 
   */
  @Delete('delete')
  delUser(@Query() que){
    return this.userService.deleteUser(que.id)
  }


}
