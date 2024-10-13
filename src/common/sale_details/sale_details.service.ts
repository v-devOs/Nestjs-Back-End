import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSaleDetailDto, UpdateSaleDetailDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleDetails } from './entities/sale_detail.entity';
import { Repository } from 'typeorm';
import { EmployeeService } from 'src/manager/employee/employee.service';
import { ProductService } from 'src/manager/product/product.service';

@Injectable()
export class SaleDetailsService {
  constructor(
    @InjectRepository(SaleDetails)
    private readonly saleDetailsRepository: Repository<SaleDetails>,
    @Inject(forwardRef(() => EmployeeService))
    private readonly employeeService: EmployeeService,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
  ) {}
  async create(createSaleDetailDto: CreateSaleDetailDto) {
    const employee = await this.employeeService.findOne(
      createSaleDetailDto.id_employee,
    );
    const product = await this.productService.findOne(
      createSaleDetailDto.id_product,
    );

    const saleDetails = this.saleDetailsRepository.save({
      ...createSaleDetailDto,
      employee,
      product,
    });

    return saleDetails;
  }

  async findAll() {
    const saleDetails = await this.saleDetailsRepository.find({
      relations: ['employee', 'product'],
    });

    return saleDetails.map((saleDetail) => {
      const newSaleDetails = {
        ...saleDetail,
        id_employee: saleDetail.id_employee,
        id_product: saleDetail.id_product,
      };

      delete newSaleDetails.employee;
      delete newSaleDetails.product;

      return newSaleDetails;
    });
  }

  async findOne(id: number) {
    const saleDetails = await this.saleDetailsRepository.findOne({
      relations: ['employee', 'product'],
      where: { id_sale: id },
    });

    if (!saleDetails)
      throw new NotFoundException('Not found sale details with id: ' + id);

    return saleDetails;
  }

  async update(id: number, updateSaleDetailDto: UpdateSaleDetailDto) {
    const saleDetail = await this.findOne(id);

    if (updateSaleDetailDto.id_employee) {
      const newEmployee = await this.employeeService.findOne(
        updateSaleDetailDto.id_employee,
      );

      saleDetail.employee = newEmployee;
    }

    if (updateSaleDetailDto.id_product) {
      const newProduct = await this.productService.findOne(
        updateSaleDetailDto.id_product,
      );

      saleDetail.product = newProduct;
    }

    return await this.saleDetailsRepository.save({
      ...updateSaleDetailDto,
      ...saleDetail,
    });
  }
}
