import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order-info/order.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order-info/entities/order.entity';
import { OrderItem } from './order-item/entities/order-item.entity';
import { ProductModule } from 'src/product/product.module';
import { OrderItemResolver } from './order-item/order-item.resolver';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order,OrderItem]), ProductModule, CartModule
  ],
  providers: [OrderResolver, OrderItemResolver, OrderService]
})
export class OrderModule {}
