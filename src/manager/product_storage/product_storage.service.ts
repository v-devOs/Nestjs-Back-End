import { Injectable } from '@nestjs/common';
import { CreateProductStorageDto } from './dto/create-product_storage.dto';
import { UpdateProductStorageDto } from './dto/update-product_storage.dto';

@Injectable()
export class ProductStorageService {
  create(createProductStorageDto: CreateProductStorageDto) {
    return 'This action adds a new productStorage';
  }

  findAll() {
    return `This action returns all productStorage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productStorage`;
  }

  update(id: number, updateProductStorageDto: UpdateProductStorageDto) {
    return `This action updates a #${id} productStorage`;
  }

  remove(id: number) {
    return `This action removes a #${id} productStorage`;
  }
}
