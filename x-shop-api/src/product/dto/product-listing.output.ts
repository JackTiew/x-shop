import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from '../entities/product.entity';

@ObjectType()
export class ProductListingOutput {
  @Field(() => [Product])
  productList: Product[];

  @Field(() => Int)
  pageCount: number;
}
