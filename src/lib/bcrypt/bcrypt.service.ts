import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class BcryptService {
  hashPassword(password: string) {
    const newPassword = bcrypt.hashSync(password);

    return newPassword;
  }

  comparePasswords(password: string, hashPassword: string) {
    return bcrypt.compareSync(password, hashPassword);
  }
}
