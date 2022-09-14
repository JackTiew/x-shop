import { gql } from "@apollo/client";

export const getProductListQuery = gql`
    query getProductList(
        $searchTerm: String
        $orderBy: String
        $orderDirection: String
        $pageIndex: Int!
        $dataLimit: Int!
    ){
        getProductList(param:{
            searchTerm: $searchTerm
            orderBy: $orderBy
            orderDirection: $orderDirection
            pageIndex: $pageIndex
            dataLimit: $dataLimit
        }) {
            pageCount
            productList {
                id
                name
                price
                image
            }
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