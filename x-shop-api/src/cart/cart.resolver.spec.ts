import { Test, TestingModule } from '@nestjs/testing';
import { CartResolver } from './cart.resolver';
import { CartService } from './cart.service';

describe('CartResolver', () => {
  let resolver: CartResolver;

  const mockCartService = {

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartResolver, CartService],
    })
    .overrideProvider(CartService)
    .useValue(mockCartService)
    .compile();

    resolver = module.get<CartResolver>(CartResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
