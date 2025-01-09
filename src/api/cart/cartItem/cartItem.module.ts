import { Module } from '@nestjs/common';
import { CartItemController } from './cartItem.controller';
import { CartItemService } from './cartItem.service';

@Module({
  imports: [],
  controllers: [CartItemController],
  providers: [CartItemService],
})
export class CartItemModule {}
