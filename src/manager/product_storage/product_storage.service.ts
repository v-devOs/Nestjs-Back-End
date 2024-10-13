import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductStorageDto, UpdateProductStorageDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductStorage } from './entities/product_storage.entity';
import { Repository } from 'typeorm';
import { ProductService } from '../product/product.service';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class ProductStorageService {
  constructor(
    @InjectRepository(ProductStorage)
    private readonly productStorageRepository: Repository<ProductStorage>,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
    @Inject(forwardRef(() => StorageService))
    private readonly storageService: StorageService,
  ) {}

  async create(createProductStorageDto: CreateProductStorageDto) {
    const product = await this.productService.findOne(
      createProductStorageDto.id_product,
    );
    const storage = await this.storageService.findOne(
      createProductStorageDto.id_storage,
    );
    const productStorage = this.productStorageRepository.save({
      product,
      storage,
      stock: createProductStorageDto.stock,
    });
    return productStorage;
  }

  async findAll() {
    const productStorages = await this.productStorageRepository.find();
    return productStorages.map((productStorage) => {
      const newProductStorage = {
        ...productStorage,
        id_product: productStorage.product.id_product,
        id_storage: productStorage.storage.id_storage,
      };

      delete newProductStorage.product;
      delete newProductStorage.storage;

      return newProductStorage;
    });
  }

  async findOne(id: number) {
    const productStorage = await this.productStorageRepository.findOne({
      where: { id_product_storage: id },
      relations: ['product', 'storage'],
    });

    if (!productStorage) {
      throw new NotFoundException('Product Storage not found with id: ' + id);
    }

    return productStorage;
  }

  async update(id: number, updateProductStorageDto: UpdateProductStorageDto) {
    const productStorage = await this.findOne(id);

    if (updateProductStorageDto.id_product) {
      const product = await this.productService.findOne(
        updateProductStorageDto.id_product,
      );
      productStorage.product = product;
    }

    if (updateProductStorageDto.id_storage) {
      const storage = await this.storageService.findOne(
        updateProductStorageDto.id_storage,
      );

      productStorage.storage = storage;
    }

    return await this.productStorageRepository.save({
      ...productStorage,
      stock: updateProductStorageDto.stock,
    });
  }
}
