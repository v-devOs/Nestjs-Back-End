import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/user/entities/user.entity';
import { Repository } from 'typeorm';
import { BcryptService } from 'src/lib/bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => BcryptService))
    private readonly bcryptService: BcryptService,
    @Inject(forwardRef(() => JwtService))
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async signIn(authDto: AuthDto) {
    const user = await this.userRepository.findOne({
      relations: ['employee'],
      where: {
        active: true,
        email: authDto.email,
      },
    });

    console.log({ user });

    if (!user) {
      throw new BadRequestException(`Error on search user, check credentials`);
    }

    const isValidPassword = this.bcryptService.comparePasswords(
      authDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException(
        `Error on credentials user, check credentials`,
      );
    }

    delete user.password;
    delete user.active;

    return {
      user: user,
      access_token: this.jwtService.sign(
        {
          sub: user.id_user,
          username: user.employee,
        },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
        },
      ),
    };
  }
}
