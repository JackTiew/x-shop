import { gql } from "@apollo/client";

export const addToCartMutation = gql`
    mutation addToCart(
        $productID: Int!
        $status: String!
    ) {
        addToCart(createCartInput:{
            productID: $productID
            status: $status
        }) {
            count
        }
    }
`;

export const removeFromCartMutation = gql`
    mutation removeFromCart(
        $productID: Int!
    ){
        removeFromCart(updateCartInput:{
            productID: $productID
        })
        {
            productID
        }
    }
`;

export const addQuantityMutation = gql`
    mutation updateCart(
        $productID: Int!
    ){
        updateCart(updateCartInput:{
            productID: $productID
            increment: true
        }) {
        quantity
    }
    }
`;

export const deductQuantityMutation = gql`
    mutation updateCart(
        $productID: Int!
    ){
        updateCart(updateCartInput:{
            productID: $productID
            decrement: true
        }) {
        quantity
    }
    }
`;

export const createStripeMutation = gql`
    mutation createStripe(
        $totalPrice: Float!
    ){
        createStripe(createStripeInput: {
            totalPrice: $totalPrice
            }) {
            paymentIntentID
            clientSecret
        }
    }
`;

export const createOrderMutation = gql`
    mutation createOrder(
        $total: Float!
        $paymentID: String!
        $orderItem: [CreateOrderItemInput!]!
    ){
        createOrder(createOrderInput:{
            total: $total
            paymentID: $paymentID
            orderItem: $orderItem
        }) {
        createdAt
        }
    }
`;

