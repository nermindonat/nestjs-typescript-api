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

  async findAll(customerId: number) {
    return await this.DBService.favorite.findMany({
      where: {
        customerId: customerId,
      },
      include: {
        product: true,
      },
    });
  }

  async create(payload: CreateFavoriteDto, customerId: number) {
    return await this.DBService.favorite.create({
      data: {
        customerId,
        productId: payload.productId,
      },
    });
  }

  async delete(id: number, customerId: number) {
    const item = await this.DBService.favorite.findUnique({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException(`Favorite product with ID ${id} not found`);
    }
    if (item.customerId !== customerId) {
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
