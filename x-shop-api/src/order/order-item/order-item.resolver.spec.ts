import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../order.service';
import { OrderItemResolver } from './order-item.resolver';

describe('OrderItemResolver', () => {
  let resolver: OrderItemResolver;

  const orderItemService = {
    
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderItemResolver, OrderService],
    })
    .overrideProvider(OrderService)
    .useValue(orderItemService)
    .compile();

    resolver = module.get<OrderItemResolver>(OrderItemResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
