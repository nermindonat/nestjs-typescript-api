import { Module } from '@nestjs/common';
import { ProductVariantController } from './productVariant.controller';
import { ProductVariantService } from './productVariant.service';

@Module({
  imports: [],
  controllers: [ProductVariantController],
  providers: [ProductVariantService],
  exports: [],
})
export class ProductVariantModule {}
