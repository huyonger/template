export default () => ({
  /**
   * 数据库连接配置
   */
  db:{
    type: 'mysql',
    name: 'default',
    host: 'localhost', // 数据库ip地址
    port: 3306, // 端口
    username: 'root',
    password: '123456', // 数据库登录密码
    database: 'nest_study', // 数据库名称
    entities: [__dirname + '/**/*.entity.ts'],
    autoLoadEntities: true,
    synchronize: false,
    timezone: '+08:00', // 东八区
  },

  /**
   * redis配置单库
   */
  redisConfig: {
    port: 6379,
    host: '127.0.0.1',
    password: '123456',
    db: 0
  },
  /**
   * redis配置集群
   */
  redisClusterConfig: [
    {
      port: 6379,
      host: '127.0.0.1',
      password: '123456',
      db: 1
    },
    {
      port: 6379,
      host: '127.0.0.1',
      password: '123456',
      db: 2
    }
  ],

  /**
   * Jwt生成密钥
   */
  jwtSecret: 'hardtoguesssecretqwesdasd',
  /**
   * Jwt过期时间
   */
  jwtExpiresIn: '7d',

  /**
   * 阿里云短信配置 下面的数据可在相关云服务上面获得
   */
  aliKey: {
    AccessKeyID: '',
    AccessKeySecret: '',
    SignName: '', // 短信签名名称
    TemplateCode: '', // 短信模版CODE
  },

  /**
   * 小程序appid和密钥
   */
  wxAPPID: '',
  wxAPPSecret: ''
});