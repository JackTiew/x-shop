import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from './order-item/entities/order-item.entity';
import { Repository } from 'typeorm';
import { CreateOrderInput } from './order-info/dto/create-order.input';
import { Order } from './order-info/entities/order.entity';
import { CreateOrderItemInput } from './order-item/dto/create-order-item.input';
import { Product } from 'src/product/entities/product.entity';
import { ProductService } from 'src/product/product.service';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    private readonly productService: ProductService,
    private readonly cartService: CartService
  ) {}

  async createOrder(createOrderInput: CreateOrderInput): Promise<Order> {
    const order = await this.orderRepository.save(createOrderInput);

    createOrderInput.orderItem.forEach(
      orderItem=>{
        orderItem.orderID = order.id;
      }
    );

    await this.createOrderItem(createOrderInput.orderItem);
    await this.cartService.completeCart(createOrderInput.orderItem);
    return order;
  }

  async createOrderItem(createOrderItem: CreateOrderItemInput[]): Promise<OrderItem[]> {
    return await this.orderItemRepository.save(createOrderItem);
  }

  async getOrderItemListByID(id: number): Promise<OrderItem[]> {
    return await this.orderItemRepository.find({where:{orderID: id}});
  }

  //Get all items in cart
  async getOrderList(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  //Get order list child product
  async getProduct(productID: number): Promise<Product> {
    return await this.productService.getProduct(productID);
  }

  async getOrderItemList(): Promise<OrderItem[]> {
    return await this.orderItemRepository.find();
  }
}
