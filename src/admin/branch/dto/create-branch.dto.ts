import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateBranchDto {
  @IsString()
  name: string;

  @IsDate()
  @Type(() => Date)
  date_start: Date;

  @IsNumber()
  hour_start: number;

  @IsNumber()
  hour_end: number;

  @IsNumber()
  id_direction: number;

  @IsNumber()
  id_contact: number;
}
