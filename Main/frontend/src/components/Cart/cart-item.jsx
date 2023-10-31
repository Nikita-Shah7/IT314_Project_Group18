import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const CartItem = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);

  return (
    <div className="cartItem">
      <img src={productImage} />
      <div style={{width: '60%', float:'left'}} className="description">
        <p>
          <b style={{marginTop: '50%'}} className="itemname">{productName}</b>
        </p>
        <p> Price: ₹{price}</p>
      </div>
      <div style={{width: '40%', float:'right'}} className="countHandler">
          <button onClick={() => removeFromCart(id)}> - </button>
          <input
            value={cartItems[id]}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
          />
          <button onClick={() => addToCart(id)}> + </button>
        </div>
    </div>
  );
};
