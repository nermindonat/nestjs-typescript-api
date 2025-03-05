import { Injectable, NotFoundException } from '@nestjs/common';
import { DBService } from 'src/database/DB.service';
import { CreateCartsDto } from './dto/createCarts.dto';

@Injectable()
export class CartsService {
  constructor(private readonly DBService: DBService) {}

  async create(payload: CreateCartsDto) {
    if (payload.customerId) {
      const customer = await this.DBService.customer.findUnique({
        where: { id: payload.customerId },
      });
      if (!customer) {
        throw new NotFoundException(
          `Customer with ID ${payload.customerId} not found.`,
        );
      }
    }
    return await this.DBService.cart.create({
      data: payload,
    });
  }
}
