import { Product } from '../../product/entity/product.entity';
import { VariantValue } from '../../variantValue/entity/variantValue.entity';

export class ProductVariant {
  id: number;
  productId: number;
  product?: Product;
  variantValueId: number;
  variantValue?: VariantValue;
}
