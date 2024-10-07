import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { BranchService } from 'src/admin/branch/branch.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @Inject(forwardRef(() => BranchService))
    private readonly branchService: BranchService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const branch = await this.branchService.findOne(createOrderDto.id_branch);

    const newOrder = await this.orderRepository.save({
      ...createOrderDto,
      branch,
    });

    return newOrder;
  }

  async findAll() {
    const orders = await this.orderRepository.find({
      relations: ['branch'],
    });

    return orders.map((order) => {
      const newOrder = {
        ...order,
        id_branch: order.branch.id_branch,
      };

      delete newOrder.branch;
      return newOrder;
    });
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id_order: id },
    });

    if (!order) {
      throw new NotFoundException(`Order not found with id: ${id}`);
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);

    if (updateOrderDto.id_branch) {
      const branch = await this.branchService.findOne(updateOrderDto.id_branch);
      order.branch = branch;
    }

    const updatedOrder = await this.orderRepository.save({
      ...order,
      ...updateOrderDto,
    });

    return updatedOrder;
  }

  async remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
