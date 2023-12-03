import React, { useEffect, useState } from "react";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";

import "./Cart.scss";
import { cartItems as cartItemsAxios } from "../AxiosCreate";
import { cart as cartAxios } from "../AxiosCreate";
import {RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET} from '../../config';
import Automn_logo from "../../assets/Automn_logo.png"


function Cart() {
  const [loading, setLoading] = useState(true)
  const [totalBillAmt, setTotalBillAmt] = useState(0);
  const [totalBillProfit, setTotalBillProfit] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCnt, setCartItemsCnt] = useState(0);

  const navigate = useNavigate();
  
  useEffect( () => {
    // console.log("nik in cart useeffect1");
    const func = async() => {
      if(!localStorage.getItem("table_id")) {
        navigate("/");
      }
      await cartItemsAxios.get(`cart_table/${localStorage.getItem("table_id")}`)
      .then( (response) => {
        setLoading(false)
        // console.log([response.data.data][0])
        setCartItemsCnt([response.data.count][0])
        setCartItems([response.data.data][0])
      })
      .catch( (error) => {
        console.log("ERROR MESSAGE ::", error)
        setLoading(false);
      });
    }
    func();
  },[cartItemsCnt]);

  useEffect( () => {
    // console.log("nik in cart useeffect2");
    const func = async() => {
      await cartAxios.get(`/${localStorage.getItem("table_id")}`)
        .then( (response) => {
          setLoading(false)
          // console.log([response.data.data][0])
          setTotalBillAmt([response.data.data][0].total_bill_amount);
          setTotalBillProfit([response.data.data][0].total_bill_profit);
        })
        .catch( (error) => {
          console.log("ERROR MESSAGE ::", error)
          setLoading(false);
        });
    }
    func();
  },[totalBillAmt, totalBillProfit, cartItemsCnt]);

  useEffect( () => {
    // console.log("nik in empty useeffect");
  },[]);

  const handleCheckout = (e) => {
    e.preventDefault();
    console.log("nik in payment")
    if (totalBillAmt === "") {
        alert("Please enter amount");
    }
    else {
        var options = {
            key: RAZORPAY_KEY_ID,
            key_secret: RAZORPAY_KEY_SECRET,
            amount: totalBillAmt * 100,
            currency: "INR",
            name: "Nik Pay",
            description: "Pay Nik",
            image: Automn_logo,
            handler: function (response) {
              console.log("nik in payment....success!!")
              console.log(response)
              console.log("razorpay_payment_ID:: ",response.razorpay_payment_id)
              alert("Payment Successful!!");
              navigate("/feedback");
            },
            timeout: 120,   // pop up closes after 2min
            prefill: {
                name: "Nik",
                email: "",
                contact: ""
            },
            notes: {
                address: "",
            },
            theme: {
                color: "#942D2D",
            }
        };
        var pay = new window.Razorpay(options);
        pay.open();
    }
}

  return (
    <div style={{backgroundColor: '#EBF2D5'}}>
      <div className="foodcart">
        <h1>Food Cart</h1>
      </div>
    <div className="cart1">
      <div style={{width: '70%', float:'right'}} className="flex1">
      <div className="cart">
        {cartItems.map( (product) => {
            return <CartItem key={product.menu_name} item={product} 
              cartItemsCnt={cartItemsCnt} 
              setCartItemsCnt={setCartItemsCnt} 
              totalBillAmt={totalBillAmt} 
              setTotalBillAmt={setTotalBillAmt}
              totalBillProfit={totalBillProfit}
              setTotalBillProfit={setTotalBillProfit} />;
        })}
      </div>
      </div>
      <div style={{width: '30%', height: '50vh', float:'right'}} className="flex2">
      {cartItems.length > 0 ? (
        <div className="checkout">
          <div className = 'totals'>
          <div className="flexrow">
            <div style={{marginTop: '35px'}}>Subtotal:</div>
            <div style={{marginLeft: '160px', marginTop: '35px'}}>  ₹{totalBillAmt} </div>
          </div>
          <div className="flexrow">
            <div>Tax(5%):</div>
            <div style={{marginLeft: '186px'}}>  ₹{totalBillAmt*0.05} </div>
          </div>
          <div className="flexrow">
            <div>Total:</div>
            <div style={{marginLeft: '175px'}}>  ₹{totalBillAmt*1.05} </div>
          </div>
          </div>
          <div className='checkingout'>
          <button onClick={() => navigate("/menu")}> Menu </button>
          <button style={{marginLeft: '30px'}}
            // onClick={handleCheckout}
            onClick={handleCheckout}
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

