import { IsString, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateFoodDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'le nom ne peut pas être vide.' })
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'le prix ne doit pas être vide' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message:
        'Le prix doit être un nombre et une précision décimale maximale 2'
    }
  )
  @IsPositive()
  price: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'url ne peut pas être vide.' })
  @IsString()
  imageUrl: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'description ne peut pas être vide.' })
  @IsString()
  description: string;
}
