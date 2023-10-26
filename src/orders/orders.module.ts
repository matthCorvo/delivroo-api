import { MiddlewareConsumer, Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrderItemEntity } from './entities/orders-items.entity';
import { LatLngEntity } from './entities/LatLng.entity';
import { FoodEntity } from '../food/entities/food.entity';
import { UserEntity } from '../users/entities/user.entity';
import { JwtMiddleware } from '../auth/middleware/jwt.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      OrderItemEntity,
      LatLngEntity,
      FoodEntity,
      UserEntity,
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, LatLngEntity, OrderItemEntity],
  exports: [OrdersService],
})
export class OrdersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('orders');
  }
}
