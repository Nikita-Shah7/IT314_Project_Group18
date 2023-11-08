import React, { useState } from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import { ShopContext } from "../../context/shop-context";
import { useNavigate } from "react-router-dom";
import "./Home.scss";
import image1 from "./a-food-on-darke-0-1.png";

function Shop() {
  
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts = PRODUCTS
    ? PRODUCTS.filter(
        (product) =>
          (selectedCategory === "All" ||
            product.category.toLowerCase() ===
              selectedCategory.toLowerCase()) && // Filter by category
          product.productName &&
          product.productName.toLowerCase().includes(searchInput.toLowerCase())
      )
    : [];

  const productCategories = [
    ...new Set(PRODUCTS.map((product) => product.category.toLowerCase())),
  ];

  const navigate = useNavigate();

  return (
    <>

      <div className="main-container">
        <div className="uppercontainer">
          <h1>Our Menu</h1>
          <div className="text-wrapper-11">Order Online is easy</div>
          <img className="a-food-on-darke" src={image1} />
        </div>

        <div className="middle-container">
          <h1>Shop Information</h1>
          <p className="text1">
            The restaurants in Hangzhou also catered to many northern Chinese who had fled south from Kaifeng during the while it is also known that many restaurants were run by families formerly from Kaifeng.
          </p>
        </div>

        <div className="bottom-container">
          <div className="container-row">
            <div className="searchbar">
              <input
                type="text"
                placeholder="Search products"
                value={searchInput}
                onChange={handleSearchChange}
              />
            </div>
            <div className="label">
              <label htmlFor="category">Filter by Category:</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="All">All</option>
                {productCategories.map((category) => (
                  <option key={category} value={category}>
                    {" "}
                    {category}{" "}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="scroll-container">
            <div className="product-list">
              {filteredProducts.length === 0 ? (
                <p>No items found</p>
              ) : (
                filteredProducts.map((product) => (
                  <Product key={product.id} data={product} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default Shop;
