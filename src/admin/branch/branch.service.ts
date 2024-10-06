import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateBranchDto, UpdateBranchDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from './entities/branch.entity';
import { plainToClass } from 'class-transformer';
import { DirectionService } from '../direction/direction.service';
import { ContactService } from '../contact/contact.service';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>,
    @Inject(forwardRef(() => DirectionService))
    private readonly directionService: DirectionService,
    @Inject(forwardRef(() => ContactService))
    private readonly contactService: ContactService,
  ) {}

  async create(createBranchDto: CreateBranchDto) {
    // const newBranch = await this.branchRepository.save(createBranchDto);
    const direction = await this.directionService.findOne(
      createBranchDto.id_direction,
    );
    const contact = await this.contactService.findOne(
      createBranchDto.id_contact,
    );

    const newBranch = await this.branchRepository.save({
      ...createBranchDto,
      direction,
      contact,
    });

    return newBranch;
  }

  async findAll() {
    const branches = await this.branchRepository.find();

    return branches.map((branch) => {
      const newBranch = {
        ...branch,
        id_direction: branch.direction.id_direction,
        id_contact: branch.contact.id_contact,
      };

      delete newBranch.direction;
      delete newBranch.contact;
      return newBranch;
    });
  }

  async findOne(id: number) {
    const branch = await this.branchRepository.findOne({
      where: { id_branch: id },
    });

    if (!branch || !branch.active) {
      throw new BadRequestException(
        `Branch not found in database with id:${id}`,
      );
    }

    return branch;
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

    await this.branchRepository.save({
      ...branch,
      active: false,
    });

    return { message: 'Branch deleted successfully' };
  }
}
