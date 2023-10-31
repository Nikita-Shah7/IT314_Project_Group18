import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "../../products";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";

import "./Cart.scss";
function Cart() {
  const { cartItems, getTotalCartAmount, checkout , getTaxAmount, getTotal} = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const taxAmount = getTaxAmount();
  const total = getTotal();

  const navigate = useNavigate();

  return (
    <div style={{backgroundColor: '#EBF2D5'}}>
      <div className="foodcart">
        <h1>Food Cart</h1>
      </div>
    <div className="cart1">
      <div style={{width: '70%', float:'right'}} className="flex1">
      <div className="cart">
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem data={product} />;
          }
        })}
      </div>
      </div>
      <div style={{width: '30%', float:'right'}} className="flex2">
      {totalAmount > 0 ? (
        <div className="checkout">
          <div className = 'totals'>
          <div className="flexrow">
            <div style={{marginTop: '35px'}}>Subtotal:</div>
            <div style={{marginLeft: '160px', marginTop: '35px'}}>  ₹{totalAmount} </div>
          </div>
          <div className="flexrow">
            <div>Tax:</div>
            <div style={{marginLeft: '186px'}}>  ₹{taxAmount} </div>
          </div>
          <div className="flexrow">
            <div>Total:</div>
            <div style={{marginLeft: '175px'}}>  ₹{total} </div>
          </div>
          </div>
          <div className='checkingout'>
          <button onClick={() => navigate("/")}> Menu </button>
          <button style={{marginLeft: '30px'}}
            onClick={() => {
              checkout();
              navigate("/checkout");
            }}
          >
            {" "}
            Checkout{" "}
          </button>
          </div>
        </div>
      ) : (
        <h1 style={{color: '#942D2D'}}> Your Shopping Cart is Empty</h1>
      )}
    </div>
    </div>
    </div>
  );
};

export default Cart;

