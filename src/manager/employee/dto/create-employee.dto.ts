import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @MaxLength(1)
  @IsIn(['M', 'F'])
  gender: string;

  @IsString()
  surname: string;

  @IsString()
  second_surname: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  date_end: Date;

  @IsString()
  tel: string;

  @IsString()
  profile_picture_url: string;

  @IsBoolean()
  @IsOptional()
  active: boolean;

  @IsNumber()
  id_branch: number;

  @IsNumber()
  id_storage: number;
}
