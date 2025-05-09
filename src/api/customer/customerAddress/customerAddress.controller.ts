import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerAddressService } from './customerAddress.service';
import { CreateCustomerAddressDto } from './dto/createCustomerAddress.dto';

@ApiTags('customer-address')
@Controller('customer-address')
export class CustomerAddressController {
  constructor(
    private readonly customerAddressService: CustomerAddressService,
  ) {}

  @ApiOperation({ summary: 'Create customer address' })
  @ApiResponse({ status: 201, type: CreateCustomerAddressDto })
  @Post()
  create(@Body() createCustomerADdress: CreateCustomerAddressDto) {
    return this.customerAddressService.create(createCustomerADdress);
  }
}
