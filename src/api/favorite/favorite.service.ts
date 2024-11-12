import { Injectable } from '@nestjs/common';
import { DBService } from 'src/database/DB.service';
import { CreateFavoriteDto } from './dto';

@Injectable()
export class FavoriteService {
  constructor(private readonly DBService: DBService) {}

  async findAll(userId: number) {
    return await this.DBService.favorite.findMany({
      where: {
        userId: userId,
      },
      include: {
        product: true,
      },
    });
  }

  async create(payload: CreateFavoriteDto, userId: number) {
    return await this.DBService.favorite.create({
      data: {
        userId,
        productId: payload.productId,
      },
    });
  }
}
