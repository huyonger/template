import { User } from './../../entity/user.entity';
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Query,
  Put,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginDTO } from './dto/user.add.dto';
import { UserListDTO } from 'src/views/user/dto/user.list.dto';
import { ApiTags, ApiOperation, ApiQuery, ApiBody, ApiParam, ApiOkResponse } from '@nestjs/swagger'

@ApiTags('用户管理')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  /**
   * 分页列表
   * @param que 
   * @returns 
   */
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('list')
  @ApiOperation({
    summary: '用户分页列表'
  })
  @ApiOkResponse({
    description: '用户列表',
    type: [User]
  })
  findAll(@Query() que: UserListDTO) {
    return this.userService.findAll(que)
  }

  /**
   * 详情
   */
  @ApiOperation({
    summary: '用户详情'
  })
  @ApiQuery({ name: 'id', type: Number, description: '用户ID', required: true })
  @ApiOkResponse({
    description: '响应结果',
    type: UserLoginDTO
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get("detail")
  finOne(@Query() que): Promise<User> {
    return this.userService.findOne(que.id)
  }

  /**
   * 新增
   * @param userdto 
   * @returns 
   */
  @Post('add')
  @ApiOperation({
    summary: '用户新增'
  })
  addUser(@Body() userdto: UserLoginDTO) {
    return this.userService.addUser(userdto)
  }

  /**
   * 修改
   * @param user 
   * @returns 
   */
  @Put('update')
  @ApiOperation({
    summary: '用户修改'
  })
  @ApiBody({ type: User })
  updateUser(@Body() user: User) {
    return this.userService.updateUser(user)
  }

  /**
   * 删除
   * @param que 
   * @returns 
   */
  @Delete('delete/:id')
  @ApiOperation({
    summary: '用户删除'
  })
  @ApiParam({ name: 'id', type: Number, description: '用户ID', required: true })
  delUser(@Param('id') id: number) {
    console.log('id', id)
    return this.userService.deleteUser(id)
  }


}
