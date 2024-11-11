import { Module } from '@nestjs/common';
import { VariantValueController } from './variantValue.controller';
import { VariantValueService } from './variantValue.service';

@Module({
  imports: [],
  controllers: [VariantValueController],
  providers: [VariantValueService],
  exports: [],
})
export class VariantValueModule {}
