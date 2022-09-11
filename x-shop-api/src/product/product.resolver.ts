import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { SearchProductInput } from './dto/search-product-input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  createProduct(@Args('createProductInput') createProductInput: CreateProductInput): Promise<Product> {
    return this.productService.createProduct(createProductInput);
  }

  @Query(() => [Product], { name: 'getProductList' })
  getProductList(@Args('param') searchProduct: SearchProductInput): Promise<Product[]> {
    return this.productService.getProductList(searchProduct);
  }

  @Query(() => Product, { name: 'getProduct' })
  getProduct(@Args('id', { type: () => Int }) id: number): Promise<Product> {
    return this.productService.getProduct(id);
  }

  @Mutation(() => Product)
  updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductInput): Promise<Product> {
    return this.productService.updateProduct(updateProductInput.id, updateProductInput);
  }
}
