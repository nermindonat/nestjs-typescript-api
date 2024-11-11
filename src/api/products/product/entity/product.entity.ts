import { ProductVariant } from '../../productVariant/entity/productVariant.entity';

export class Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  productVariants?: ProductVariant[];
  image?: string;
}
