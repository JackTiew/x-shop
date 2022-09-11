import React, { useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from "react-router-dom";
import PaymentForm from "./payment-form";
import "../styles/payment.css";

const stripePromise = loadStripe('pk_test_51LfiGFGsHyBbiC36PubhmhB20Lanz0NUkYfrzdVuBUSmumhksA7r9sJMAQP2RmffJAy9CjectuZqkMGIIlPls17e00UpbLRzyX');

const Payment = ({setLoader}) => {

    const { state } = useLocation();
    const { clientSecret, paymentIntentID, total, cartList } = state;
    const options = {clientSecret};

    useEffect(() => {
        setLoader(false);
    }, [setLoader]);

    return (
        <Elements stripe={stripePromise} options={options}>
            <PaymentForm paymentIntentID={paymentIntentID} total={total} cartList={cartList} setLoader={setLoader}/>
        </Elements>
    );
}

export default Payment;