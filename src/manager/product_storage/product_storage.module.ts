import { forwardRef, Module } from '@nestjs/common';
import { ProductStorageService } from './product_storage.service';
import { ProductStorageController } from './product_storage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductStorage } from './entities/product_storage.entity';
import { ProductModule } from '../product/product.module';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductStorage]),
    forwardRef(() => ProductModule),
    forwardRef(() => StorageModule),
  ],
  controllers: [ProductStorageController],
  providers: [ProductStorageService],
  exports: [ProductStorageService],
})
export class ProductStorageModule {}
