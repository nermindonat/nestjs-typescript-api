import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/createCustomer.dto';
import { Prisma } from '@prisma/client';
import { Customer } from './entity/customer.entity';
import { DBService } from 'src/database/DB.service';

// @Injectable() dekoratörü ile tanımlanır, böylece bu provider'lar, diğer sınıflarda enjekte edilip kullanılabilir.
@Injectable()
export class CustomerService {
  constructor(private readonly DBService: DBService) {}

  async findAll(): Promise<Customer[]> {
    const list = await this.DBService.customer.findMany();
    return list;
  }

  async create(payload: CreateCustomerDto) {
    return await this.DBService.customer.create({
      data: payload,
    });
  }

  async findCustomerById(id: number) {
    const item = await this.DBService.customer.findUnique({
      where: { id: id },
    });

    if (!item) {
      throw new NotFoundException('Customer not found');
    }
    return item;
  }

  async updateCustomer(id: number, data: Prisma.CustomerUpdateInput) {
    const item = await this.DBService.customer.update({
      where: { id: id },
      data,
    });
    return item;
  }

  async findOne(email: string): Promise<Customer | undefined> {
    return this.DBService.customer.findUnique({
      where: { email: email },
    });
  }

  async deleteCustomer(id: number) {
    const item = await this.DBService.customer.findUnique({
      where: { id: id },
    });

    if (!item) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return this.DBService.customer.delete({
      where: { id: id },
    });
  }
}
