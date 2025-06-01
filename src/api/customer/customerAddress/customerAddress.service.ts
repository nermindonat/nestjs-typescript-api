import { Injectable } from '@nestjs/common';
import { DBService } from 'src/database/DB.service';
import { CreateCustomerAddressDto } from './dto/createCustomerAddress.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerAddressService {
  constructor(private readonly DBService: DBService) {}

  async getCustomerAddresses() {
    return await this.DBService.customerAddress.findMany({
      include: {
        city: true,
        district: true,
        neighbourhood: true,
      },
    });
  }

  async create(payload: CreateCustomerAddressDto) {
    return await this.DBService.customerAddress.create({
      data: payload,
    });
  }

  async updateCustomerAddress(
    id: number,
    data: Prisma.CustomerAddressUpdateInput,
  ) {
    const item = await this.DBService.customerAddress.update({
      where: { id: id },
      data,
      include: {
        city: true,
        district: true,
        neighbourhood: true,
      },
    });
    return item;
  }
}
