import { forwardRef, Module } from '@nestjs/common';
import { OrderDetailsService } from './order_details.service';
import { OrderDetailsController } from './order_details.controller';
import { OrderDetails } from './entities/order_detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from '../order/order.module';
import { ProductModule } from '../product/product.module';
import { EmployeeModule } from '../employee/employee.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderDetails]),
    forwardRef(() => OrderModule),
    forwardRef(() => ProductModule),
    forwardRef(() => EmployeeModule),
  ],
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService],
  exports: [OrderDetailsService],
})
export class OrderDetailsModule {}
