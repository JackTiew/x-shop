import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { OrderService } from '../order.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { OrderItem } from '../order-item/entities/order-item.entity';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => Order)
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput): Promise<Order> {
    return this.orderService.createOrder(createOrderInput);
  }

  @ResolveField(() => [OrderItem])
  orderItem(@Parent() order: Order): Promise<OrderItem[]> {
    return this.orderService.getOrderItemListByID(order.id);
  }

  @Query(() => [Order], {name: "getOrderList"})
  getOrderList(): Promise<Order[]> {
      return this.orderService.getOrderList();
  }
}