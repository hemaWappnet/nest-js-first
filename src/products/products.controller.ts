import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Get('search')
  getProductsBySearch(@Query('q') query: string) {
    console.log('Search query:', query);
    return this.productsService.getAllProducts(query);
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    const response = this.productsService.getProductById(id);
    return response;
  }
}
