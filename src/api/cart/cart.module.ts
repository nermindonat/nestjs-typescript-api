import { Module } from '@nestjs/common';
import { CartsModule } from './carts/carts.module';
import { CartItemModule } from './cartItem/cartItem.module';

@Module({
  imports: [CartsModule, CartItemModule],
})
export class CartModule {}
