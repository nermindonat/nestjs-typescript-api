import { IsNotEmpty, IsString } from "class-validator";

export class UpdateCustomerDto {
    @IsNotEmpty()
    @IsString()
    email: string;
    @IsString()
    password: string;
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsString()
    surname: string;
    @IsString()
    country: string;
    @IsString()
    province: string;
}