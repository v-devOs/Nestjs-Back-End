import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateSaleDetailDto {
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  date: Date;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @Min(1)
  id_employee: number;

  @IsNumber()
  @Min(1)
  id_product: number;
}
