import { Module } from '@nestjs/common';
import { VariantController } from './variant.controller';
import { VariantService } from './variant.service';

@Module({
  imports: [],
  controllers: [VariantController],
  providers: [VariantService],
  exports: [],
})
export class VariantModule {}
