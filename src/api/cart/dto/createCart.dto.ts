import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateCartDto {
  @IsOptional()
  @IsNumber()
  userId?: number;
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
