import { OrderItemDto } from './order-item.dto';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../enums/order-status.enum';
import { LatLngDto } from './latlng.dto';

export class CreateOrderDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ enum: OrderStatus })
  status: OrderStatus;

  @ApiProperty()
  totalPrice: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  adresse: string;

  @ApiProperty()
  paymentId!: string;

  @ApiProperty()
  addressLatLng: LatLngDto;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  orderItems: OrderItemDto[];
}