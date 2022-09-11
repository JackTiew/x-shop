import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Cart } from 'src/cart/entities/cart.entity';
import { OrderItem } from 'src/order/order-item/entities/order-item.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @Column({type: 'decimal'})
  @Field(() => Float)
  price: number;

  @Column({nullable: true})
  @Field({nullable: true})
  image: string;

  @OneToMany(() => Cart, cart => cart.product)
  cart: Cart;

  @OneToMany(() => OrderItem, orderItem => orderItem.product)
  orderItem: OrderItem;
}
