import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Headers,
  Request
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(
    private readonly appService: AppService
  ) { }

  @Get('userlist')
  getUserlist(): string {
    return '无参数请求';
  }

  @Get('userinfo')
  getUserinfo(@Query() query): string {
    let jsQuery = JSON.stringify(query);
    console.log(jsQuery)
    return `获取Query数据,传递过来的Query内容是${jsQuery}`;
  }

  @Post('userinfo')
  createUser(@Body() user): string {
    let jsUser = JSON.stringify(user);
    console.log(jsUser)
    return `获取Body数据,传递过来的Body内容是：${jsUser}`;
  }

  @Get(':param')
  getUserParams(@Param('param') param: string) {
    console.log(param)
    return `获取Param数据，传递过来的动态参数是${param}`;
  }

  @Post('userheader')
  getUserHeader(@Headers() headers): string {
    let jsHeaders = JSON.stringify(headers);
    console.log(jsHeaders)
    return `获取Headers数据(请求头),传递过来的Headers内容是：${jsHeaders}`;
  }

  @Post('userFormData')
  getUserFormData(@Request() req): string {
    req.on('data', result => {
      // 打印出传递过来的数据，但是需要处理，尝试使用multiparty试试
      // 官方文件上传：https://docs.nestjs.cn/7/techniques?id=%e6%96%87%e4%bb%b6%e4%b8%8a%e4%bc%a0
      console.log(result);
    })
    return '';
  }

}
