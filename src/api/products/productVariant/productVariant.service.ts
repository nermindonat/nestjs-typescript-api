import { Injectable } from '@nestjs/common';
import { DBService } from 'src/database/DB.service';
import { CreateProductVariantDto } from './dto';

@Injectable()
export class ProductVariantService {
  constructor(private readonly DBService: DBService) {}

  async create(payload: CreateProductVariantDto) {
    return await this.DBService.productVariant.create({
      data: payload,
    });
  }
}
