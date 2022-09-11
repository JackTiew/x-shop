import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateStripeInput {
  @Field(() => Float)
  totalPrice: number;
}
