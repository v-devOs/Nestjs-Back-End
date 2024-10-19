import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDirectionDto, UpdateDirectionDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Direction } from './entities/direction.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';

@Injectable()
export class DirectionService {
  constructor(
    @InjectRepository(Direction)
    private readonly directionRepository: Repository<Direction>,
  ) {}

  async create(createDirectionDto: CreateDirectionDto) {
    const newDirection =
      await this.directionRepository.save(createDirectionDto);
    return plainToClass(CreateDirectionDto, newDirection);
  }

  async findAll() {
    const directions = await this.directionRepository.find({
      where: { active: true },
    });
    return directions;
  }

  async findOne(id: number) {
    const direction = await this.directionRepository.findOne({
      where: { id_direction: id },
    });

    if (!direction || !direction.active) {
      throw new BadRequestException('Direction not found in database');
    }
    return direction;
  }

  async update(id: number, updateDirectionDto: UpdateDirectionDto) {
    const direction = await this.findOne(id);
    const updatedDirection = await this.directionRepository.save({
      ...direction,
      ...updateDirectionDto,
    });
    return plainToClass(UpdateDirectionDto, updatedDirection);
  }

  async remove(id: number) {
    const direction = await this.findOne(id);

    if (!direction) {
      throw new BadRequestException('Direction dont remove');
    }

    await this.directionRepository.save({
      ...direction,
      active: false,
    });

    return { message: 'Direction successfully removed' };
  }
}
