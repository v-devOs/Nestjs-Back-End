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
    return plainToClass(Direction, newDirection);
  }

  async findAll() {
    const directions = await this.directionRepository.find();
    return directions.map((direction) => plainToClass(Direction, direction));
  }

  async findOne(id: number) {
    const direction = await this.directionRepository.findOne({
      where: { id_direction: id },
    });

    if (!direction) {
      throw new BadRequestException('Direction not found in database');
    }
    return plainToClass(Direction, direction);
  }

  async update(id: number, updateDirectionDto: UpdateDirectionDto) {
    const direction = await this.findOne(id);
    const updatedDirection = await this.directionRepository.save({
      ...direction,
      ...updateDirectionDto,
    });
    return plainToClass(Direction, updatedDirection);
  }

  async remove(id: number) {
    const direction = await this.findOne(id);

    if (!direction) {
      throw new BadRequestException('Direction dont remove');
    }

    await this.directionRepository.delete(id);
    return { message: 'Direction successfully removed' };
  }
}
