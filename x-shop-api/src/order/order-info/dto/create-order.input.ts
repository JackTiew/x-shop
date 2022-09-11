import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { CreateOrderItemInput } from '../../order-item/dto/create-order-item.input';

@InputType()
export class CreateOrderInput {
  @Field(() => Float)
  total: number;

  @Field(() => String)
  paymentID: string;

  @Field(() => [CreateOrderItemInput])
  orderItem: CreateOrderItemInput[];
}
