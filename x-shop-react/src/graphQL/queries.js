import { gql } from "@apollo/client";

export const getProductListQuery = gql`
    query getProductList(
        $searchTerm: String
        $orderBy: String
        $orderDirection: String
    ){
        getProductList(param:{
            searchTerm: $searchTerm
            orderBy: $orderBy
            orderDirection: $orderDirection
        }) {
            id
            name
            price
            image
        }
    }
`;

export const getCartCountQuery = gql`
    query {
        getCartCount {
            count
        }
    }
`;

export const getCartListQuery = gql`
    query {
        getCartList {
            id
            productID
            quantity
            product {
                id
                name
                price
                image
            }
        }   
    }
`;