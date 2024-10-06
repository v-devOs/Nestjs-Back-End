import { forwardRef, Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { Branch } from './entities/branch.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectionModule } from '../direction/direction.module';
import { ContactModule } from '../contact/contact.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Branch]),
    forwardRef(() => DirectionModule),
    forwardRef(() => ContactModule),
  ],
  controllers: [BranchController],
  providers: [BranchService],
  exports: [BranchService],
})
export class BranchModule {}
