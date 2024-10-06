import { forwardRef, Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { BranchModule } from 'src/admin/branch/branch.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Storage } from './entities/storage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Storage]),
    forwardRef(() => BranchModule),
  ],
  controllers: [StorageController],
  providers: [StorageService],
})
export class StorageModule {}
