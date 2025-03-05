import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CustomerService } from './customer.service';

import { CreateCustomerDto, UpdateCustomerDto } from './dto';
import { JwtAuthGuard } from '../auth/guards';
import { Customer } from './entity/customer.entity';

// Controller, uygulamanızın gelen istekleri (HTTP isteklerini) alıp yönettiği yerdir.
@ApiTags('customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({ summary: 'Get all customers' })
  @ApiResponse({ status: 200, type: [Customer] })
  @Get()
  findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  @ApiOperation({ summary: 'Get customer information detail' })
  @ApiResponse({ status: 200, type: Customer })
  @Get('customer-detail')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  findOne(@Request() req): Promise<Customer> {
    return this.customerService.findOne(req.user.email);
  }

  @ApiOperation({ summary: 'Create customer' })
  @ApiResponse({ status: 201, type: CreateCustomerDto })
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get customer by id' })
  @ApiResponse({ type: Customer })
  findCustomerById(@Param('id') id: string): Promise<Customer> {
    return this.customerService.findCustomerById(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a customer' })
  @ApiResponse({ status: 201, type: Customer })
  updateCustomer(
    @Param('id') id: string,
    @Body() data: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.customerService.updateCustomer(+id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a customer' })
  @ApiResponse({ type: Customer })
  deleteCustomer(@Param('id') id: string): Promise<Customer> {
    return this.customerService.deleteCustomer(+id);
  }
}
