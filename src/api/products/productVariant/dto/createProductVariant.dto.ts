import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductVariantDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  variantValueId: number;
}
