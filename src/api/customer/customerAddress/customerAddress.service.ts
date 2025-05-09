import { Injectable } from '@nestjs/common';
import { DBService } from 'src/database/DB.service';
import { CreateCustomerAddressDto } from './dto/createCustomerAddress.dto';

@Injectable()
export class CustomerAddressService {
  constructor(private readonly DBService: DBService) {}

  async create(payload: CreateCustomerAddressDto) {
    return await this.DBService.customerAddress.create({
      data: payload,
    });
  }
}
