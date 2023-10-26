import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FoodEntity } from '../../food/entities/food.entity';

@Entity({ name: 'order_items' })
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0  })
  public price: number;

  @Column('integer', { nullable: true })
  public quantity: number;

  // Relation "Un commandes a plusieurs éléments de food")
  @ManyToOne(() => FoodEntity, (food) => food.orderItems)
  @JoinColumn()
  food: FoodEntity;


}
