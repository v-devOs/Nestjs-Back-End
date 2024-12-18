import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeService } from 'src/manager/employee/employee.service';
import { BcryptService } from 'src/lib/bcrypt/bcrypt.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => EmployeeService))
    private readonly employeeService: EmployeeService,
    @Inject(forwardRef(() => BcryptService))
    private readonly bcryptService: BcryptService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const employee = await this.employeeService.findOne(
      createUserDto.id_employee,
    );

    const password = await this.bcryptService.hashPassword(
      createUserDto.password,
    );
    const newUser = await this.userRepository.save({
      ...createUserDto,
      employee,
      password,
    });

    delete newUser.password;
    return newUser;
  }
  async findAll() {
    const users = await this.userRepository.find({
      relations: ['employee'],
      where: { active: true },
    });

    return users.map((user) => {
      const newUser = {
        ...user,
        id_employee: user.employee.id_employee,
      };

      delete newUser.employee;
      delete newUser.password;

      return newUser;
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      relations: ['employee'],
      where: { id_user: id, active: true },
    });

    if (!user) {
      throw new NotFoundException('User not found with id: ' + id);
    }

    delete user.password;

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (updateUserDto.id_employee) {
      const employee = await this.employeeService.findOne(
        updateUserDto.id_employee,
      );

      user.employee = employee;
    }

    if (updateUserDto.password) {
      const newPassword = await this.bcryptService.hashPassword(
        updateUserDto.password,
      );
      user.password = newPassword;
    }

    const updatedUser = await this.userRepository.save({
      ...user,
      ...updateUserDto,
    });

    delete updatedUser.password;

    return updatedUser;
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    user.active = false;

    await this.userRepository.save(user);

    return 'User deleted successfully';
  }
}
