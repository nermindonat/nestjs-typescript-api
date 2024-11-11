import { VariantValue } from '../../variantValue/entity/variantValue.entity';

export class Variant {
  id: number;
  name: string;
  values: VariantValue[];
}
