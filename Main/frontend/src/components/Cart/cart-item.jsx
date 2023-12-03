import React, { useEffect, useState } from "react";
import { cartItems as cartItemsAxios } from "../AxiosCreate";
import { cart as cartAxios } from "../AxiosCreate";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const CartItem = (props) => {
  // console.log(props.data)
  const [loading, setLoading] = useState(true);
  const { table_id, menu_name, item_price } = props.item;
  const [quan, setQuan] = useState(props.item.quantity);
  // console.log("nik in cart-items", quan, props.item.quantity)
  let quantity = quan;

  useEffect( () => {
    const func = async() => {
      if(quan == 0) {      
        setQuan(1);
      } else {
        let data = {};
        data = props.item
        data = {...data, 
          "quantity": quan, 
          "total_price": data.item_price*quan,
          "total_profit": data.item_profit*quan,
          "date_time": new Date().toISOString()
        };
  
        await cartItemsAxios.put(`/`,data)
        .then( (response) => {          
          setLoading(false)
        })
        .catch( (error) => {
          console.log("ERROR MESSAGE ::", error)
          setLoading(false);
        });

        await cartAxios.get(`/${localStorage.getItem("table_id")}`)
        .then( (response) => {
          setLoading(false)
          // console.log([response.data.data][0])
          props.setTotalBillAmt([response.data.data][0].total_bill_amount);
          props.setTotalBillProfit([response.data.data][0].total_bill_profit);
        })
        .catch( (error) => {
          console.log("ERROR MESSAGE ::", error)
          setLoading(false);
        });
      }
    }
    func();
  },[quan, loading]);


  const deleteCartItem = async() => {
    // console.log(menu_name);
    await cartItemsAxios.delete(`${table_id}/${menu_name}`)
    .then( (response) => {
      props.setCartItemsCnt(props.cartItemsCnt-1);      
      setLoading(false);
      if (response.status === 200) {
        toast.success("Item removed from Cart");
      } 

    })
    .catch( (error) => {
      console.log("ERROR MESSAGE ::", error)
      setLoading(false);
      toast.success("Item can't be removed from Cart because of database error.");
    });
  }

  return (
    <div className="cartItem">
      <img src="" />
      <div style={{width: '60%', float:'left'}} className="description">
        <p>
          <b style={{marginTop: '50%'}} className="itemname">{menu_name}</b>
        </p>
        <h5> Item Price: ₹{item_price}</h5>
        <p> Total Item Price: ₹{item_price*quantity}</p>
      </div>
      <div style={{width: '40%', float:'right'}} className="countHandler">
          <button onClick={() => setQuan(quan-1)}> - </button>
          <input
            value={quantity}
          />
          <button onClick={() => setQuan(quan+1)}> + </button>
          <button onClick={deleteCartItem}>x</button>
        </div>
    </div>
  );
};