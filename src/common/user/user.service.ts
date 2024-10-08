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
import bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => EmployeeService))
    private readonly employeeService: EmployeeService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const employee = await this.employeeService.findOne(
      createUserDto.id_employee,
    );

    const password = await bcrypt.hashSync(createUserDto.password);
    const newUser = await this.userRepository.save({
      ...createUserDto,
      employee,
      password,
    });

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

    delete user.employee;
    delete user.password;

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
