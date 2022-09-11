import React from 'react';
import { Link } from "react-router-dom";

import "../styles/navbar.css"

const Navbar = ({cartCount}) => {
    return (
        <div className="nav-bar">
            <div className="nav-container">
                <div className="nav-home">
                    <Link className="nav-home-text" to="/">My e-shop</Link>
                </div>
                <div className="nav-cart">
                    <Link className="nav-home-text" to="/cart">
                        <span className="nav-cart-icon">
                            <i className="fas fa-shopping-cart"></i>
                        </span>
                        <span className="nav-cart-count">{cartCount}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;