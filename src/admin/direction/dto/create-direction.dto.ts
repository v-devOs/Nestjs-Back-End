import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateDirectionDto {
  @IsString()
  zone: string;

  @IsString()
  street: string;

  @IsBoolean()
  @IsOptional()
  active: boolean;
}
