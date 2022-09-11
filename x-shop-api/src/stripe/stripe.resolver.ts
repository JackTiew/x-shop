import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { StripeService } from './stripe.service';
import { StripePayment } from './entities/stripe.entity';
import { CreateStripeInput } from './dto/create-stripe.input';

@Resolver(() => StripePayment)
export class StripeResolver {
  constructor(private readonly stripeService: StripeService) {}

  @Mutation(() => StripePayment)
  createStripe(@Args('createStripeInput') createStripeInput: CreateStripeInput): Promise<StripePayment> {
    return this.stripeService.createPaymentIntent(createStripeInput);
  }
}
