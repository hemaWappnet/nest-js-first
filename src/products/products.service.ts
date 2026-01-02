import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dtos/createProduct.dto';
import { UpdateProductDto } from './dtos/updateProduct.dto';

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async onModuleInit() {
    const count = await this.productRepository.count();
    if (count === 0) {
      await this.productRepository.save([
        { name: 'Product A', price: 100 },
        { name: 'Product B', price: 150 },
        { name: 'Product C', price: 200 },
      ]);
    }
  }

  async getAllProducts(query?: string) {
    let where: FindOptionsWhere<Product> = {};
    if (query) {
      const price = parseInt(query);
      if (!isNaN(price)) {
        // If query is a number, search by price
        where = { price };
      } else {
        // Otherwise, search by name with LIKE
        where = { name: Like(`%${query}%`) };
      }
    }
    const products = await this.productRepository.find({ where });
    if (!products.length) {
      throw new NotFoundException();
    }
    return products;
  }

  async getProductById(id: string) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }

  async createProduct(product: CreateProductDto) {
    const newProduct = this.productRepository.create(product);
    return await this.productRepository.save(newProduct);
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.getProductById(id);
    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  async deleteProduct(id: string) {
    const product = await this.getProductById(id);
    await this.productRepository.delete(id);
    return product;
  }
}
