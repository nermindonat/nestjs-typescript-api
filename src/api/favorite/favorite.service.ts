import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

  async delete(id: number, userId: number) {
    const item = await this.DBService.favorite.findUnique({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException(`Favorite product with ID ${id} not found`);
    }
    if (item.userId !== userId) {
      throw new UnauthorizedException(
        'You do not have permission to delete this favorite',
      );
    }
    await this.DBService.favorite.delete({
      where: { id },
    });
    return item;
  }
}
