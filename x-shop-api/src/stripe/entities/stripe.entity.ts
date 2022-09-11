import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class StripePayment {
  @Field(() => String)
  paymentIntentID: string;

  @Field(() => String)
  clientSecret: string;
}
