import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';
import { CreateFoodDto } from 'src/food/dto/create-food.dto';

export class OrderItemDto {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  quantity: number;


  @ApiProperty()
  food: CreateFoodDto;
}