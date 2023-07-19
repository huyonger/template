import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { bcryptCompare, bcryptEncryption } from 'src/utils/tools';
import { RedisConfigService } from 'src/libs/redis/redis.config.service';
import { CreateUserDto } from './dto/register.dto';
import { MessageCodeService } from 'src/libs/message/message.code.service';
import { MessageType } from './dto/message.dto';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private mjwtService:JwtService,
    private redis: RedisConfigService,
    private messagecode: MessageCodeService
  ) {}

  /**
   * 登录操作
   * @param phone 账号
   * @param pass 密码
   * @returns jwt access_token
   */
  async signIn(phone, pass) {
    let user = await this.validateUser(phone,pass)
    const tokens = await this.validateRedis(user)
    return tokens
  }

  /**
   * 注册用户，前端验证手机号是否存在
   * @param user 
   * @returns 
   */
  async registerUser(user: CreateUserDto){
    let muser = new User()
    muser.name = user.name
    muser.password = bcryptEncryption(user.password)
    muser.phone = user.phone
    const code = await this.redis.getRedis(MessageType.register + user.phone)
    if(code !== user.code){
      throw new HttpException('验证码不正确',HttpStatus.INTERNAL_SERVER_ERROR)
    }
    return await this.userRepository.insert(muser)
  }

  /**
    * 检查手机号是否注册
    */
  async checkUser(phone){
    const fUser = await this.userRepository.findOne({
      where: {phone: phone}
    })
    if(fUser){
      throw new HttpException('用户已存在',HttpStatus.INTERNAL_SERVER_ERROR)
    }
    return true
  }

  /**
   * 修改密码
   * @param body 
   */
  async updatePassword(body){
    const { id,newPassword,oldPassword} = body
    const user = await this.userRepository
    .createQueryBuilder('user')
    .where('user.id=:id', { id })
    .getOne()
    if (!bcryptCompare(oldPassword, user.password)) {
      throw new HttpException('旧密码错误！',HttpStatus.INTERNAL_SERVER_ERROR)
    }
    const newPass = bcryptEncryption(newPassword)
    return await this.userRepository.update({ id: id }, {password: newPass})
  }

  /**
   * 发送手机短信
   */
  messageCode(que){
    console.log('que',que)
    console.log('MessageType',MessageType)
    if (que.messageType == MessageType.register){
      return this.messagecode.createMessage(MessageType.register,que.phone)
    }
  }

  /**
   * 退出操作
   * @param id 用户id
   * @returns 
   */
  async logout(id){
    return await this.redis.delRedis('user' + id)
  }

  /**
   * 使用redis来避免重复登录重复生成token的操作
   * @param user 用户信息
   */
  async validateRedis(user){
    let hasToken = await this.redis.getRedis(user.id)
    if(!hasToken){
      const param = {
        id: user.id,
        name: user.name,
        phone: user.phone
      }
      const token =  this.mjwtService.sign(param)
      // 保存7天时间缩短5分钟间隙，因为token过期也是设置的7天
      const expiresIn = 604800 - 300
      this.redis.setRedis('user'+ user.id,token,expiresIn)
      return token
    }
    return hasToken
  }

  /**
   * 校验用户手机账号密码
   */
  async validateUser(phone: string, password: string){
    const user = await this.userRepository
    .createQueryBuilder('user')
    .where('user.phone=:phone', { phone })
    .getOne()
    if (!user) {
      throw new HttpException('用户名不正确！',HttpStatus.INTERNAL_SERVER_ERROR)
    }
    if (!bcryptCompare(password, user.password)) {
      throw new HttpException('密码错误！',HttpStatus.INTERNAL_SERVER_ERROR)
    }
    return user
  }
}
