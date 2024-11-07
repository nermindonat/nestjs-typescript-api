import { Injectable, NotFoundException } from '@nestjs/common';
import { DBService } from 'src/database/DB.service';
import { CreateProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private readonly DBService: DBService) {}

  async findAll() {
    const list = await this.DBService.product.findMany();
    return list;
  }

  async create(payload: CreateProductDto, image: string) {
    const price = parseFloat(payload.price.toString());
    return await this.DBService.product.create({
      data: {
        name: payload.name,
        price: price,
        image: image,
      },
    });
  }

  async findProductById(id: number) {
    const item = await this.DBService.product.findUnique({
      where: {
        id,
      },
    });
    if (!item) {
      throw new NotFoundException('Product not found');
    }
    return item;
  }
}
