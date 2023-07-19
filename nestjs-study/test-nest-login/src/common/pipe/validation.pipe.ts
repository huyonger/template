/* 
 * 全局dto验证管道
 * class-validator的配合类
*/

import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, Type } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform<any>{
  // value 是当前处理的参数，而 metatype 是属性的元类型
  async transform(value: any, metadata: ArgumentMetadata) {
    console.log('进入全局管道...');
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    // plainToClass方法将普通的javascript对象转换为特定类的实例
    const object = plainToClass(metatype, value);
    // 验证该对象返回出错的数组
    const errors = await validate(object);
    if (errors.length > 0) {
      // 将错误信息数组中的第一个内容返回给异常过滤器抛出
      throw new BadRequestException(JSON.stringify(errors[0].constraints));
    }
    return value;
  }
  // 验证属性值的元类型是否是String, Boolean, Number, Array, Object中的一种
  private toValidate(metatype: Type<any>): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }

}