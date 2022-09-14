import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SearchProductInput {
    @Field(() => String, {nullable: true})
    searchTerm?: string;

    @Field(() => String, {nullable: true})
    orderBy?: string;

    @Field(() => String, {nullable: true})
    orderDirection?: string;

    @Field(() => Int)
    pageIndex: number;

    @Field(() => Int)
    dataLimit: number;
}