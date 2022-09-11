import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    name: string;

    @Field(() => Float)
    price: number;

    @Field(() => String, {nullable: true})
    image: string;
}
