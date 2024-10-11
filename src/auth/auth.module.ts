import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/common/user/entities/user.entity';
import { BcryptService } from '../lib/bcrypt/bcrypt.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { config } from 'dotenv';

config();

@Module({
  imports: [
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '30d' },
      secret: process.env.JWT_SCRET || 'mysecretfixed',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptService, JwtService],
})
export class AuthModule {}
