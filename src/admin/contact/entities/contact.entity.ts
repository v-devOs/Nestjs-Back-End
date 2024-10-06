import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id_contact: number;

  @Column()
  tel: string;

  @Column()
  email: string;

  @Column()
  instagram: string;

  @Column()
  facebook: string;

  @Column({ default: true })
  active: boolean;
}
