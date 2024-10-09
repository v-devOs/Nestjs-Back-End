import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class BcryptService {
  hashPassword(password: string) {
    const newPassword = bcrypt.hashSync(password);

    return newPassword;
  }

  comparePasswords(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
  }
}
