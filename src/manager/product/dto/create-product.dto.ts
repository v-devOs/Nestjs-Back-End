import {
  IsNumber,
  IsString,
  IsBoolean,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  product: string;

  @IsString()
  type: string;

  @IsBoolean()
  @IsOptional()
  active: boolean;

  @IsString()
  flavor: string;

  @IsString()
  presentation: string;

  @IsString()
  description: string;

  @IsString()
  product_image_url: string;
}
