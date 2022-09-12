import { Resolver, Query, Mutation, Args, ResolveField, Parent, Int } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { CreateCartInput } from './dto/create-cart.input';
import { UpdateCartInput } from './dto/update-cart.input';
import { Product } from '../product/entities/product.entity';

@Resolver(() => Cart)
export class CartResolver {
    constructor(private cartService: CartService) {}

    @Mutation(() => Cart)
    addToCart(@Args('createCartInput') cart: CreateCartInput): Promise<Cart> {
        return this.cartService.addToCart(cart);
    }
    
    @Query(() => [Cart], {name: "getCartList"})
    getCartList(): Promise<Cart[]> {
        return this.cartService.getCartList();
    }

    @Query(() => Cart, {name: "getCartCount"})
    getCartCount(): Promise<Cart> {
        return this.cartService.getCartCount();
    }

    @Mutation(() => Cart)
    updateCart(@Args('updateCartInput') cart: UpdateCartInput): Promise<Cart> {
        return this.cartService.updateCart(cart);
    }

    @ResolveField(() => Product)
    product(@Parent() cart: Cart): Promise<Product> {
        return this.cartService.getProduct(cart.productID);
    }

    @Mutation(() => Cart)
    removeFromCart(@Args('updateCartInput') cart: UpdateCartInput): Promise<Cart> {
        return this.cartService.removeFromCart(cart);
    }
}
