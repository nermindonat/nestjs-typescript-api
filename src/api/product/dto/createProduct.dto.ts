import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Express } from 'express';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  price: number;
  @IsOptional()
  imagePath?: Express.Multer.File;
}
