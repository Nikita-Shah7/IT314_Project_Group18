import React, { useState } from "react";
import { cartItems as cartItemsAxios } from "../AxiosCreate";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './RestaurantMenu.scss';
import ButtonComponent from "../Button/ButtonComponent";


export const Product = (props) => {

  // console.log(props.data);
  const [loading, setLoading] = useState(true)
  const [isPopupOpen, setPopupOpen] = useState(false);
  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  const addToCart = async () => {
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

    await cartItemsAxios.post(`/`, data)
      .then((response) => {
        setLoading(false);
        if (response.status === 201) {
          toast.success("Item added to Cart");
        }
      })
      .catch((error) => {
        // console.log("ERROR MESSAGE ::", error)
        setLoading(false);
        toast.error("Item is already added in the cart.");
      });
  }


  return (
    <div>
      <div className="individual-product" key={props.data.menu_id}>
        <div className="image-container">
          <img
            className="product-image"
            src={props.data.img}
            alt={props.data.menu_name}
            onClick={togglePopup}
          />
        </div>
        <div className="product-description">
            <b>{props.data.menu_name}</b>
            <p>₹{props.data.price}</p>
        </div>
        {!localStorage.getItem("table_id") ? (<></>) : (
            <ButtonComponent color={"button4"} message={"Add to Cart"} func={addToCart} />
          )
        }
      </div>

      {isPopupOpen && (
        <div className="popup-container">
          <div className="popup">
            <div className="popup-content ">
              <div className="popup-image-container">
                {/* <img src={"data:image/jpg;base64," + props.data.img} alt={props.data.menu_name} /> */}
                <img src={props.data.img} alt={props.data.menu_name} />
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
              {!localStorage.getItem("table_id") ? (<></>) :
                (<ButtonComponent color={"primary"} message={"Add to Cart"} func={addToCart} />)
              }
              <ButtonComponent color={"secondary"} message={"Close"} func={togglePopup} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
