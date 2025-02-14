import { Injectable, NotFoundException } from '@nestjs/common';
import { DBService } from 'src/database/DB.service';
import { CreateCartItemDto } from './dto/createCartItem.dto';

@Injectable()
export class CartItemService {
  constructor(private readonly DBService: DBService) {}

  async findAll(userId: number) {
    return await this.DBService.cartItem.findMany({
      where: {
        cart: {
          userId: userId,
        },
      },
      include: {
        product: true,
      },
    });
  }

  async create(payload: CreateCartItemDto, userId: number) {
    const userCart = await this.DBService.cart.findUnique({
      where: {
        userId: userId,
      },
    });
    if (!userCart) {
      throw new NotFoundException(
        'A cart belonging to the user could not be found.',
      );
    }
    const cartId = userCart.id;
    const existingCartItem = await this.DBService.cartItem.findFirst({
      where: {
        cartId: cartId,
        productId: payload.productId,
      },
    });
    if (existingCartItem) {
      return await this.DBService.cartItem.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: existingCartItem.quantity + payload.quantity,
        },
      });
    } else {
      return await this.DBService.cartItem.create({
        data: {
          cartId: cartId,
          productId: payload.productId,
          quantity: payload.quantity,
        },
      });
    }
  }

  async deleteAll(id: number, userId: number) {
    const item = await this.DBService.cartItem.findUnique({
      where: {
        id: id,
        cart: {
          userId: userId,
        },
      },
    });
    if (!item) {
      throw new NotFoundException(`Cart item with ID ${id} not found`);
    }
    await this.DBService.cartItem.delete({
      where: { id },
    });
    return item;
  }

  async deleteOne(id: number, userId: number) {
    const item = await this.DBService.cartItem.findUnique({
      where: {
        id: id,
        cart: {
          userId: userId,
        },
      },
    });
    if (!item) {
      throw new NotFoundException(`Cart item with ID ${id} not found`);
    }
    if (item.quantity > 1) {
      return await this.DBService.cartItem.update({
        where: { id },
        data: {
          quantity: item.quantity - 1,
        },
      });
    }
    return item;
  }
}
