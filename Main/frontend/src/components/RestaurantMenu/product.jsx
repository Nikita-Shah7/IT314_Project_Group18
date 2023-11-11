import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/shop-context"; // Import shop context


export const Product = (props) => {
  
  // console.log(props.data);
  const [product, setProduct] = useState();
  const { addToCart, cartItems } = useContext(ShopContext); // Access the shop context
  const cartItemCount = cartItems[props.data.menu_id];

  // popup
  const [isPopupOpen, setPopupOpen] = useState(false);
  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

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
            <button className="addToCartBttn" onClick={() => addToCart(props.data.menu_id)}>
              Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
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
                  <button className="addToCartBttn" onClick={() => addToCart(props.data.menu_id)}>
                    Add to Cart
                    {cartItemCount > 0 && <> ({cartItemCount})</>}
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
