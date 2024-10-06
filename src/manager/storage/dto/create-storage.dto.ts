import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateStorageDto {
  @IsNumber()
  @IsNotEmpty()
  id_branch: number;

  @IsBoolean()
  @IsOptional()
  active: boolean;
}
