import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { FavoriteModule } from './favorite/favorite.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    CustomerModule,
    AuthModule,
    ProductsModule,
    FavoriteModule,
    CartModule,
  ],
})
export class ApiModule {}
