import { Injectable } from '@nestjs/common';
import { DBService } from 'src/database/DB.service';
import { CreateVariantValueDto } from './dto';

@Injectable()
export class VariantValueService {
  constructor(private readonly DBService: DBService) {}

  async create(payload: CreateVariantValueDto) {
    return await this.DBService.variantValue.create({
      data: payload,
    });
  }
}
