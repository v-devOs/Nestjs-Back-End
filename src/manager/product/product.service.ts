import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.productRepository.save(createProductDto);
    return product;
  }

  async findAll() {
    const products = await this.productRepository.find();
    return products.filter((product) => product.active);
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id_product: id, active: true },
    });

    if (!product) {
      throw new BadRequestException('Product not found with id: ' + id);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);

    return this.productRepository.save({ ...product, ...updateProductDto });
  }

  async remove(id: number) {
    const product = await this.findOne(id);

    if (!product) {
      throw new BadRequestException('Product not found with id: ' + id);
    }

    await this.productRepository.save({ ...product, active: false });

    return { message: 'Product deleted successfully' };
  }
}
