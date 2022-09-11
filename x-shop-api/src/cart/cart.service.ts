import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderItemInput } from 'src/order/order-item/dto/create-order-item.input';
import { Product } from 'src/product/entities/product.entity';
import { ProductService } from 'src/product/product.service';
import { MoreThan, Repository } from 'typeorm';
import { CreateCartInput } from './dto/create-cart.input';
import { UpdateCartInput } from './dto/update-cart.input';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
    
    constructor(
      @InjectRepository(Cart)
      private readonly cartRepository: Repository<Cart>,
      private readonly productService: ProductService
    ) {}

    //Add to cart
    async addToCart(cart: CreateCartInput): Promise<Cart> {
        const product = await this.cartRepository.findOne({where:{productID: cart.productID, status: "pending"}});

        //Product exist
        if(product)
            await this.cartRepository.update({productID: product.productID, status: "pending"}, {quantity: product.quantity+1});
        //If product not exist
        else
            await this.cartRepository.save({...cart,quantity: 1});
        return await this.getCartCount();
    }

    //Get all items in cart
    async getCartList(): Promise<Cart[]> {
        return await this.cartRepository.find({where:{status: "pending", quantity: MoreThan(0)}, order:{id: "ASC"}});
    }

    //Update cart
    async updateCart(cart: UpdateCartInput) {
        const product = await this.cartRepository.findOne({where:{productID: cart.productID, status: "pending"}});
        
        if(!product)
            throw new NotFoundException();

        //Handle quantity
        if(cart.increment != null || cart.decrement != null)
        {
            if(cart.increment)
                product.quantity++;
            else
                product.quantity--;

            await this.cartRepository.update({productID: product.productID, status: "pending"}, {quantity: product.quantity});
            if(product.quantity == 0)
            {
                await this.cartRepository.delete({productID: product.productID, status: "pending"});
            }
        }
        return product;
    }

    //Get cart list child product
    async getProduct(productID: number): Promise<Product> {
        return await this.productService.getProduct(productID);
    }

    //Get items count in cart
    async getCartCount(): Promise<Cart> {
        var cart:Cart = {
            count: await (await this.cartRepository.find({where:{status: "pending", quantity: MoreThan(0)}})).length
        }
        return cart;
    }

    //Update all purchase product to paid
    async completeCart(productList: CreateOrderItemInput[]): Promise<void> {
        productList.forEach(
            product=> {
                this.cartRepository.update({productID: product.productID, status: "pending"}, {status: "paid"});
            }
        );
    }

    //Remove from cart
    async removeFromCart(product: UpdateCartInput): Promise<Cart> {
        await this.cartRepository.update({productID: product.productID, status: "pending"}, {quantity: 0});
        return product;
    }
}
