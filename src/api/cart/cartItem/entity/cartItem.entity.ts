import { Product } from 'src/api/products/product/entity/product.entity';
import { Carts } from '../../carts/entity/carts.entity';
import { ProductVariant } from 'src/api/products/productVariant/entity/productVariant.entity';

export class CartItem {
  id: number;
  cartId?: number;
  cart?: Carts;
  productId: number;
  product?: Product;
  productVariantId: number;
  productVariant?: ProductVariant;
  quantity: number;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
