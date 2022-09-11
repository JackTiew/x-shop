# x-shop
Welcome to X-Shop!

## Setup requirement<br>
Node: v16.15.0<br>
NPM: 8.5.5<br>
Nest: 9.1.2<br>
Apollo Client: 10.1.0<br>
GraphQL: 16.0.0<br>
TypeORM: 0.3.9<br>
Database: PostgreSQL with ElephantSQL<br>
Port running: 4000

Before running this project, PLEASE RUN `npm install` in according directory!!!<br>
To run x-shop-api(Backend)<br>
>cd x-shop-api<br>
>npm run start:dev<br>
<br>

There are 4 main modules in backend:<br>
1. Product<br>
2. Cart<br>
3. Order<br>
4. Stripe<br>

The data relationship between them are:<br>
**ONE** order has **MANY** order item<br>
**ONE** order item belongs to **ONE** order<br>
**ONE** order item has **ONE** product<br>
**ONE** product belongs to **ONE** order item<br>
**ONE** cart has **MANY** products<br>
**ONE** product belongs to **ONE** cart<br>
<br>
There are 9 GraphQL queries/mutation will be used in frontend:<br>
#### Queries
1. getProductListQuery: This query is to get all the product list, with optional param of searchTerm(To search products by name) and orderBy+orderDirection set(To sort products)<br>
2. getCartCountQuery: This query is use to get currency cart count group by product.<br>
3. getCartListQuery: This query is to get all the products in a cart.
<br><br>
#### Mutations
1. addToCartMutation: This mutation is use when click on BUY button in product list page.<br>
2. removeFromCartMutation: This mutation is use to remove the product from cart.<br>
3. addQuantityMutation: This mutation is use to update selected product quantity by adding 1.<br>
4. deductQuantityMutation: This mutation is use to update selected product quantity by minus 1.<br>
5. createStripeMutation: This mutation is use to create stripe payment intent for payment purpose.<br>
6. createOrderMutation: This mutation is use to insert order and order item.
