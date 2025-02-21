import { IsNumber } from 'class-validator';

export class UpdateCartItemDto {
  @IsNumber()
  quantity: number;
}
