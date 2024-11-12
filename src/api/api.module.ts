import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [UserModule, AuthModule, ProductsModule, FavoriteModule],
})
export class ApiModule {}
