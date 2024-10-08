import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EmployeeModule } from 'src/manager/employee/employee.module';
import { BcryptService } from 'src/lib/bcrypt/bcrypt.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => EmployeeModule)],
  controllers: [UserController],
  providers: [UserService, BcryptService],
  exports: [UserService],
})
export class UserModule {}
