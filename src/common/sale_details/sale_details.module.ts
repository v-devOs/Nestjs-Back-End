import { forwardRef, Module } from '@nestjs/common';
import { SaleDetailsService } from './sale_details.service';
import { SaleDetailsController } from './sale_details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleDetails } from './entities/sale_detail.entity';
import { EmployeeModule, ProductModule } from 'src/manager';

@Module({
  imports: [
    TypeOrmModule.forFeature([SaleDetails]),
    forwardRef(() => EmployeeModule),
    forwardRef(() => ProductModule),
  ],
  controllers: [SaleDetailsController],
  providers: [SaleDetailsService],
  exports: [SaleDetailsService],
})
export class SaleDetailsModule {}
