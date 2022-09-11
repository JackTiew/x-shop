import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCartInput {
    @Field(() => Int)
    productID: number;

    @Field(() => String)
    status: string;
}