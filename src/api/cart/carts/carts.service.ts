import { Injectable, NotFoundException } from '@nestjs/common';
import { DBService } from 'src/database/DB.service';
import { CreateCartsDto } from './dto/createCarts.dto';

@Injectable()
export class CartsService {
  constructor(private readonly DBService: DBService) {}

  async create(payload: CreateCartsDto) {
    if (payload.userId) {
      const user = await this.DBService.user.findUnique({
        where: { id: payload.userId },
      });
      if (!user) {
        throw new NotFoundException(
          `User with ID ${payload.userId} not found.`,
        );
      }
    }
    return await this.DBService.cart.create({
      data: payload,
    });
  }
}
