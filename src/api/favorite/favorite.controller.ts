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
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto';
import { JwtAuthGuard } from '../auth/guards';
import { Favorite } from './entity/favorite.entity';

@ApiTags('favorites')
@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({ status: 200, type: [Favorite] })
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  async findAll(@Request() req): Promise<Favorite[]> {
    const customerId = req.user.id;
    if (!customerId) {
      throw new UnauthorizedException('Customer ID not found in token');
    }
    return this.favoriteService.findAll(customerId);
  }

  @ApiOperation({ summary: 'Create favorite' })
  @ApiResponse({ status: 201, type: CreateFavoriteDto })
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  create(@Request() req, @Body() createFavoriteDto: CreateFavoriteDto) {
    const customerId = req.user.id;
    return this.favoriteService.create(createFavoriteDto, customerId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a favorite product' })
  @ApiResponse({ type: Favorite })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  async deleteCustomer(
    @Request() req,
    @Param('id') id: string,
  ): Promise<Favorite> {
    const customerId = req.user.id;
    return this.favoriteService.delete(+id, customerId);
  }
}
