import React from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
function Shop() {
  const navigate = useNavigate();
  return (
    <div className="shop">

      <div>
        <button onClick={()=>navigate('/mycart')}> Cart </button>
      </div>
      <div className="shopTitle">
        <h1>Restaurant Menu</h1>
      </div>

      <div className="products">
        {PRODUCTS.map((product) => (
          <Product data={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
