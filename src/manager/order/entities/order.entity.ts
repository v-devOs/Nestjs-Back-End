import { Branch } from 'src/admin/branch/entities/branch.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id_order: number;

  @Column({ default: true })
  status: boolean;

  @Column()
  date: Date;

  @ManyToOne(() => Branch)
  @JoinColumn({ name: 'id_branch' })
  branch: Branch;
}
