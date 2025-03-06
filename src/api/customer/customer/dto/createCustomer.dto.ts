import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;
}
