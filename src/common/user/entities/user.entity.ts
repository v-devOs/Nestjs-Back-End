import { Employee } from 'src/manager/employee/entities/employee.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, default: true })
  active: boolean;

  @OneToOne(() => Employee)
  @JoinColumn({ name: 'id_employee' })
  employee: Employee;
}
