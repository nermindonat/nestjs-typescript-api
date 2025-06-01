import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCustomerAddressDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  surname?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsNumber()
  @IsOptional()
  cityId?: number;

  @IsNumber()
  @IsOptional()
  districtId?: number;

  @IsNumber()
  @IsOptional()
  neighbourhoodId?: number;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  addressTitle?: string;
}
