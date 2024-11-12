import { Product } from 'src/api/products/product/entity/product.entity';
import { User } from 'src/api/user/entity/user.entity';

export class Favorite {
  id: number;
  userId: number;
  user?: User;
  productId: number;
  product?: Product;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
