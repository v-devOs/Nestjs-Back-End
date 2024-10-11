import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  singIn(@Body() createAuthDto: AuthDto) {
    return this.authService.signIn(createAuthDto);
  }
}
