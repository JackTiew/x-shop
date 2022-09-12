import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Order } from '../../order-info/entities/order.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../../product/entities/product.entity';

@ObjectType()
@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => Int)
  orderID: number;

  @Column()
  @Field(() => Int)
  productID: number;

  @Column()
  @Field(() => Int)
  quantity: number;

  @ManyToOne(() => Order, order => order.orderItem)
  @JoinColumn({ name: "orderID" })
  order: Order;

  @ManyToOne(() => Product, product => product.orderItem)
  @JoinColumn({name:"productID"})
  product: Product;
}
