import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RedisConfigService } from "../redis/redis.config.service";
const SMSClient = require('@alicloud/sms-sdk');

@Injectable()
export class MessageCodeService{
  private smsClient;
  constructor(
    private config: ConfigService,
    private redis: RedisConfigService
  ) {
    this.initSmsClient()
  }

  // 初始化服务---阿里云
  private initSmsClient(){
    this.smsClient = new SMSClient({
      accessKeyId: this.config.get('aliKey.AccessKeyID'),
      secretAccessKey: this.config.get('aliKey.AccessKeySecret')
    })
  }

  /**
   * 发送注册短信
   */
  async createMessage(type = 'default',phoneNum) {
    let str = this.createCode()
    let result = await this.smsClient.sendSMS({
      PhoneNumbers: phoneNum,
      SignName: this.config.get('aliKey.SignName'), //签名名称 前面提到要准备的
      TemplateCode: this.config.get('aliKey.TemplateCode'), //模版CODE  前面提到要准备的
      TemplateParam: `{"code":'${str}'}`, // 短信模板变量对应的实际值，JSON格式
    })
    if(result.Code == 'OK'){
      this.redis.setRedis(type + phoneNum,str,300)
      return result.Code
    }else{
      return '发送失败'
    }
  }


  // 产生6位随机数(用来生成短信验证码的)
  private createCode() {
    let str = "";
    for (let i = 0; i < 6; i++) {
      str += parseInt((Math.random() * 10).toString())
    }
    return str;
  }
}