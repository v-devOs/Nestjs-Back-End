import { Branch } from 'src/admin/branch/entities/branch.entity';
import { Storage } from 'src/manager/storage/entities/storage.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id_employee: number;

  @Column()
  no_employee: string;

  @Column()
  gender: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  second_surname: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  date_start: Date;

  @Column({ nullable: true })
  date_end: Date;

  @Column()
  tel: string;

  @Column()
  profile_picture_url: string;

  @Column({ default: true })
  active: boolean;

  @Column({ default: 'Empleado' })
  rol: string;

  @ManyToOne(() => Branch)
  @JoinColumn({ name: 'id_branch' })
  branch: Branch;

  @ManyToOne(() => Storage)
  @JoinColumn({ name: 'id_storage' })
  storage: Storage;
}
