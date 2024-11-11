import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { VariantModule } from './variant/variant.module';
import { VariantValueModule } from './variantValue/variantValue.module';
import { ProductVariantModule } from './productVariant/productVariant.module';

@Module({
  imports: [
    ProductModule,
    VariantModule,
    VariantValueModule,
    ProductVariantModule,
  ],
})
export class ProductsModule {}
