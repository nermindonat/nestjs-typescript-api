import { Module } from '@nestjs/common';
import { CustomerAddressService } from './customerAddress.service';
import { CustomerAddressController } from './customerAddress.controller';

@Module({
  imports: [],
  controllers: [CustomerAddressController],
  providers: [CustomerAddressService],
  exports: [],
})
export class CustomerAddressModule {}
