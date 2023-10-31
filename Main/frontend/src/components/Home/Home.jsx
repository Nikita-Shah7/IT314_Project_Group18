import React from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import "./Home.scss";

function Shop() {
  return (
    <div className="shop">
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
