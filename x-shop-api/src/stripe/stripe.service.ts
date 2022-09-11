import { Injectable } from '@nestjs/common';
import { CreateStripeInput } from './dto/create-stripe.input';
import Stripe from 'stripe';
import { StripePayment } from './entities/stripe.entity';
@Injectable()
export class StripeService {
  private stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET,{
      apiVersion: '2022-08-01'
    })
  }

  async createPaymentIntent(createStripeInput: CreateStripeInput) {
    var paymentIntent = await this.stripe.paymentIntents.create( {
      amount: createStripeInput.totalPrice * 100, //amount in cents
      currency: 'MYR',
      payment_method_types: ['card']
    })

    var paymentIntentObj: StripePayment = {
      paymentIntentID: paymentIntent.id,
      clientSecret: paymentIntent.client_secret
    }

    return paymentIntentObj;
  }
}
