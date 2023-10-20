import { OrderItemEntity } from '../../orders/entities/orders-items.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

@Entity({ name: 'food' })
export class FoodEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column()
  imageUrl: string;

  @Column()
  description: string;

    // Relation "Un aliment a plusieurs éléments de commande"
  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.food)
  orderItems: OrderItemEntity[];

}
