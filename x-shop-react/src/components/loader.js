import React from "react";
import "../styles/loader.css";
import { BallTriangle } from "react-loader-spinner";

const Loader = ({loader}) => {
    return (
        <div className="loading-screen">
            <div className="loading-icon" style={{ visibility: loader ? 'visible': 'hidden'}}>
                <BallTriangle height="100" width="100" color="#183153" aria-label="Loading"></BallTriangle>
            </div>
        </div>
    )
}

export default Loader;