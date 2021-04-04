import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
// import StripeCheckout from "./StripeCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);  //empty array
  const [reload, setReload] = useState(false);
  

  useEffect(() => {
    setProducts(loadCart());  
  }, [reload]);

  const loadAllProducts = () => {
    return (
      <div>
        <h2>This section is to load products</h2>
        {products.map((product, index) => (    //maping all one by one
          <Card
          key={index}
          product={product}
          removeFromCart={true}
          addtoCart={false}
          setReload={setReload}
          reload={reload}
          />  //calling card.js **we have to send all the values**
        ))}
      </div>
    );
  };
  const loadCheckout = () => {
    return (
      <div>
        <h2>This section for checkout</h2>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center">
        <div className="col-6">{loadAllProducts()}</div>
        <div className="col-6">Checkout Section</div>
      </div>
    </Base>
  );
};

export default Cart;
