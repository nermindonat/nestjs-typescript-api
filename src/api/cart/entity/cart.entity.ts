import { Product } from 'src/api/products/product/entity/product.entity';
import { ProductVariant } from 'src/api/products/productVariant/entity/productVariant.entity';
import { User } from 'src/api/user/entity/user.entity';

export class Cart {
  id: number;
  userId?: number;
  user?: User;
  productId: number;
  product?: Product;
  productVariantId: number;
  productVariant?: ProductVariant;
  quantity: number;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
