import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer/customer.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { FavoriteModule } from './favorite/favorite.module';
import { CartModule } from './cart/cart.module';
import { CityModule } from './set/city/city.module';
import { DistrictModule } from './set/district/district.module';
import { NeighbourhoodModule } from './set/neighbourhood/neighbourhood.module';
import { CustomerAddressModule } from './customer/customerAddress/customerAddress.module';

@Module({
  imports: [
    CustomerModule,
    AuthModule,
    ProductsModule,
    FavoriteModule,
    CartModule,
    CityModule,
    DistrictModule,
    NeighbourhoodModule,
    CustomerAddressModule,
  ],
})
export class ApiModule {}
