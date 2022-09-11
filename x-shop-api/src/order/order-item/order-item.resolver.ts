import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { OrderService } from '../order.service';
import { OrderItem } from './entities/order-item.entity';
import { Product } from 'src/product/entities/product.entity';

@Resolver(() => OrderItem)
export class OrderItemResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query(() => [OrderItem], {name: "getOrderItemList"})
  getOrderItemList(): Promise<OrderItem[]> {
      return this.orderService.getOrderItemList();
  }

  @ResolveField(() => Product)
  getProduct(@Parent() orderItem: OrderItem): Promise<Product> {
    return this.orderService.getProduct(orderItem.productID);
  }
}