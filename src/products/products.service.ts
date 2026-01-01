import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateProductDto } from './dtos/createProduct.dto';

@Injectable()
export class ProductsService {
  private products = [
    { id: uuidv4(), name: 'Product A', price: 100 },
    { id: uuidv4(), name: 'Product B', price: 150 },
    { id: uuidv4(), name: 'Product C', price: 200 },
  ];

  getAllProducts(query?: string) {
    const products = this.products.filter(
      (product) =>
        !query ||
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.price.toString() === query,
    );
    if (!products.length) {
      throw new NotFoundException();
    }
    return products;
  }

  getProductById(id: string) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }

  createProduct(product: CreateProductDto) {
    const newProduct = { id: uuidv4(), ...product };
    this.products.push(newProduct);
    return newProduct;
  }
}
