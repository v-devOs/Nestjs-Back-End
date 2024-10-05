import { Module } from '@nestjs/common';
import { ProductStorageService } from './product_storage.service';
import { ProductStorageController } from './product_storage.controller';

@Module({
  controllers: [ProductStorageController],
  providers: [ProductStorageService],
})
export class ProductStorageModule {}
