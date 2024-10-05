import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { DirectionService } from './direction.service';
import { CreateDirectionDto } from './dto/create-direction.dto';
import { UpdateDirectionDto } from './dto/update-direction.dto';

@Controller('direction')
export class DirectionController {
  constructor(private readonly directionService: DirectionService) {}

  @Post()
  async create(@Body() createDirectionDto: CreateDirectionDto) {
    return await this.directionService.create(createDirectionDto);
  }

  @Get()
  findAll() {
    return this.directionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.directionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDirectionDto: UpdateDirectionDto,
  ) {
    return this.directionService.update(id, updateDirectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.directionService.remove(+id);
  }
}
