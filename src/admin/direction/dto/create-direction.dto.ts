import { IsString } from 'class-validator';

export class CreateDirectionDto {
  @IsString()
  zone: string;

  @IsString()
  street: string;
}
