import React from "react";
import { useState } from "react";
import "../styles/search.css";

const Search = ({searchProducts}) => {

    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="search-container">
            <input placeholder="Search for products" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => {if(e.key === 'Enter') searchProducts(searchTerm)} }/>
            <span onClick={() => searchProducts(searchTerm)}>
                <i className="fas fa-search"></i>
            </span>
        </div>
    )
}

export default Search;