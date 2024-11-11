import { ProductVariant } from '../../productVariant/entity/productVariant.entity';
import { Variant } from '../../variant/entity/variant.entity';

export class VariantValue {
  id: number;
  variantId: number;
  variant?: Variant;
  value: string;
  productVariants?: ProductVariant[];
}
