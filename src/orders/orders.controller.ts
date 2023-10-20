import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Req,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderEntity } from './entities/order.entity';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderStatus } from './enums/order-status.enum';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/users/entities/user-roles.enum';

@Controller('orders')
@ApiTags('orders')
@ApiSecurity('JWT-auth') // Swagger api
@UseGuards(new RoleGuard(Roles.USER))
export class OrdersController {
  constructor(
    public ordersService: OrdersService,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}
 
 /**
   * Crée une nouvelle commande en utilisant les données du corps de la requête.
   * @param createOrderDto - Données de la commande à créer
   * @param req - Objet de requête Express
   * @returns La commande créée
   */
  @Post('create')
  createOrder(@Body() createOrderDto: CreateOrderDto, @Req() req: any) {
    const userId = req.user.id;
    return this.ordersService.createOrder(createOrderDto, userId);
  }
  
   /**
   * Récupère la nouvelle commande en cours pour l'utilisateur actuellement authentifié.
   */
  @Get('newOrderForCurrentUser')
  async getNewOrderForCurrentUser(@Req() req): Promise<OrderEntity> {
    const userId = req.user.id;
    return this.ordersService.getNewOrderForCurrentUser(userId);

  }

  /**
   * Marque la commande comme payée.
   * @param req - Objet de requête Express
   * @returns L'identifiant de la commande payée
   */
  @Post('pay')
  async pay(@Req() req) {
    const order = await this.ordersService.getNewOrderForCurrentUser(req.user.id);

    if (!order) {
      throw new Error('Order Not Found!');
    }

    order.paymentId = true;
    order.status = OrderStatus.PAYED;
    await this.ordersService.saveOrder(order);

    return order.id;
  }


   /**
   * Récupère les détails d'une commande en utilisant son identifiant.
   * @param id - Identifiant de la commande
   * @returns Les détails de la commande
   */
  @Get('track/:id')
  async trackOrder(@Param('id') id: number) {
    return await this.orderRepository.findOne({where: {id : id}});
  }

  
  /**
   * Récupère toutes les commandes avec le statut "PAYED".
   * @returns Un tableau de toutes les commandes payées.
   */
  @Get('payed')
  async getAllPayedOrders(): Promise<OrderEntity[]> {
    return this.ordersService.getAllPayedOrders();
  }

  /**
   * Supprime une commande payée spécifique de l'utilisateur.
   * @param userId - Identifiant de l'utilisateur
   * @param orderId - Identifiant de la commande à supprimer
   * @returns Un message indiquant que la commande payée a été supprimée.
   */
  @Delete('payed/:id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.ordersService.delete(+id);
  }
}

