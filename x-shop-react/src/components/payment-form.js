import React from 'react';
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { createOrderMutation } from "../graphQL/mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const PaymentForm = ({paymentIntentID, total, cartList, setLoader}) => {
    let navigate = useNavigate();
    
    const stripe = useStripe();
    const elements = useElements();

    const confirmPay = async () => {
        setLoader(true);
        if (!stripe || !elements) {
            return;
        }
    
        const result = await stripe.confirmPayment({
            elements,
               redirect: "if_required"
           });

        if (result.error) {
            console.log(result.error.message);
        }
        else
        {
            completeOrder();
        }
    }

    const [createOrder, {error}] = useMutation(createOrderMutation, {onCompleted: () => {navigate("/payment_success");}});

    const completeOrder = () => {
        let orderItemList = [];
        cartList.forEach(
            product => {
                orderItemList.push({
                    productID: product.productID,
                    quantity: product.quantity
                });
            }
        );
        createOrder({
            variables: {
                total: total,
                paymentID: paymentIntentID,
                orderItem: orderItemList
            }
        })

        if(error) {
            console.log(error);
        }
    }

    return (
        <div className="payment-form" style={{width: "400px"}}>
            <div className="payment-label">Payment Form</div>
            <PaymentElement />
            <button className="pay-btn" onClick={() => confirmPay()}>Pay</button>
        </div>
    )
}

export default PaymentForm;