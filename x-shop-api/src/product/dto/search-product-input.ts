import { Field, InputType } from '@nestjs/graphql';
import { FindOptionsOrderValue } from 'typeorm';

@InputType()
export class SearchProductInput {
    @Field(() => String, {nullable: true})
    searchTerm?: string;

    @Field(() => String, {nullable: true})
    orderBy?: string;

    @Field(() => String, {nullable: true})
    orderDirection?: string;
}