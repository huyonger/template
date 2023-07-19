/**
 * bcryptjs  加密
 */
const bcryptjs = require('bcryptjs');
/**
 * 加密处理 - 同步方法
 * @returns -> $10$AMIZt3YJXDFDJzNAsIIGXuEl4XptFzP/XRUfa6qKfFhFHB8VIxaNC
 * bcryptjs.hashSync(data, salt)
 *    - password  要加密的数据
 *    - slat  用于哈希密码的盐。如果指定为数字，则将使用指定的轮数生成盐并将其使用。推荐 10
 */

export function bcryptEncryption (password: string,slat:number = 10):string{
  return bcryptjs.hashSync(password, slat)
} 
/**
 * 校验 - 同步方法
 * @returns -> Bool
 * bcryptjs.compareSync(data, encrypted)
 *    - password    要比较的数据, 使用登录时传递过来的密码
 *    - encrypted   要比较的数据, 使用从数据库中查询出来的加密过的密码
 */
export function bcryptCompare(password: string, encrypted: string):boolean{
  return bcryptjs.compareSync(password,encrypted)
}

/**
 * 解析jwt中包含的内容
 */
import jwtDecode from 'jwt-decode'

export function decodeJwt(token){
  return jwtDecode(token)
}