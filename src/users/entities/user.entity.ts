import { OrderEntity } from '../../orders/entities/order.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from './user-roles.enum';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  adresse: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // Rôle de l'utilisateur (par défaut: USER)
  @Column({ type: 'enum', enum: Roles, array: true, default: [Roles.USER] })
  role: Roles[];

  // Relation "OneToMany" avec l'entité "OrderEntity"
  @OneToMany(() => OrderEntity, (order) => order.user )
  order: OrderEntity[];

}
