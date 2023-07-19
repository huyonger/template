import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/views/auth/dto/login.dto';
import { LocalAuthGuard } from 'src/common/guard/local.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/register.dto';
import { PasswordCheckDto } from './dto/password.dto';
import { MessageDto } from './dto/message.dto';

@ApiTags('登录管理')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiOperation({
    summary: '手机号密码登录'
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto.phone, signInDto.password);
  }

  /**
   * 注册用户
   * @param user 
   * @returns 
   */
  @ApiOperation({
    summary: '注册用户'
  })
  @Public()
  @Post('register')
  register(@Body() user:CreateUserDto){
    return this.authService.registerUser(user)
  }
  /**
   * 修改密码
   * @param user 
   * @returns 
   */
  @ApiOperation({
    summary: '修改密码'
  })
  @Post('changePassword')
  updatePassword(@Body() body: PasswordCheckDto){
    return this.authService.updatePassword(body)
  }

  /**
   * 检测手机号是否已经注册
   */
  @ApiOperation({
    summary: '检测手机号是否已经注册'
  })
  @ApiQuery({ name: 'phone', description: '手机号', required: true })
  @Public()
  @Get('isRegister')
  isRegister(@Query() que): Promise<Boolean>{
    return this.authService.checkUser(que.phone)
  }

  /**
   * 发送手机短信
   */
  @ApiOperation({
    summary: '发送手机短信'
  })
  @ApiQuery({ 
    name: 'phone', 
    description: '手机号', 
    required: true,
    type: MessageDto
  })
  @Public()
  @Get('code')
  getCode(@Query() que){
    return this.authService.messageCode(que)
  }

  /**
   * 退出登录
   * @param que id
   * @returns 
   */
  @ApiOperation({
    summary: '退出登录'
  })
  @ApiQuery({ name: 'id', type: Number, description: '用户ID', required: true })
  @Get('logout')
  logout(@Query() que) {
    return this.authService.logout(que.id);
  }

  @Public()
  @ApiOperation({
    summary: '微信小程序登录'
  })
  @Post('wechatLogin')
  signInWechat(){
    return '开发中...'
  }

  @Public()
  @ApiOperation({
    summary: '微信公众号登录'
  })
  @Post('wechatPublicLogin')
  signInWechatPublic(){
    return '开发中...'
  }
}
