import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCustomerAddressDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsNumber()
  @IsNotEmpty()
  cityId: number;

  @IsNumber()
  @IsNotEmpty()
  districtId: number;

  @IsNumber()
  @IsNotEmpty()
  neighbourhoodId: number;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  addressTitle: string;
}
