import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Express } from 'express';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  description?: string;
  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  price: number;
  @IsOptional()
  image?: Express.Multer.File;
}
