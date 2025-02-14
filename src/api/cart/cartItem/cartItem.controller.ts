import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCartItemDto } from './dto/createCartItem.dto';
import { CartItemService } from './cartItem.service';
import { JwtAuthGuard } from 'src/api/auth/guards';
import { CartItem } from './entity/cartItem.entity';

@ApiTags('cart item')
@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @ApiOperation({ summary: 'Get all cart items' })
  @ApiResponse({ status: 200, type: [CartItem] })
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  async findAll(@Request() req): Promise<CartItem[]> {
    const userId = req.user.userId;
    if (!userId) {
      throw new UnauthorizedException('User ID not found in token');
    }
    return this.cartItemService.findAll(userId);
  }

  @ApiOperation({ summary: 'Create cart item' })
  @ApiResponse({ status: 201, type: CreateCartItemDto })
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  async create(@Request() req, @Body() createCartItemDto: CreateCartItemDto) {
    const userId = req.user.userId;
    return await this.cartItemService.create(createCartItemDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete all cart item' })
  @ApiResponse({ type: CartItem })
  delete(@Param('id') id: string): Promise<CartItem> {
    return this.cartItemService.deleteAll(+id);
  }

  @Delete('one/:id')
  @ApiOperation({ summary: 'Decrease quantity of cart item' })
  @ApiResponse({ type: CartItem })
  deleteOne(@Param('id') id: string): Promise<CartItem> {
    return this.cartItemService.deleteOne(+id);
  }
}
