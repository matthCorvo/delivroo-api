import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderStatus } from './enums/order-status.enum';
import { CreateOrderDto } from './dto/create-order.dto';
import { LatLngEntity } from './entities/LatLng.entity';
import { OrderItemEntity } from './entities/orders-items.entity';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepository: Repository<OrderItemEntity>,
    private latLngEntity: LatLngEntity,
    private orderItemEntity: OrderItemEntity,
  ) {}
  
   /**
   * Crée une nouvelle commande en utilisant les données du DTO de création et l'identifiant de l'utilisateur.
   * @param createOrderDto - Données de la commande à créer
   * @param userId - Identifiant de l'utilisateur
   * @returns La commande créée
   */
  async createOrder(createOrderDto: CreateOrderDto, userId: number): Promise<OrderEntity> {
    await this.deleteExistingOrders(userId); 
  
    const newOrder = await this.createOrderEntity(createOrderDto, userId);
    const savedOrder = await this.orderRepository.save(newOrder);
  
    await this.orderRepository.save(savedOrder);
  
    return savedOrder;
  }

   /**
   * Crée une nouvelle entité de commande en utilisant les données du DTO de création et l'identifiant de l'utilisateur.
   * @param createOrderDto - Données de la commande à créer
   * @param userId - Identifiant de l'utilisateur
   * @returns La nouvelle entité de commande
   */
  async createOrderEntity(createOrderDto: CreateOrderDto, userId: number): Promise<OrderEntity> {
    const order = new OrderEntity();
    // Mappe les propriétés du DTO vers l'entité
    order.name = createOrderDto.name;
    order.adresse = createOrderDto.adresse;
    order.totalPrice = createOrderDto.totalPrice;
    order.user = { id: userId } as UserEntity;
    order.addressLatLng = createOrderDto.addressLatLng as LatLngEntity;
  
    order.orderItems = createOrderDto.orderItems as OrderItemEntity[];
    // Enregistre la commande avec les éléments de commande mis à jour
    const updatedOrder = await this.orderRepository.save(order);

   return updatedOrder;
}


  /**
   * Supprime les commandes existantes pour un utilisateur donné avec un statut "NEW".
   * @param userId - Identifiant de l'utilisateur
   */
   private async deleteExistingOrders(userId: number): Promise<void> {
    if (!userId) {
      throw new Error('User ID is undefined');
    }
      // Supprime les commandes pour l'utilisateur donné avec un statut "NEW"
    await this.orderRepository.delete({
      user: { id: userId },
      status: OrderStatus.NEW,
    });
  }

 /**
   * Récupère la nouvelle commande en cours pour un utilisateur donné.
   * @param userId - Identifiant de l'utilisateur
   * @returns La nouvelle commande en cours
   */
  async getNewOrderForCurrentUser(userId: number): Promise<OrderEntity> {
    return this.orderRepository.findOne({
      where: { user: { id: userId }, status: OrderStatus.NEW },
    });
  }

  /**
   * Enregistre une commande dans la base de données.
   * @param order - Entité de commande à enregistrer
   * @returns La commande enregistrée
   */
  async saveOrder(order: OrderEntity): Promise<OrderEntity> {
    return this.orderRepository.save(order);
  }

  /**
   * 
   * @returns La liste de toutes les commandes
   */
  async getAllPayedOrders(): Promise<OrderEntity[]> {
    return this.orderRepository.find({ where: { status: OrderStatus.PAYED } });
  }

   /**
   * Supprime lla commande payée pour un utilisateur donné avec un statut "NEW".
   * @param id - Identifiant de la commande
   */
    async delete(id: number): Promise<void> {
     return this.orderRepository.delete( id );
    }
  

}
