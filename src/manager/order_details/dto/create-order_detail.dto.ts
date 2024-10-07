import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDetailDto {
  @IsNumber()
  @IsNotEmpty()
  id_order: number;

  @IsNumber()
  @IsNotEmpty()
  id_product: number;

  @IsNumber()
  @IsNotEmpty()
  id_employee: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
