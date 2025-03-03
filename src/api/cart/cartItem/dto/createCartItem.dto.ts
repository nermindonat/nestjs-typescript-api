import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateCartItemDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;
  @IsOptional()
  @IsNumber()
  productVariantId?: number;
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
