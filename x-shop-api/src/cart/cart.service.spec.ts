import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductService } from '../product/product.service';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';

describe('CartService', () => {
  let service: CartService;

  const products = [
    {
      productID: 1
    },
    {
      productID: 2
    },
    {
      productID: 3
    },
  ];

  const mockCartRepository = {
    findOne: jest.fn()
    .mockImplementationOnce(() => {
      return Promise.resolve({productID: 1})
    })
    .mockImplementationOnce(() => {
      return Promise.resolve({productID: 1, quantity: 1})
    }),
    update: jest.fn().mockReturnThis(),
    save: jest.fn().mockReturnThis(),
    find: jest.fn()
    .mockImplementationOnce(() => {
      return Promise.resolve([...products, {productID: 4}])
    })
    .mockImplementationOnce(() => {
      return Promise.resolve(products.filter(product => product.productID !== 1))
    })
  };

  const mockProductService = {
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService, ProductService,
      {
        provide: getRepositoryToken(Cart),
        useValue: mockCartRepository
      },
      {
        provide: ProductService,
        useValue: mockProductService
      }
    ],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a product into a list', async () => {
    expect(await service.addToCart({productID: 1, status: "pending"})).toEqual({
      count: products.length+1
    });
  });

  it('should remove a product from a list', async () => {
    expect(await service.removeFromCart({productID: 1})).toEqual({
      count: products.length-1
    });
  });

  it('should update a product quantity in the cart', async () => {
    expect(await service.updateCart({productID: 1})).toEqual({
      productID: 1,
      quantity: expect.any(Number)
    });
  });
});
