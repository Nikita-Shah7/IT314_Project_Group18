import React, { useEffect, useState } from "react";
import { cartItems as cartItemsAxios } from "../AxiosCreate";
import { cart as cartAxios } from "../AxiosCreate";
import { toast } from "react-toastify";
import '@fortawesome/fontawesome-free/css/all.css';

import "./CartItem.css"; // Import your custom CSS for CartItem

export const CartItem = (props) => {
  const [loading, setLoading] = useState(true);
  const { table_id, menu_name, item_price, item_profit } = props.item;
  const [quan, setQuan] = useState(props.item.quantity);

  useEffect(() => {
    const func = async () => {
      if (quan === 0) {
        setQuan(1);
      } else {
        let data = { ...props.item,
          "quantity": quan,
          "total_price": item_price * quan,
          "total_profit": item_profit * quan,
          "date_time": new Date().toISOString()
        };

        await cartItemsAxios.put(`/`, data)
          .then((response) => {
            setLoading(false);
          })
          .catch((error) => {
            console.log("ERROR MESSAGE ::", error);
            setLoading(false);
          });

        await cartAxios.get(`/${localStorage.getItem("table_id")}`)
          .then((response) => {
            setLoading(false);
            props.setTotalBillAmt([response.data.data][0].total_bill_amount);
            props.setTotalBillProfit([response.data.data][0].total_bill_profit);
          })
          .catch((error) => {
            console.log("ERROR MESSAGE ::", error);
            setLoading(false);
          });
      }
    };
    func();
  }, [quan, props.item, item_price, item_profit, props.setTotalBillAmt, props.setTotalBillProfit]);

  const deleteCartItem = async () => {
    await cartItemsAxios.delete(`${table_id}/${menu_name}`)
      .then((response) => {
        props.setCartItemsCnt(props.cartItemsCnt - 1);
        setLoading(false);
        if (response.status === 200) {
          toast.success("Item removed from Cart");
        }
      })
      .catch((error) => {
        console.log("ERROR MESSAGE ::", error);
        setLoading(false);
        toast.success("Item can't be removed from Cart because of a database error.");
      });
  };

  return (
    <div className="cartItem">
      <div className="description">
        <p className="itemname">{menu_name}</p>
        <p className="item2"> Item Price: ₹{item_price}</p>
        <p className="item2"> Total Item Price: ₹{item_price * quan}</p>
      </div>
      <div className="countHandler">
        <button className="btn" onClick={() => setQuan(quan - 1)}>
          -
        </button>
        <input value={quan} readOnly />
        <button className="btn" onClick={() => setQuan(quan + 1)}>
          +
        </button>
        <button className="btn" onClick={deleteCartItem}>
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );
};
