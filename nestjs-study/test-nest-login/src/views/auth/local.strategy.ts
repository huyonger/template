import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
 
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService
  ) {
    super({
      usernameField: 'phone',
      passwordField: 'password',
    } as IStrategyOptions);
  }
 
  async validate(phone: string, password: string){
    return await this.authService.validateUser(phone, password);
  }
}