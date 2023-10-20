import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateFoodDto } from './create-food.dto';
import { IsString, IsInt } from 'class-validator';

export class UpdateFoodDto extends PartialType(CreateFoodDto) {
  @ApiProperty()
  @IsString()
  name: string;
  
  @ApiProperty()
  @IsInt()
  price: number;

  @ApiProperty()
  @IsString()
  imageUrl: string;

  @ApiProperty()
  @IsString()
  description: string;
}
