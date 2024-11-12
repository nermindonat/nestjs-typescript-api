import {
  Body,
  Controller,
  Get,
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
  async findAll(@Request() req): Promise<Favorite[]>  {
    const userId = req.user.userId;
    if (!userId) {
      throw new UnauthorizedException('User ID not found in token');
    }
    return this.favoriteService.findAll(userId);
  }

  @ApiOperation({ summary: 'Create favorite' })
  @ApiResponse({ status: 201, type: CreateFavoriteDto })
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  create(@Request() req, @Body() createFavoriteDto: CreateFavoriteDto) {
    const userId = req.user.userId;
    return this.favoriteService.create(createFavoriteDto, userId);
  }
}
