import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { getCartCountQuery } from './graphQL/queries';

import Navbar from './components/navbar';
import ProductListing from './components/product-listing';
import CartListing from "./components/cart-listing";
import Payment from "./components/payment";
import PaymentSuccess from "./components/payment-success";
import Loader from "./components/loader";

function App() {
  const [loader, setLoader] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const {data} = useQuery(getCartCountQuery);

  useEffect(() => {
      setLoader(true);
      if(data)
      {
        setCartCount(data.getCartCount.count);
        setLoader(false);
      }
  }, [data]);

  const updateCount = (count) => {
    setCartCount(count);
  }

  return (
    <BrowserRouter>
      <Loader loader={loader}></Loader>
      <div style={{ visibility: loader ? 'hidden': 'visible'}}>
        <Navbar cartCount={cartCount}/>
        <Routes>
          <Route path="/" element={<ProductListing updateCount={updateCount} setLoader={setLoader}/>} />
          <Route path="/cart" element={<CartListing updateCount={updateCount} setLoader={setLoader}/>} />
          <Route path="/payment" element={<Payment setLoader={setLoader}/>} />
          <Route path="/payment_success" element={<PaymentSuccess setLoader={setLoader}/>} />
        </Routes>
      </div>
      
      
    </BrowserRouter>
  );
}

export default App;
