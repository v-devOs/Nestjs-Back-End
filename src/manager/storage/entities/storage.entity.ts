import { Branch } from 'src/admin/branch/entities/branch.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Storage {
  @PrimaryGeneratedColumn()
  id_storage: number;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => Branch)
  @JoinColumn({ name: 'id_branch' })
  branch: Branch;
}
