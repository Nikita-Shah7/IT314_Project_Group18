import React, { useState } from "react";
import axios from "axios";


export const Product = (props) => {
  
  // console.log(props.data);
  const [loading, setLoading] = useState(true)

  // popup
  const [isPopupOpen, setPopupOpen] = useState(false);
  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  const addToCart = async() => {
    let data = {};
    data = {
      "table_id": parseInt(localStorage.getItem("table_id")),
      "menu_name": String(props.data.menu_name),
      "quantity": 1,
      "item_price": props.data.price,
      "total_price": props.data.price,
      "item_profit": props.data.profit,
      "total_profit": props.data.profit,
      "date_time": new Date().toISOString()
    }
    // console.log(data)
    await axios.post(`http://localhost:5555/cart_items`,data)
    .then( (response) => {
      setLoading(false)
    })
    .catch( (error) => {
      console.log("ERROR MESSAGE ::", error)
      setLoading(false);
    });
  }

  return (
    <div>
      <div className="individual-product" key={props.data.menu_id}>
        <img
          className="product-image"
          src={"data:image/jpg;base64," + props.data.img}
          alt={props.data.menu_name}
          onClick={togglePopup}
        />{" "}
        <div className="description">
          <p style={{ marginTop: "5px" }}>
            <b>{props.data.menu_name}</b>
          </p>
          <p style={{ marginTop: "1px", marginBottom: "5px" }}>₹{props.data.price}</p>
        </div>
        { !localStorage.getItem("table_id") ?(<></>) :
          (<div className="cartbutton">
            <button className="addToCartBttn" onClick={() => addToCart()}>
              Add To Cart
            </button>
          </div>)
        }
      </div>

      {isPopupOpen && (
        <div className="popup-container">
          <div className="popup">
            <div className="popup-content ">
              <div className="popup-image">
                <img src={"data:image/jpg;base64," + props.data.img} alt={props.data.menu_name} />
              </div>
              <div className="popup-sidebar">
                <h2>{props.data.menu_name}</h2>
                <p>{props.data.description}</p>
                <h3>
                  <b>Price : ₹{props.data.price}</b>
                </h3>
              </div>
            </div>
            <div className="popup-bottom">
              { !localStorage.getItem("table_id") ? (<></>) :
                (<div>
                  <button className="addToCartBttn" onClick={() => addToCart()}>
                    Add to Cart
                  </button>
                </div>)
              }
              <div>
                <button className="popupbutton" onClick={togglePopup}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
