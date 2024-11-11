import { Injectable, NotFoundException } from '@nestjs/common';
import { DBService } from 'src/database/DB.service';
import { CreateProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private readonly DBService: DBService) {}

  async findAll() {
    const list = await this.DBService.product.findMany();
    return list;
  }

  async create(payload: CreateProductDto, image: string) {
    const product = await this.DBService.product.create({
      data: {
        name: payload.name,
        description: payload.description,
        price: payload.price,
        image: image,
      },
    });

    await Promise.all(
      payload.variantValueIds.map(async (variantValueId) => {
        await this.DBService.productVariant.create({
          data: {
            productId: product.id,
            variantValueId,
          },
        });
      }),
    );

    return product;
  }

  async findProductById(id: number) {
    const item = await this.DBService.product.findUnique({
      where: {
        id,
      },
      include: {
        productVariants: {
          include: {
            variantValue: true,
          },
        },
      },
    });
    if (!item) {
      throw new NotFoundException('Product not found');
    }
    return item;
  }
}
