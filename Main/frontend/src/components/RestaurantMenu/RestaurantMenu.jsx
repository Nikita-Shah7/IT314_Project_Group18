import React, { useState, useEffect } from "react";
import { Product } from "./product";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './RestaurantMenu.scss';
import image1 from "./a-food-on-darke-0-1.png";

function RestaurantMenu() {

  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:5555/menu`)
      .then((response) => {
        // console.log([response.data][0].data)
        setProducts([response.data][0].data)
        setLoading(false);
      })
      .catch((error) => {
        console.log("ERROR MESSAGE ::", error)
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:5555/category`)
      .then((response) => {
        // console.log([response.data][0].data)
        setCategories([response.data][0].data)
        setLoading(false);
      })
      .catch((error) => {
        console.log("ERROR MESSAGE ::", error)
        setLoading(false);
      });
  }, []);

  useEffect( () => {
    console.log(selectedCategory);
    axios.get(`http://localhost:5555/menu/category/${selectedCategory}`)
      .then( (response) => {
        // console.log([response.data][0].data);
        setProducts([response.data][0].data)
        setLoading(false)
      })
      .catch( (error) => {
        console.log("ERROR MESSAGE ::", error)
        setLoading(false);
      });
  },[selectedCategory]);

  useEffect( () => {
    console.log(selectedCategory);
    axios.get(`http://localhost:5555/menu/search/${searchInput}`)
      .then( (response) => {
        console.log([response.data][0].data);
        setProducts([response.data][0].data)
        setLoading(false)
      })
      .catch( (error) => {
        console.log("ERROR MESSAGE ::", error)
        setLoading(false);
      });
  },[searchInput]);

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleCategoryChange = (event) => {
      setSelectedCategory(event.target.value);
  };

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
            The restaurants in Hangzhou also catered to many northern
            Chinese who had fled south from Kaifeng during the
            while it is also known that many restaurants were
            run by families formerly from Kaifeng.
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
                onChange={handleCategoryChange}>
                <option value="All">All</option>
                {categories.map( (category) => (
                  <option key={category.category_id} value={category.categoryName}>
                    {" "}
                    {category.categoryName}{" "}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="scroll-container">
            <div className="product-list">
              {products.length === 0 ? (
                <p>No items found</p>
              ) : (
                products.map( (product) => (
                  <Product key={product.menu_id} data={product} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RestaurantMenu;
