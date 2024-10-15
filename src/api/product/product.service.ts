import { Injectable } from '@nestjs/common';
import { DBService } from 'src/database/DB.service';
import { CreateProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private readonly DBService: DBService) {}
  async create(payload: CreateProductDto, imagePath: string) {
    const price = parseFloat(payload.price.toString());
    return await this.DBService.product.create({
      data: {
        name: payload.name,
        price: price,
        imagePath: imagePath,
      },
    });
  }
}
