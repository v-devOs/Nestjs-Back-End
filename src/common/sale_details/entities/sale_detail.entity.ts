import { Employee } from 'src/manager/employee/entities/employee.entity';
import { Product } from 'src/manager/product/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class SaleDetails {
  @PrimaryGeneratedColumn()
  id_sale: number;

  @PrimaryColumn()
  id_employee: number;

  @PrimaryColumn()
  id_product: number;

  @Column()
  date: Date;

  @Column()
  quantity: number;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'id_employee' })
  employee: Employee;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'id_product' })
  product: Product;
}
