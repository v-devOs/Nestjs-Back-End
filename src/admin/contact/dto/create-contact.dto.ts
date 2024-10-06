import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  tel: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  instagram: string;

  @IsString()
  @IsNotEmpty()
  facebook: string;

  @IsBoolean()
  @IsOptional()
  active: boolean;
}
