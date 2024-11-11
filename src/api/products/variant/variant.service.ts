import { Injectable } from '@nestjs/common';
import { DBService } from 'src/database/DB.service';
import { CreateVariantDto } from './dto';

@Injectable()
export class VariantService {
  constructor(private readonly DBService: DBService) {}

  async create(payload: CreateVariantDto) {
    return await this.DBService.variant.create({
      data: payload,
    });
  }
}
