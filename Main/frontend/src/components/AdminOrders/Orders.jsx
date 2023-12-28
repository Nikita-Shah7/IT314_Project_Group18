import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import './orders.css';
import { cartItems as cartItemsAxios } from "../AxiosCreate";
import { cart as cartAxios } from "../AxiosCreate";
import Loader from '../Loader/Loader';

const Orders = () => {

   // console.log("nik in admin orders");
   const navigate = useNavigate();
   if(!localStorage.getItem("isAdminAuth")) {
       navigate('/adminlogin');
   }
  const [loading, setLoading] = useState(true)
  const [totalBillAmt, setTotalBillAmt] = useState(0);
  // const [totalBillProfit, setTotalBillProfit] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  // const [cartItemsCnt, setCartItemsCnt] = useState(0);

  useEffect(() => {
    // console.log("nik in cart useeffect1");
    const func = async () => {
      await cartItemsAxios.get(`/`)
        .then((response) => {
          console.log([response.data.data][0])

          // Group items by table_id
          const items = [response.data.data][0];
          const groupedItems = items.reduce((grouped, item) => {
            if (!grouped[item.table_id]) {
              grouped[item.table_id] = [];
            }
            grouped[item.table_id].push(item);
            return grouped;
          }, {});

          console.log(groupedItems);
          // setCartItemsCnt([response.data.count][0])
          setCartItems(groupedItems);
          setLoading(false);
        })
        .catch((error) => {
          console.log("ERROR MESSAGE ::", error)
          setLoading(false);
        });

      await cartAxios.get(`/`)
        .then((response) => {
          console.log([response.data.data][0])
          const totalBillData = [response.data.data][0]

          // Creating a map with table_id -> total_bill_amount
          const tableIdToBillAmtMap = {};
          totalBillData.forEach(item => {
            tableIdToBillAmtMap[item.table_id] = item.total_bill_amount;
          });

          console.log(tableIdToBillAmtMap);
          setTotalBillAmt(tableIdToBillAmtMap);
          setLoading(false)
        })
        .catch((error) => {
          console.log("ERROR MESSAGE ::", error)
          setLoading(false);
        });
    }
    func();
  }, []);


  return (
    <div className="container">
      <h1 style={{ color: '#942D2D' }}>Order Details</h1>
      {loading ? (
        <Loader /> // Show loader while data is being fetched
      ) : (
      <div className="orders">
        {Object.entries(cartItems).map(([tableId, orders]) => (
          <>
          <div className="order" key={tableId}>
            <div className='flextable'>
              <h3>Table #{tableId}</h3>
            </div>
            <div key={tableId} className='itemflex'>
              <div>
                <h5>Menu_Item</h5>
              </div>
              <div>
                <h5>Quantity</h5>
              </div>
              <div>
                <h5>Item_Price</h5>
              </div>
              <div>
                <h5>Total_Price</h5>
              </div>
            </div>
            {orders.map((order, index) => (
              <div key={index} className='itemflex'>
                <div>
                  <span>{order.menu_name}</span>
                </div>
                <div>
                  <span>{order.quantity}</span>
                </div>
                <div>
                  <span>{order.item_price}</span>
                </div>
                <div>
                  <span>{order.total_price}</span>
                </div>
              </div>
            ))}
            <h4 className='totalBillAmt'>{totalBillAmt[tableId]}</h4>
          </div>
          </>
        ))}
      </div>)}
    </div>
  );

};

export default Orders;