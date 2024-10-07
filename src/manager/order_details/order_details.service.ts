import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDetailDto, UpdateOrderDetailDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetails } from './entities/order_detail.entity';
import { Repository } from 'typeorm';
import { EmployeeService } from '../employee/employee.service';
import { ProductService } from '../product/product.service';
import { OrderService } from '../order/order.service';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetails)
    private readonly orderDetailRepository: Repository<OrderDetails>,
    @Inject(forwardRef(() => OrderService))
    private readonly orderService: OrderService,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
    @Inject(forwardRef(() => EmployeeService))
    private readonly employeeService: EmployeeService,
  ) {}

  async create(createOrderDetailDto: CreateOrderDetailDto) {
    const order = await this.orderService.findOne(
      createOrderDetailDto.id_order,
    );
    const product = await this.productService.findOne(
      createOrderDetailDto.id_product,
    );
    const employee = await this.employeeService.findOne(
      createOrderDetailDto.id_employee,
    );

    const orderDetails = await this.orderDetailRepository.save({
      order,
      product,
      employee,
      quantity: createOrderDetailDto.quantity,
    });

    return orderDetails;
  }

  async findAll() {
    const orderDetails = await this.orderDetailRepository.find({
      relations: ['order', 'product', 'employee'],
    });

    return orderDetails.map((orderDetails) => {
      const newOrderDetail = {
        id_order_details: orderDetails.id_order_details,
        id_employee: orderDetails.employee.id_employee,
        id_product: orderDetails.product.id_product,
        id_order: orderDetails.order.id_order,
        quantity: orderDetails.quantity,
      };
      return newOrderDetail;
    });
  }

  async findOne(id: number) {
    const orderDetail = await this.orderDetailRepository.findOne({
      where: { id_order_details: id },
      relations: ['order', 'product', 'employee'],
    });

    if (!orderDetail) {
      throw new NotFoundException('Order detail not found with id: ' + id);
    }

    return orderDetail;
  }

  async update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    const orderDetail = await this.findOne(id);

    if (updateOrderDetailDto.id_employee) {
      const employee = await this.employeeService.findOne(
        updateOrderDetailDto.id_employee,
      );
      orderDetail.employee = employee;
    }

    if (updateOrderDetailDto.id_product) {
      const product = await this.productService.findOne(
        updateOrderDetailDto.id_product,
      );
      orderDetail.product = product;
    }

    if (updateOrderDetailDto.id_order) {
      const order = await this.orderService.findOne(
        updateOrderDetailDto.id_order,
      );
      orderDetail.order = order;
    }

    return await this.orderDetailRepository.save({
      ...orderDetail,
      ...updateOrderDetailDto,
      employee: orderDetail.employee,
      product: orderDetail.product,
      order: orderDetail.order,
    });
  }

  async remove(id: number) {
    return `This action removes a #${id} orderDetail`;
  }
}
