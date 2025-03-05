import { Product } from 'src/api/products/product/entity/product.entity';
import { Customer } from 'src/api/customer/entity/customer.entity';

export class Favorite {
  id: number;
  customerId: number;
  customer?: Customer;
  productId: number;
  product?: Product;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
