import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Cart {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id?: number;

    @Column()
    @Field(() => Int)
    productID?: number;

    @Column()
    @Field(() => Int)
    quantity?: number;

    @Column()
    @Field(() => String)
    status?: string;

    @ManyToOne(() => Product, product => product.cart)
    @JoinColumn({name:"productID"})
    product?: Product;

    @Field(() => Int)
    count?: number;
}
