import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVariantDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
