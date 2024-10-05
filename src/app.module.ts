import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DirectionModule } from './admin/direction/direction.module';
import { ContactModule } from './admin/contact/contact.module';
import { BranchModule } from './admin/branch/branch.module';
import { StorageModule } from './manager/storage/storage.module';
import { EmployeeModule } from './manager/employee/employee.module';
import { OrderModule } from './manager/order/order.module';
import { ProductModule } from './manager/product/product.module';
import { UserModule } from './common/user/user.module';
import { ProductStorageModule } from './manager/product_storage/product_storage.module';
import { OrderDetailsModule } from './manager/order_details/order_details.module';
import { SaleDetailsModule } from './common/sale_details/sale_details.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [],
      synchronize: true,
    }),
    DirectionModule,
    ContactModule,
    BranchModule,
    StorageModule,
    EmployeeModule,
    OrderModule,
    ProductModule,
    UserModule,
    ProductStorageModule,
    OrderDetailsModule,
    SaleDetailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
