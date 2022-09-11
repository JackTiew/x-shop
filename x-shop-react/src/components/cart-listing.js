import React, { useEffect, useState } from 'react';
import { useQuery } from "@apollo/client";
import { removeFromCartMutation, addQuantityMutation, deductQuantityMutation, createStripeMutation } from "../graphQL/mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import CartProduct from './cart-product';
import { getCartListQuery } from '../graphQL/queries';
import "../styles/cart.css"

const CartListing = ({updateCount, setLoader}) => {
    let navigate = useNavigate();

    const {data, refetch} = useQuery(getCartListQuery);
    const [cartList, setCartList] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setLoader(true);
        if(data)
        {
            var sum = 0;
            updateCount(data.getCartList.length);
            data.getCartList.forEach(
              product=> {
                sum = Number(sum) + Number(product.quantity * product.product.price);
              }  
            );
            setCartList(data.getCartList);
            setTotal(sum);
            setLoader(false);
        }
    }, [data, setLoader]);

    useEffect(() => {
        setLoader(true);
        const reloadCount = sessionStorage.getItem('reloadCount');
        if(reloadCount < 1) {
            sessionStorage.setItem('reloadCount', String(reloadCount+1));
            window.location.reload();
        }
        else
        {
            sessionStorage.removeItem('reloadCount');
        }
    }, []);

    const [removeFromCart, {removeFromCartError}] = useMutation(removeFromCartMutation, {onCompleted: () => {refetch();}});
    const [addQuantity, {addQuantityError}] = useMutation(addQuantityMutation, {onCompleted: () => {refetch();}});
    const [deductQuantity, {deductQuantityError}] = useMutation(deductQuantityMutation, {onCompleted: () => {refetch();}});
    const [createStripe, {createStripeError}] = useMutation(createStripeMutation, {onCompleted: (data) => {createOrder(data);}});

    const removeFromCartClick = (id) => {
        setLoader(true);
        removeFromCart({
            variables: {
                productID: id
            }
        })

        if(removeFromCartError) {
            console.log(removeFromCartError);
        }
    }

    const addQuantityClick = (id) => {
        setLoader(true);
        addQuantity({
            variables: {
                productID: id
            }
        })

        if(addQuantityError) {
            console.log(addQuantityError);
        }
    }

    const deductQuantityClick = (id) => {
        setLoader(true);
        deductQuantity({
            variables: {
                productID: id
            }
        })

        if(deductQuantityError) {
            console.log(deductQuantityError);
        }
    }

    const createStripeClick = () => {
        setLoader(true);
        createStripe({
            variables: {
                totalPrice: total
            }
        })

        if(createStripeError) {
            console.log(createStripeError);
        }
    }

    const createOrder = (data) => {
        const {clientSecret, paymentIntentID} = data.createStripe;
        navigate("/payment", { state: { clientSecret: clientSecret, paymentIntentID: paymentIntentID, total: total, cartList: cartList } });
    }

    return (
        <div className="cartListing">
            <div className="cart-header">
                <span>
                    <i className="cart-icon fas fa-shopping-cart"></i>
                    Shopping Cart
                </span>
            </div>
                {
                    cartList.length > 0 ? 
                    (
                        cartList.map((product) => (
                            <CartProduct key={product.productID}
                            product={product.product}
                            quantity={product.quantity}
                            removeFromCartClick={removeFromCartClick}
                            addQuantityClick={addQuantityClick}
                            deductQuantityClick={deductQuantityClick}/>
                        ))
                    )
                    :
                    (
                        <div className="empty">
                            <span>Your cart is empty</span>
                        </div>
                    )                    
                }
                <div>
                {
                    cartList.length > 0 ?
                        <div>
                            <div className="cart-product-container" style={{height: "50px"}}>
                                <div className="total-label">
                                    <span>TOTAL</span>
                                </div>
                                <div className="total-price">
                                    <span>RM {total.toFixed(2)}</span>
                                </div>
                            </div>
                            <div>
                                <button className="checkout-btn" onClick={() => createStripeClick()}>
                                    Checkout
                                </button>
                            </div>
                        </div>
                    : null
                }
            </div>
        </div>
    );
};

export default CartListing;