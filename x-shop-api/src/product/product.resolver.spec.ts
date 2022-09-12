import { Test, TestingModule } from '@nestjs/testing';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

describe('ProductResolver', () => {
  let resolver: ProductResolver;

  const products = [
    {
      id: 1,
      name: "Product 01",
      price: 1.1
    },
    {
      id: 2,
      name: "Product 02",
      price: 2.2
    },
    {
      id: 3,
      name: "Product 03",
      price: 3.3
    },
    {
      id: 4,
      name: "Product 04",
      price: 4.4
    },
    {
      id: 5,
      name: "Product 05",
      price: 5.5
    },
  ];

  const mockProductService = {
    getProduct: jest.fn( dto=> {
      return {
        id: Math.floor(Math.random() * 101),
        ...dto
      }
    }),
    getProductList:jest.fn(() => {
      return products;
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductResolver, ProductService],
    })
    .overrideProvider(ProductService)
    .useValue(mockProductService)
    .compile();

    resolver = module.get<ProductResolver>(ProductResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should retrieve a product', () => {
    const productID = 1;

    expect(resolver.getProduct(productID)).toEqual(
      {
        id: expect.any(Number)
      }
    );

    expect(mockProductService.getProduct).toHaveBeenCalled();
    expect(mockProductService.getProduct).toHaveBeenCalledWith(productID);
  });

  it('should retrieve a product list', () => {
    expect(resolver.getProductList({})).toEqual(
      products
    );

    expect(mockProductService.getProductList).toHaveBeenCalled();
  });
});
