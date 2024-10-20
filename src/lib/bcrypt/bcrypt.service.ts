import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class BcryptService {
  hashPassword(password: string) {
    const newPassword = bcrypt.hashSync(password);

    return newPassword;
  }

  async comparePasswords(password: string, hashPassword: string) {
    return await bcrypt.compare(password, hashPassword);
  }
}
