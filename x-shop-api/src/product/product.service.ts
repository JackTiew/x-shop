import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrderValue, Like, Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { SearchProductInput } from './dto/search-product-input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}
  
  //Create new product
  async createProduct(createProductInput: CreateProductInput): Promise<Product> {
    return await this.productRepository.save(createProductInput);
  }

  //Get a single product
  async getProduct(id: number): Promise<Product> {
    return await this.productRepository.findOne({where:{id: id}});
  }

  //Get product list
  async getProductList(searchProduct: SearchProductInput): Promise<Product[]> {
    const query = await this.productRepository.createQueryBuilder("product").orderBy("id","ASC");

    const asc = "ASC";
    const desc = "DESC";
    // const asc:FindOptionsOrderValue = {direction: "ASC"};
    // const desc:FindOptionsOrderValue = {direction: "DESC"};
    // const ignore:FindOptionsOrderValue = {nulls: "FIRST"};

    // let query = {
    //   where: {
    //     name: null
    //   },
    //   order: {
    //     searchProduct.orderBy: searchProduct.orderDirection
    //   }
    // }    


    if(searchProduct.searchTerm)
    {
        await query.where("name Ilike :name", {name: `%${searchProduct.searchTerm}%`});
    }
    if(searchProduct.orderBy && searchProduct.orderDirection)
    {
        await query.orderBy(searchProduct.orderBy, searchProduct.orderDirection == "ASC" ? asc : desc);
    }

    return await query.getMany();
  }

  //Update product
  async updateProduct(id: number, updateProductInput: UpdateProductInput): Promise<Product> {
    await this.productRepository.update(id, updateProductInput);
    return this.getProduct(id);
  }
}
