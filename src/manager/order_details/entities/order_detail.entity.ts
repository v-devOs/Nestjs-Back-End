import { Employee } from 'src/manager/employee/entities/employee.entity';
import { Order } from 'src/manager/order/entities/order.entity';
import { Product } from 'src/manager/product/entities/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class OrderDetails {
  @PrimaryGeneratedColumn()
  id_order_details: number;

  @PrimaryColumn()
  id_order: number;

  @PrimaryColumn()
  id_product: number;

  @PrimaryColumn()
  id_employee: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'id_order' })
  order: Order;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'id_product' })
  product: Product;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'id_employee' })
  employee: Employee;
}
