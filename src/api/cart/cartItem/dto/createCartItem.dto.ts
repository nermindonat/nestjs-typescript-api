import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCartItemDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;
  @IsNotEmpty()
  @IsNumber()
  productVariantId: number;
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
