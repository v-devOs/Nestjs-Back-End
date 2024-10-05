import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

import { Contact } from 'src/admin/contact/entities/contact.entity';
import { Direction } from '../admin/direction/entities/direction.entity';
import { Branch } from 'src/admin/branch/entities/branch.entity';

// Cargar las variables de entorno del archivo .env
config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Direction, Contact, Branch],
  synchronize: false,
};
