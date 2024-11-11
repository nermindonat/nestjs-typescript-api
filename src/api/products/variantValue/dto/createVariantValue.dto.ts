import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateVariantValueDto {
  @IsNotEmpty()
  @IsNumber()
  variantId: number;

  @IsNotEmpty()
  @IsString()
  value: string;
}
