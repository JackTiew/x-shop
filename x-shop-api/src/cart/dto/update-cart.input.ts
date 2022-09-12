import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateCartInput {
    @Field(() => Int)
    productID: number;

    @Field(() => Int, {nullable: true})
    quantity?: number;

    @Field(() => String, {nullable: true})
    status?: string;

    @Field(() => Boolean, {nullable: true})
    increment?: boolean;

    @Field(() => Boolean, {nullable: true})
    decrement?: boolean;
}
