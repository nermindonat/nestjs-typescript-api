import { Product } from 'src/api/products/product/entity/product.entity';
import { Carts } from '../../carts/entity/carts.entity';

export class CartItem {
  id: number;
  cartId?: number;
  cart?: Carts;
  productId: number;
  product: Product;
  quantity: number;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
