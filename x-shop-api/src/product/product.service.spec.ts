import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

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

  function compareByName( a, b ) {
    if ( a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name ){
      return 1;
    }
    return 0;
  }

  
  const createQueryBuilder: any = {
    orderBy: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    getMany: jest.fn()
    .mockImplementationOnce(() => {
      return products
    })
    .mockImplementationOnce(() => {
      return products.filter(product => product.name.includes("03"))
    })
    .mockImplementationOnce(() => {
      return products.sort(compareByName)[0]
    })
    .mockImplementationOnce(() => {
      return products.sort(compareByName).reverse()[0]
    })
  }

  const mockProductRepository = {
    save: jest.fn().mockImplementation(product => Promise.resolve({id: Math.floor(Math.random() * 101), ...product})),
    createQueryBuilder: jest.fn(() => (createQueryBuilder)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, {
        provide: getRepositoryToken(Product),
        useValue: mockProductRepository
      }],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new product and return that', async () => {
    expect(await service.createProduct({
      name: "Product 01",
      price: 1.1,
      image: null
    })).toEqual(
      {
        id: expect.any(Number),
        name: "Product 01",
        price: 1.1,
        image: null
      }
    );
  });

  it('should return a product list', async () => {
    expect(await service.getProductList({})).toEqual(products);
  });

  it('should return a filtered product list', async () => {
    expect(await service.getProductList({searchTerm: "03"})).toEqual(
      [
        {
          id: expect.any(Number),
          name: "Product 03",
          price: 3.3
        }
      ]
    );
  });

  it('should return a sorted product list', async () => {
    expect(await service.getProductList({orderBy: "name", orderDirection: "ASC"})).toEqual(
      {
        id: 1,
        name: "Product 01",
        price: 1.1
      }
    );
  });

  it('should return a reverse sorted product list', async () => {
    expect(await service.getProductList({orderBy: "name", orderDirection: "DESC"})).toEqual(
      {
        id: 5,
        name: "Product 05",
        price: 5.5
      }
    );
  });
});
