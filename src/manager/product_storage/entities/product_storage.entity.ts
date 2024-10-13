import { Product } from 'src/manager/product/entities/product.entity';
import { Storage } from 'src/manager/storage/entities/storage.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ProductStorage {
  @PrimaryGeneratedColumn()
  id_product_storage: number;

  @PrimaryColumn()
  id_product: number;

  @PrimaryColumn()
  id_storage: number;

  @Column()
  stock: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'id_product' })
  product: Product;

  @ManyToOne(() => Storage)
  @JoinColumn({ name: 'id_storage' })
  storage: Storage;
}
