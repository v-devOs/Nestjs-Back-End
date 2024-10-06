import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { BranchService } from 'src/admin/branch/branch.service';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @Inject(forwardRef(() => BranchService))
    private readonly branchService: BranchService,
    @Inject(forwardRef(() => StorageService))
    private readonly storageService: StorageService,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const branch = await this.branchService.findOne(
      createEmployeeDto.id_branch,
    );
    const storage = await this.storageService.findOne(
      createEmployeeDto.id_storage,
    );

    const noEmployee = `${branch.id_branch}${new Date().getFullYear()}${createEmployeeDto.name.charAt(0)}${createEmployeeDto.surname.charAt(0)}`;

    const employee = {
      ...createEmployeeDto,
      branch,
      storage,
      no_employee: noEmployee,
    };

    return this.employeeRepository.save(employee);
  }

  async findAll() {
    const employees = await this.employeeRepository.find({
      relations: ['branch', 'storage'],
    });

    return employees
      .map((employee) => {
        const newEmployee = {
          ...employee,
          id_branch: employee.branch.id_branch,
          id_storage: employee.storage.id_storage,
        };

        delete newEmployee.branch;
        delete newEmployee.storage;

        return newEmployee;
      })
      .filter((employee) => employee.active);
  }

  async findOne(id: number) {
    const employee = await this.employeeRepository.findOne({
      where: { id_employee: id },
      relations: ['branch', 'storage'],
    });

    if (!employee) {
      throw new BadRequestException(`Employee not found with id:${id}`);
    }

    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.findOne(id);

    if (!employee || !updateEmployeeDto) {
      throw new BadRequestException(`Employee not found with id:${id}`);
    }

    if (updateEmployeeDto.id_branch) {
      const branch = await this.branchService.findOne(
        updateEmployeeDto.id_branch,
      );

      employee.branch = branch;
    }

    if (updateEmployeeDto.id_storage) {
      const storage = await this.storageService.findOne(
        updateEmployeeDto.id_storage,
      );

      employee.storage = storage;
    }

    return this.employeeRepository.save(employee);
  }

  async remove(id: number) {
    const employee = await this.findOne(id);

    if (!employee || !employee.active) {
      throw new BadRequestException(`Employee not found with id:${id}`);
    }

    await this.employeeRepository.save({
      ...employee,
      active: false,
    });

    return {
      message: `Employee with id:${id} has been deleted`,
    };
  }
}
