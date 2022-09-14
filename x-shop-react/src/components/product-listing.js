import React, { useEffect, useState } from 'react';
import { useQuery } from "@apollo/client";
import Select from "react-select";
import ReactPaginate from "react-paginate";

import { getProductListQuery } from '../graphQL/queries';
import Product from './product';
import Search from './search';
import "../styles/product-listing.css";

const ProductListing = ({updateCount, setLoader}) => {
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [selectedPage, setSelectedPage] = useState(0);
    const itemsPerPage = 4;

    const {data, refetch} = useQuery(getProductListQuery, {variables: {searchTerm: null, orderBy: null, orderDirection: null, pageIndex: 1, dataLimit: itemsPerPage}});
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        setLoader(true);
        if(data)
        {
            setProducts(data.getProductList.productList);
            setCurrentItems(data.getProductList.productList);
            setPageCount(data.getProductList.pageCount);
            setLoader(false);
        }
    }, [data, setLoader, selectedPage]);
    
    const searchProducts = (searchTerm) => {
        refetch({searchTerm: searchTerm});
        setSelectedPage(0);
    }

    const sortProduct = (sortOption) => {
        switch(sortOption.value)
        {
            case "Default": refetch({orderBy: null, orderDirection: null});
            break;
            case "Name A-Z" : refetch({orderBy: "name", orderDirection: "ASC"});
            break;
            case "Name Z-A" : refetch({orderBy: "name", orderDirection: "DESC"});
            break;
            case "Price Low - High" : refetch({orderBy: "price", orderDirection: "ASC"});
            break;
            case "Price High - Low" : refetch({orderBy: "price", orderDirection: "DESC"});
            break;
            default:
        }
    }

    const options = [
        {value: 'Default', label: 'Default' },
        {value: 'Name A-Z', label: 'Name A-Z' },
        {value: 'Name Z-A', label: 'Name Z-A' },
        {value: 'Price Low - High', label: 'Price Low - High' },
        {value: 'Price High - Low', label: 'Price High - Low' },
    ]
    
    const handlePageClick = (event) => {
        setLoader(true);
        refetch({pageIndex: event.selected+1});
        setSelectedPage(event.selected);
        setLoader(false);
    };

    return (
        <div style={{marginTop:"30px"}}>
            <Search searchProducts={searchProducts}/>
            <div className="react-select">
                <div style={{marginBottom:"5px"}}>Sort By</div>
                <Select options={options} defaultValue={options[0]} onChange={(choice) => sortProduct(choice)}/>
            </div>

            <div className={products.length > 0 ? "listing-container" : "listing-container-empty"}>
                {
                    products.length > 0 ?
                    (
                        currentItems.map((product) => (
                            <Product key={product.id} product={product} updateCount={updateCount} setLoader={setLoader}/>
                        ))
                    ):
                    (
                        <div className="empty">
                            <span>No data found</span>
                        </div>
                    )
                }
            </div>

            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName="page-num"
                previousLinkClassName="page-num"
                nextLinkClassName="page-num"
                activeClassName="active"
                forcePage={selectedPage}
            />
        </div>
    )
}

export default ProductListing;