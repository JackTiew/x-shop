import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { ProductListingOutput } from './dto/product-listing.output';
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
  async getProductList(searchProduct: SearchProductInput): Promise<ProductListingOutput> {
    const query = await this.productRepository.createQueryBuilder("product").orderBy("id","ASC");

    const asc = "ASC";
    const desc = "DESC";

    //If contains search term, filter by name
    if(searchProduct.searchTerm)
    {
        await query.where("name Ilike :name", {name: `%${searchProduct.searchTerm}%`});
    }
    //If contain orderBy and orderDirection, sort products
    if(searchProduct.orderBy && searchProduct.orderDirection)
    {
        await query.orderBy(searchProduct.orderBy, searchProduct.orderDirection == "ASC" ? asc : desc);
    }

    const pageCount = Math.ceil((await query.getMany()).length / searchProduct.dataLimit);
    //Offset need to minus 1 from current page number
    const offSet = ((searchProduct.pageIndex - 1) * searchProduct.dataLimit);

    await query.offset(offSet);
    await query.limit(searchProduct.dataLimit);

    const productList:ProductListingOutput = {
      productList: await query.getMany(),
      pageCount: pageCount
    }

    return productList;
  }

  //Update product
  async updateProduct(id: number, updateProductInput: UpdateProductInput): Promise<Product> {
    await this.productRepository.update(id, updateProductInput);
    return this.getProduct(id);
  }
}
