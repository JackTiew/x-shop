import React from "react";

const CartProduct = ({product, quantity, removeFromCartClick, addQuantityClick, deductQuantityClick}) => {
    const {id, name, price, image} = product;

    return (
        <div className="cart-product-container">
            <div className="cart-product-image-container">
                <img className="cart-product-image" src={image} alt=""/>
            </div>
            <div className="cart-product-name">
                <p>{name}</p>
            </div>
            <div className="cart-product-price-container">
                <div className="cart-product-price">
                    <p>RM {price.toFixed(2)}</p>
                </div>
            </div>
            <div className="cart-product-adjust-container">
                <button className="cart-product-adjust-btn" onClick={() => deductQuantityClick(id)}>-</button>
                <div className="cart-product-qty-count">{quantity}</div>
                <button className="cart-product-adjust-btn" onClick={() => addQuantityClick(id)}>+</button>
            </div>
            <div className="cart-product-total">
                <p>RM {(quantity * price).toFixed(2)}</p>
            </div>
            <div className="cart-remove-btn">
                <p onClick={() => removeFromCartClick(id)}>Remove</p>
            </div>
        </div>
    )
}

export default CartProduct;