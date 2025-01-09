import { Injectable, NotFoundException } from '@nestjs/common';
import { DBService } from 'src/database/DB.service';
import { CreateCartItemDto } from './dto/createCartItem.dto';

@Injectable()
export class CartItemService {
  constructor(private readonly DBService: DBService) {}

  async create(payload: CreateCartItemDto, userId: number) {
    const userCart = await this.DBService.cart.findUnique({
      where: {
        userId: userId,
      },
    });
    if (!userCart) {
      throw new NotFoundException('A cart belonging to the user could not be found.');
    }
    const cartId = userCart.id;
    return await this.DBService.cartItem.create({
      data: {
        cartId: cartId,
        productId: payload.productId,
        quantity: payload.quantity,
      },
    });
  }
}
