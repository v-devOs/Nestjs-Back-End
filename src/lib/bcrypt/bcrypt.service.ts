import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class BcryptService {
  async hashPassword(password: string) {
    const newPassword = await bcrypt.hash(password, 2);

    return newPassword;
  }

  async comparePasswords(password: string, hashPassword: string) {
    return await bcrypt.compare(password, hashPassword);
  }
}
