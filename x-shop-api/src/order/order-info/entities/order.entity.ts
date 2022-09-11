import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { OrderItem } from '../../order-item/entities/order-item.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity("order_info")
export class Order {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({type: 'decimal'})
  @Field(() => Float)
  total: number;

  @Column()
  @Field(() => String)
  paymentID: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date)
  createdAt: Date;

  @OneToMany(() => OrderItem, orderItem => orderItem.order)
  orderItem: OrderItem[];
}
