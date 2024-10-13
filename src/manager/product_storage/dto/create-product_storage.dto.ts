import { IsNumber, IsPositive } from 'class-validator';

export class CreateProductStorageDto {
  @IsNumber()
  @IsPositive()
  id_product: number;

  @IsNumber()
  @IsPositive()
  id_storage: number;

  @IsNumber()
  @IsPositive()
  stock: number;
}
