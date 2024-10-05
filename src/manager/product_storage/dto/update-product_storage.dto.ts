import { PartialType } from '@nestjs/mapped-types';
import { CreateProductStorageDto } from './create-product_storage.dto';

export class UpdateProductStorageDto extends PartialType(CreateProductStorageDto) {}
