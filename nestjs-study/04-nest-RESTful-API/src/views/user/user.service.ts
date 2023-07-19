import { UserListDTO } from './../../dto/user.list.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLoginDTO } from 'src/dto/user.login.dto';
import { User } from 'src/entity/user.entity';
import { bcryptEncryption } from 'src/utils/tools';
import { Like, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ){
  }

  /**
   * 分页列表
   * @param que 
   * @returns 
   */
  async findAll(que: UserListDTO){
    let { pageSize, pageNum, orderBy, sort, ...params } = que;
    orderBy = que.orderBy || 'create_time';
    sort = que.sort || 'DESC';
    pageSize = Number(que.pageSize || 10);
    pageNum = Number(que.pageNum || 1);

    console.log('params',params)
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
   * @param id 
   * @returns 
   */
  async findOne(id){
    return await this.userRepository.findOne({
      where: { id: id}
    })
  }

  /**
   * 新增
   */
  async addUser(userlogindto: UserLoginDTO){
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
  async updateUser(userlogindto: User){
    userlogindto.password = bcryptEncryption(userlogindto.password)
    return await this.userRepository.update({ id:userlogindto.id },userlogindto)
  }

  /**
   * 删除
   * @param id 
   * @returns 
   */
  async deleteUser(id){
    return await this.userRepository.delete({id:id})
  }


}
