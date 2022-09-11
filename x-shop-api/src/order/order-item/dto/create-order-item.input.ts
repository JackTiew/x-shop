import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateOrderItemInput {
  orderID: number;
  
  @Field(() => Int)
  productID: number;

  @Field(() => Int)
  quantity: number;
}