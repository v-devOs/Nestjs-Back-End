import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id_product: number;

  @Column()
  price: number;

  @Column()
  product: string;

  @Column()
  type: string;

  @Column()
  active: boolean;

  @Column()
  flavor: string;

  @Column()
  presentation: string;

  @Column()
  description: string;

  @Column()
  product_image_url: string;
}
