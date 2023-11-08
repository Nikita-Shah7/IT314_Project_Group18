import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/shop-context"; // Import shop context

export const Product = (props) => {
  const { id, productName, price, productImage, description, category } =
    props.data;
  const { addToCart, cartItems } = useContext(ShopContext); // Access the shop context
  const cartItemCount = cartItems[id];

  // popup
  const [isPopupOpen, setPopupOpen] = useState(false);
  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  return (
    <div>
      <div className="individual-product" key={id}>
        <img
          className="product-image"
          src={productImage}
          alt={productName}
          onClick={togglePopup}
        />{" "}
        <div className="description">
          <p style={{ marginTop: "5px" }}>
            <b>{productName}</b>
          </p>
          <p style={{ marginTop: "1px", marginBottom: "5px" }}>₹{price}</p>
        </div>
        <div className="cartbutton">
          <button className="addToCartBttn" onClick={() => addToCart(id)}>
            Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
          </button>
        </div>
      </div>

      {isPopupOpen && (
        <div className="popup-container">
          <div className="popup">
            <div className="popup-content ">
              <div className="popup-image">
                <img src={productImage} alt={productName} />
              </div>
              <div className="popup-sidebar">
                <h2>{productName}</h2>
                <p>{description}</p>
                <h3>
                  <b>Price : ₹{price}</b>
                </h3>
              </div>
            </div>
            <div className="popup-bottom">
              <div>
                <button className="addToCartBttn" onClick={() => addToCart(id)}>
                  Add to Cart
                  {cartItemCount > 0 && <> ({cartItemCount})</>}
                </button>
              </div>
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
