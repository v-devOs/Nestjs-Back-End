import { Contact } from 'src/admin/contact/entities/contact.entity';
import { Direction } from 'src/admin/direction/entities/direction.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Branch {
  @PrimaryGeneratedColumn()
  id_branch: number;

  @Column()
  name: string;

  @Column()
  date_start: Date;

  @Column({ default: true })
  active: boolean;

  @Column()
  hour_start: number;

  @Column()
  hour_end: number;

  @OneToOne(() => Direction, { eager: true })
  @JoinColumn({ name: 'id_direction' })
  direction: Direction;

  @OneToOne(() => Contact, { eager: true })
  @JoinColumn({ name: 'id_contact' })
  contact: Contact;
}
