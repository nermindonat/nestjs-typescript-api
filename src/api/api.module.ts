import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { FavoriteModule } from './favorite/favorite.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [UserModule, AuthModule, ProductsModule, FavoriteModule, CartModule],
})
export class ApiModule {}
