import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { bcryptEncryption, decodeJwt } from 'src/utils/tools';
import { Like, Repository } from 'typeorm';
import { User } from '../../entity/user.entity';
import { UserListDTO } from './dto/user.list.dto';
import { UserAddDTO } from './dto/user.add.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private config: ConfigService
  ) {}

  /**
   * 根据手机号获取用户详情
   * @param id 
   * @returns User
   */
  async findDetail(phone): Promise<User>{
    const fUser = await this.userRepository.findOne({
      where: {phone: phone}
    })
    if(!fUser){
      throw new HttpException('用户不存在,请注册!',HttpStatus.INTERNAL_SERVER_ERROR)
    }
    return fUser
  }

  /**
   * 分页列表
   * @param que 
   * @returns 
   */
  async findAll(que: UserListDTO) {
    let { pageSize, pageNum, orderBy, sort, ...params } = que;
    orderBy = que.orderBy || 'create_time';
    sort = que.sort || 'DESC';
    pageSize = Number(que.pageSize || 10);
    pageNum = Number(que.pageNum || 1);

    console.log('params', params)
    const queryParams = {} as any;
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        queryParams[key] = Like(`%${params[key]}%`); // 所有字段支持模糊查询、%%之间不能有空格
      }
    });
    const qb = await this.userRepository.createQueryBuilder('user');
    qb.where(queryParams);
    qb.orderBy(`user.${orderBy}`, sort);
    qb.skip(pageSize * (pageNum - 1));
    qb.take(pageSize);

    return {
      list: await qb.getMany(),
      total: await qb.getCount(), // 总的数量
      pageSize,
      pageNum,
    };
  }

  /**
   * 详情
   * @returns 
   */
  async findOne(authorization) {
    const result:any = decodeJwt(authorization)
    if(result){
      return await this.userRepository.findOne({
        where: { id: result.id }
      })
    }else{
      return false
    }

  }

  /**
   * 新增
   */
  async addUser(userlogindto: UserAddDTO) {
    let user = new User()
    user.name = userlogindto.name
    user.phone = userlogindto.phone
    user.password = bcryptEncryption(userlogindto.password)
    return await this.userRepository.insert(user)
  }

  /**
   * 修改
   * @param userlogindto 
   * @returns 
   */
  async updateUser(userlogindto: User) {
    return await this.userRepository.update({ id: userlogindto.id }, userlogindto)
  }

  /**
   * 删除
   * @param id 
   * @returns 
   */
  async deleteUser(id) {
    return await this.userRepository.delete({ id: id })
  }
}
