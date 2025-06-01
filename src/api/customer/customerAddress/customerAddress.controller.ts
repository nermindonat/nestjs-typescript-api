import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerAddressService } from './customerAddress.service';
import { CreateCustomerAddressDto } from './dto/createCustomerAddress.dto';
import { CustomerAddress } from './entity/customerAddress.entity';
import { UpdateCustomerAddressDto } from './dto/updateCustomerAddress.dto';

@ApiTags('customer-address')
@Controller('customer-address')
export class CustomerAddressController {
  constructor(
    private readonly customerAddressService: CustomerAddressService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all customer addresses' })
  @ApiResponse({ status: 200, type: [CustomerAddress] })
  getAddresses() {
    return this.customerAddressService.getCustomerAddresses();
  }

  @ApiOperation({ summary: 'Create customer address' })
  @ApiResponse({ status: 201, type: CreateCustomerAddressDto })
  @Post('create')
  create(@Body() createCustomerADdress: CreateCustomerAddressDto) {
    return this.customerAddressService.create(createCustomerADdress);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Update a customer address' })
  @ApiResponse({ status: 201, type: CustomerAddress })
  updateCustomerAddress(
    @Param('id') id: string,
    @Body() data: UpdateCustomerAddressDto,
  ): Promise<CustomerAddress> {
    return this.customerAddressService.updateCustomerAddress(+id, data);
  }
}
