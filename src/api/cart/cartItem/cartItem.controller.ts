import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCartItemDto } from './dto/createCartItem.dto';
import { CartItemService } from './cartItem.service';
import { JwtAuthGuard } from 'src/api/auth/guards';

@ApiTags('cart item')
@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @ApiOperation({ summary: 'Create cart item' })
  @ApiResponse({ status: 201, type: CreateCartItemDto })
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  async create(@Request() req, @Body() createCartItemDto: CreateCartItemDto) {
    const userId = req.user.userId;
    return await this.cartItemService.create(createCartItemDto, userId);
  }
}
