import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateStorageDto, UpdateStorageDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BranchService } from 'src/admin/branch/branch.service';
import { plainToClass } from 'class-transformer';
import { Storage } from './entities/storage.entity';

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(Storage)
    private readonly storageRepository: Repository<Storage>,
    @Inject(forwardRef(() => BranchService))
    private readonly branchService: BranchService,
  ) {}

  async create(createStorageDto: CreateStorageDto) {
    const branch = await this.branchService.findOne(createStorageDto.id_branch);

    const storage = await this.storageRepository.save({
      branch,
    });

    return plainToClass(CreateStorageDto, storage);
  }

  async findAll() {
    const storages = await this.storageRepository.find({
      relations: {
        branch: true,
      },
    });

    return storages
      .map((storage) => {
        const newStorage = {
          ...storage,
          id_branch: storage.branch.id_branch,
        };

        delete newStorage.branch;

        return newStorage;
      })
      .filter((storage) => storage.active);
  }

  async findOne(id: number) {
    const storage = await this.storageRepository.findOne({
      where: { id_storage: id, active: true },
      relations: {
        branch: true,
      },
    });

    if (!storage) {
      throw new BadRequestException(
        `Storage not found in database with id:${id}`,
      );
    }

    return storage;
  }

  async update(id: number, updateStorageDto: UpdateStorageDto) {
    const storage = await this.findOne(id);

    if (updateStorageDto.id_branch) {
      const branch = await this.branchService.findOne(
        updateStorageDto.id_branch,
      );

      storage.branch = branch;

      await this.storageRepository.save(storage);
    }

    return storage;
  }

  async remove(id: number) {
    const storage = await this.findOne(id);

    if (!storage || !storage.active) {
      throw new BadRequestException(
        `Storage not found in database with id:${id}`,
      );
    }

    await this.storageRepository.save({
      ...storage,
      active: false,
    });

    return { message: 'Storage deleted successfully' };
  }
}
