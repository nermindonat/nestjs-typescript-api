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
import { JwtAuthGuard } from 'src/api/auth/guards';
import { CartItem } from './entity/cartItem.entity';
import { UpdateCartItemDto } from './dto/updateCartItem.dto';

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

  @Put(':id/increase')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'Increase cart item quantity' })
  @ApiResponse({ status: 200, type: CartItem })
  async increaseQuantity(
    @Request() req,
    @Param('id') id: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    const userId = req.user.userId;
    return this.cartItemService.increaseQuantity(
      +id,
      userId,
      updateCartItemDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete all cart item' })
  @ApiResponse({ type: CartItem })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  delete(@Request() req, @Param('id') id: string): Promise<CartItem> {
    const userId = req.user.userId;
    return this.cartItemService.deleteAll(+id, userId);
  }

  @Delete(':id/decrease')
  @ApiOperation({ summary: 'Decrease quantity of cart item' })
  @ApiResponse({ type: CartItem })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  decreaseQuantity(@Request() req, @Param('id') id: string): Promise<CartItem> {
    const userId = req.user.userId;
    return this.cartItemService.decreaseQuantity(+id, userId);
  }
}
