import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartsService } from './carts.service';
import { CreateCartsDto } from './dto/createCarts.dto';

@ApiTags('carts')
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @ApiOperation({ summary: 'Create carts' })
  @ApiResponse({ status: 201, type: CreateCartsDto })
  @Post()
  create(@Body() createCartsDto: CreateCartsDto) {
    return this.cartsService.create(createCartsDto);
  }
}
