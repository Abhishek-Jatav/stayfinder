import { IsString, IsNumber } from 'class-validator';

export class CreateListingDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  location: string;

  @IsNumber()
  price: number;

  @IsString()
  image: string;
}
