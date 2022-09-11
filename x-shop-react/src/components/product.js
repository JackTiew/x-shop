import React from "react";
import { addToCartMutation } from "../graphQL/mutations";
import { useMutation } from "@apollo/client";

const Product = ( {product, updateCount, setLoader} ) => {
    const { id, name, image, price} = product;

    const [addToCart, {error}] = useMutation(addToCartMutation, {
        onCompleted: (data) => {
            updateCount(data.addToCart.count);
            setLoader(false);
        }
    });

    const addToCartClick = (id) => {
        setLoader(true);
        addToCart({
            variables: {
                productID: id,
                status: "pending"
            }
        })

        if(error) {
            console.log(error);
        }
    }

    return (
        <div className="product-container">
            <div className="product-image-box">
                <img src={image} alt=""/>
            </div>
            <div className="product-info">
                <p className="product-name">{name}</p>
                <p className="product-price">RM {price.toFixed(2)}</p>
            </div>
            <div className="buy-btn-container">
                <button className="buy-btn" onClick={() => addToCartClick(id)}>BUY</button>
            </div>
        </div>
    );
}

export default Product;