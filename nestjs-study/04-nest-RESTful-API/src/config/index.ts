export default () => ({
  /**
   * 数据库连接配置
   */
  db:{
    host: 'localhost', // 数据库ip地址
    port: 3306, // 端口
    name: 'root', // 数据库登录账号
    password: '123456', // 数据库登录密码
    database: 'nest_study' // 数据库名称
  }
});