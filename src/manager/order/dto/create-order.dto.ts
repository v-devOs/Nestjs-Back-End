import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsBoolean()
  @IsOptional()
  status: boolean;

  @IsNotEmpty()
  @IsNumber()
  id_branch: number;
}
