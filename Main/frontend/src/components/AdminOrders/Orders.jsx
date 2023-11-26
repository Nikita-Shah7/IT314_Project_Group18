import React from 'react';
import './orders.css';

const PRODUCTS = [
    {
      "orderID": 1,
      "TableNo": 4,
      "OrderItems": [
        {"item": "Burger", "quantity": 2},
        {"item": "Fries", "quantity": 1},
        {"item": "Soda", "quantity": 3}
      ],
      "Time": "2023-11-27T12:30:00Z"
    },
    {
      "orderID": 2,
      "TableNo": 2,
      "OrderItems": [
        {"item": "Pizza", "quantity": 1},
        {"item": "Salad", "quantity": 2},
        {"item": "Ice Cream", "quantity": 1}
      ],
      "Time": "2023-11-27T13:15:00Z"
    },
    {
      "orderID": 3,
      "TableNo": 6,
      "OrderItems": [
        {"item": "Steak", "quantity": 1},
        {"item": "Mashed Potatoes", "quantity": 2},
        {"item": "Wine", "quantity": 1}
      ],
      "Time": "2023-11-27T14:00:00Z"
    },
    {
      "orderID": 4,
      "TableNo": 1,
      "OrderItems": [
        {"item": "Pasta", "quantity": 1},
        {"item": "Garlic Bread", "quantity": 2},
        {"item": "Cappuccino", "quantity": 1}
      ],
      "Time": "2023-11-27T14:45:00Z"
    },
    {
      "orderID": 5,
      "TableNo": 5,
      "OrderItems": [
        {"item": "Fish Tacos", "quantity": 2},
        {"item": "Guacamole", "quantity": 1},
        {"item": "Margarita", "quantity": 3}
      ],
      "Time": "2023-11-27T15:30:00Z"
    },
    {
      "orderID": 6,
      "TableNo": 3,
      "OrderItems": [
        {"item": "Sushi", "quantity": 1},
        {"item": "Edamame", "quantity": 1},
        {"item": "Green Tea", "quantity": 2}
      ],
      "Time": "2023-11-27T16:15:00Z"
    },
    {
      "orderID": 7,
      "TableNo": 8,
      "OrderItems": [
        {"item": "Chicken Curry", "quantity": 1},
        {"item": "Naan Bread", "quantity": 3},
        {"item": "Lassi", "quantity": 1}
      ],
      "Time": "2023-11-27T17:00:00Z"
    },
    {
      "orderID": 8,
      "TableNo": 7,
      "OrderItems": [
        {"item": "Burrito", "quantity": 2},
        {"item": "Chips and Salsa", "quantity": 1},
        {"item": "Soft Drink", "quantity": 2}
      ],
      "Time": "2023-11-27T17:45:00Z"
    },
    {
      "orderID": 9,
      "TableNo": 10,
      "OrderItems": [
        {"item": "Ramen", "quantity": 1},
        {"item": "Gyoza", "quantity": 4},
        {"item": "Bubble Tea", "quantity": 1}
      ],
      "Time": "2023-11-27T18:30:00Z"
    },
    {
      "orderID": 10,
      "TableNo": 9,
      "OrderItems": [
        {"item": "Tandoori Chicken", "quantity": 1},
        {"item": "Rice Pilaf", "quantity": 2},
        {"item": "Mango Lassi", "quantity": 1}
      ],
      "Time": "2023-11-27T19:15:00Z"
    }
];

const Orders = () => {
  return (
    <div className="container">
      <h1 style={{color: '#942D2D'}}>Order Details</h1>
      <div className="orders">
        {PRODUCTS.map((order) => (
          <div className="order" key={order.orderID}>
            <div className='flextable'>
            <h3>Order #{order.orderID}</h3>
            <p style={{'marginLeft': '37%', 'fontWeight':'bold'}}>Table No: {order.TableNo}</p>
            </div>
            {order.OrderItems.map((item, index) => (
              <div key={index} className='itemflex'>
                <div>
                <p>Quantity: {item.quantity}</p>
                </div>
                <div style={{'marginLeft':'10%'}}>
                <p>Item: {item.item}</p>
                </div>
              </div>
            ))}
            <div className='forflex'>
            <p className="date">{order.Time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;