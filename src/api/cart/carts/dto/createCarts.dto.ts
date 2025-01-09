import { IsNumber, IsOptional } from 'class-validator';

export class CreateCartsDto {
  @IsOptional()
  @IsNumber()
  userId?: number;
}
