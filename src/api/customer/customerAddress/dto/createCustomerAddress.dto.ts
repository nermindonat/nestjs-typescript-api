import { IsNotEmpty, IsString } from 'class-validator';

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

  @IsString()
  @IsNotEmpty()
  cityId: string;

  @IsString()
  @IsNotEmpty()
  districtId: string;

  @IsString()
  @IsNotEmpty()
  neighbourhoodId: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  addressTitle: string;
}
