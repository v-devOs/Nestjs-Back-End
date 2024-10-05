import { CreateContactDto } from 'src/admin/contact/dto';
import { CreateDirectionDto } from 'src/admin/direction/dto';

export class BranchDto {
  id_branch: number;
  name: string;
  date_start: Date;
  active: boolean;
  hour_start: number;
  hour_end: number;
  direction: CreateDirectionDto;
  contact: CreateContactDto;
}
