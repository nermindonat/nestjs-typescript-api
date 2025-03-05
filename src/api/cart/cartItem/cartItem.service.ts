import { Injectable, NotFoundException } from '@nestjs/common';
import { DBService } from 'src/database/DB.service';
import { CreateCartItemDto } from './dto/createCartItem.dto';
import { UpdateCartItemDto } from './dto/updateCartItem.dto';

@Injectable()
export class CartItemService {
  constructor(private readonly DBService: DBService) {}

  async findAll(customerId: number) {
    return await this.DBService.cartItem.findMany({
      where: {
        cart: {
          customerId: customerId,
        },
      },
      include: {
        product: true,
        productVariant: {
          include: {
            variantValue: true,
          },
        },
      },
    });
  }

  async create(payload: CreateCartItemDto, customerId: number) {
    // Önce müşterinin sepetini kontrol et
    let customerCart = await this.DBService.cart.findUnique({
      where: {
        customerId: customerId,
      },
    });
    // Eğer sepet yoksa yeni sepet oluştur
    if (!customerCart) {
      customerCart = await this.DBService.cart.create({
        data: {
          customerId: customerId,
        },
      });
    }

    const cartId = customerCart.id;
    const existingCartItem = await this.DBService.cartItem.findFirst({
      where: {
        cartId: cartId,
        productId: payload.productId,
        productVariantId: payload.productVariantId,
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
          productVariantId: payload.productVariantId,
          quantity: payload.quantity,
        },
      });
    }
  }

  async increaseQuantity(
    id: number,
    customerId: number,
    payload: UpdateCartItemDto,
  ) {
    // Kullanıcının sepetini bul
    const customerCart = await this.DBService.cart.findUnique({
      where: {
        customerId: customerId,
      },
    });
    if (!customerCart) {
      throw new NotFoundException(
        'A cart belonging to the customer could not be found.',
      );
    }
    // Sepet öğesini bul
    const cartItem = await this.DBService.cartItem.findUnique({
      where: { id },
    });
    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }
    // Sepet öğesinin kullanıcının sepetine ait olduğunu kontrol et
    if (cartItem.cartId !== customerCart.id) {
      throw new NotFoundException('Cart item does not belong to the customer');
    }
    // Miktarı artır ve güncelle
    return this.DBService.cartItem.update({
      where: { id },
      data: {
        quantity: cartItem.quantity + payload.quantity,
      },
    });
  }

  async deleteAll(id: number, customerId: number) {
    const item = await this.DBService.cartItem.findUnique({
      where: {
        id: id,
        cart: {
          customerId: customerId,
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

  async decreaseQuantity(id: number, customerId: number) {
    const item = await this.DBService.cartItem.findUnique({
      where: {
        id: id,
        cart: {
          customerId: customerId,
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
