import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Direction {
  @PrimaryGeneratedColumn()
  id_direction: number;

  @Column({ nullable: true })
  zone: string;

  @Column({ nullable: true })
  street: string;
}
