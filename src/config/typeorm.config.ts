import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

// Cargar las variables de entorno del archivo .env
config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  autoLoadEntities: true,
  ssl: true,
};
