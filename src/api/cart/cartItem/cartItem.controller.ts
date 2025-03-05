import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CartItem } from './entity/cartItem.entity';
import { UpdateCartItemDto } from './dto/updateCartItem.dto';

@ApiTags('cart item')
@Controller('cart-item')
@UseGuards(JwtAuthGuard)
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @ApiOperation({ summary: 'Get all cart items' })
  @ApiResponse({ status: 200, type: [CartItem] })
  @Get()
  @ApiBearerAuth('token')
  async findAll(@Request() req): Promise<CartItem[]> {
    const customerId = req.user.id;
    if (!customerId) {
      throw new UnauthorizedException('Customer ID not found in token');
    }
    return this.cartItemService.findAll(customerId);
  }

  @ApiOperation({ summary: 'Create cart item' })
  @ApiResponse({ status: 201, type: CreateCartItemDto })
  @Post()
  @ApiBearerAuth('token')
  async create(@Request() req, @Body() createCartItemDto: CreateCartItemDto) {
    const customerId = req.user.id;
    if (!customerId) {
      throw new UnauthorizedException('Customer ID not found in token');
    }
    return await this.cartItemService.create(createCartItemDto, customerId);
  }

  @Put(':id/increase')
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'Increase cart item quantity' })
  @ApiResponse({ status: 200, type: CartItem })
  async increaseQuantity(
    @Request() req,
    @Param('id') id: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    const customerId = req.user.id;
    return this.cartItemService.increaseQuantity(
      +id,
      customerId,
      updateCartItemDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete all cart item' })
  @ApiResponse({ type: CartItem })
  @ApiBearerAuth('token')
  delete(@Request() req, @Param('id') id: string): Promise<CartItem> {
    const customerId = req.user.id;
    return this.cartItemService.deleteAll(+id, customerId);
  }

  @Delete(':id/decrease')
  @ApiOperation({ summary: 'Decrease quantity of cart item' })
  @ApiResponse({ type: CartItem })
  @ApiBearerAuth('token')
  decreaseQuantity(@Request() req, @Param('id') id: string): Promise<CartItem> {
    const customerId = req.user.id;
    return this.cartItemService.decreaseQuantity(+id, customerId);
  }
}
