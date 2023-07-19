import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { RedisConfigModule } from 'src/libs/redis/redis.config.module';
import { MessageCodeService } from 'src/libs/message/message.code.service';

@Module({
  imports: [
    RedisConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwtSecret'),
        signOptions: { 
          expiresIn: configService.get<string>('jwtExpiresIn')
        }
      })
    })
  ],
  providers: [
    LocalStrategy,
    JwtStrategy,
    AuthService,
    MessageCodeService
  ],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
