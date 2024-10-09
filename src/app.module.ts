import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { BcryptModule } from './lib/bcrypt/bcrypt.module';

import * as AdminModules from './admin';
import * as ManagerModules from './manager';
import * as CommonModules from './common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    ...Object.values(AdminModules),
    ...Object.values(ManagerModules),
    ...Object.values(CommonModules),
    BcryptModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
