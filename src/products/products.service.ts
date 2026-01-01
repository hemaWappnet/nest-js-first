import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private products = [
    { id: 1, name: 'Product A', price: 100 },
    { id: 2, name: 'Product B', price: 150 },
    { id: 3, name: 'Product C', price: 200 },
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
    const product = this.products.find((product) => product.id === Number(id));
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }
}
