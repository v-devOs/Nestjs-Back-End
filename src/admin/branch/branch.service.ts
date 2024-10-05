import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBranchDto, UpdateBranchDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from './entities/branch.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>,
  ) {}

  async create(createBranchDto: CreateBranchDto) {
    const newBranch = await this.branchRepository.save(createBranchDto);
    return plainToClass(CreateBranchDto, newBranch);
  }

  async findAll() {
    const branches = await this.branchRepository.find({
      // relations: ['direction', 'contact'],
    });
    return branches;
  }

  async findOne(id: number) {
    const branch = await this.branchRepository.findOne({
      where: { id_branch: id },
    });

    if (!branch) {
      throw new BadRequestException(
        `Branch not found in database with id:${id}`,
      );
    }

    return plainToClass(CreateBranchDto, branch);
  }

  async update(id: number, updateBranchDto: UpdateBranchDto) {
    const branch = await this.findOne(id);
    const updatedBranch = await this.branchRepository.save({
      ...branch,
      ...updateBranchDto,
    });
    return plainToClass(UpdateBranchDto, updatedBranch);
  }

  async remove(id: number) {
    const branch = await this.findOne(id);

    if (!branch) {
      throw new BadRequestException(
        `Branch not found in database with id:${id}`,
      );
    }

    await this.branchRepository.delete(id);
    return { message: 'Branch deleted successfully' };
  }
}
