import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Req, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../entity/user.entity';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserListDTO } from './dto/user.list.dto';
import { UserAddDTO } from './dto/user.add.dto';

@ApiTags('用户管理')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * 根据手机号获取用户详情
   * @param id 
   * @returns User
   */
  @ApiOperation({
    summary: '根据手机号获取用户详情'
  })
  @ApiOkResponse({
    description: '响应结果',
    type: User
  })
  @ApiQuery({ name: 'phone', description: '手机号', required: true })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('detailByPhone')
  detail(@Query() que): Promise<User> {
    return this.userService.findDetail(que.phone);
  }

  /**
   * 分页列表
   * @param que 
   * @returns 
   */
  @ApiOperation({
    summary: '用户分页列表'
  })
  @ApiOkResponse({
    description: '用户列表',
    type: [User]
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('list')
  findAll(@Query() que: UserListDTO) {
    return this.userService.findAll(que)
  }
  /**
   * 根据id获取详情
   */
  @ApiOperation({
    summary: '获取用户详情'
  })
  @ApiOkResponse({
    description: '响应结果',
    type: User
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get("detail")
  finOne(@Req() req){
    return this.userService.findOne(req.headers.authorization)
  }

  /**
   * 新增
   * @param userdto 
   * @returns 
   */
  @ApiOperation({
    summary: '用户新增'
  })
  @Post('add')
  addUser(@Body() userdto: UserAddDTO) {
    return this.userService.addUser(userdto)
  }

  /**
   * 修改
   * @param user 
   * @returns 
   */
  @ApiOperation({
    summary: '用户信息修改'
  })
  @ApiBody({ type: User })
  @Put('update')
  updateUser(@Body() user: User) {
    return this.userService.updateUser(user)
  }

  /**
   * 删除
   * @param que 
   * @returns 
   */
  @ApiOperation({
    summary: '用户删除'
  })
  @ApiParam({ name: 'id', type: Number, description: '用户ID', required: true })
  @Delete('delete/:id')
  delUser(@Param('id') id: number) {
    console.log('id', id)
    return this.userService.deleteUser(id)
  }
}
