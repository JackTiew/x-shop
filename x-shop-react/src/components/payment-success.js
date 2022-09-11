import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import "../styles/payment.css";

const PaymentSuccess = ({setLoader}) => {

    useEffect(() => {
        const reloadCount = sessionStorage.getItem('reloadCount');
        if(reloadCount < 1) {
            sessionStorage.setItem('reloadCount', String(reloadCount+1));
            window.location.reload();
        }
        else
        {
            sessionStorage.removeItem('reloadCount');
        }
        setLoader(false);
    }, [setLoader]);

    return (
        <div className="page-container">
            <div>
                <span className="success-label">Payment Success</span>
            </div>
            <Link to="/">
                <button className="home-btn">Back to Home</button>
            </Link>
        </div>
    );
}

export default PaymentSuccess;