import { Module } from '@nestjs/common';
import { DirectionService } from './direction.service';
import { DirectionController } from './direction.controller';
import { Direction } from './entities/direction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Direction])],
  controllers: [DirectionController],
  providers: [DirectionService],
  exports: [DirectionService],
})
export class DirectionModule {}
