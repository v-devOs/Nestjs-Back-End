import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductStorageService } from './product_storage.service';
import { CreateProductStorageDto } from './dto/create-product_storage.dto';
import { UpdateProductStorageDto } from './dto/update-product_storage.dto';

@Controller('product-storage')
export class ProductStorageController {
  constructor(private readonly productStorageService: ProductStorageService) {}

  @Post()
  create(@Body() createProductStorageDto: CreateProductStorageDto) {
    return this.productStorageService.create(createProductStorageDto);
  }

  @Get()
  findAll() {
    return this.productStorageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productStorageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductStorageDto: UpdateProductStorageDto) {
    return this.productStorageService.update(+id, updateProductStorageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productStorageService.remove(+id);
  }
}
