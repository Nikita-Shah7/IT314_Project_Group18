import React, { useState, useEffect } from "react";
import { Product } from "./product";
import { useNavigate } from "react-router-dom";
import { restaurantMenu as menuAxios } from "../AxiosCreate";
import { category as categoryAxios } from "../AxiosCreate";
import './RestaurantMenu.scss';
import image1 from "./a-food-on-darke-0-1.png";

function RestaurantMenu() {
  // console.log("nik in menu")

  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setLoading(true)
    menuAxios.get(`/`)
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
    categoryAxios.get(`/`)
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
    menuAxios.get(`/category/${selectedCategory}`)
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
    console.log(searchInput);
    const fetchData = async() => {
      let filteredProducts = [];
      await menuAxios.get(`/category/${selectedCategory}`)
        .then( (response) => {
          // console.log([response.data][0].data);
          filteredProducts = [response.data][0].data ;
          setLoading(false)
        })
        .catch( (error) => {
          console.log("ERROR MESSAGE ::", error)
          setLoading(false);
        });
        // console.log(filteredProducts)
      filteredProducts = filteredProducts.filter( (product) =>
        product.menu_name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setProducts(filteredProducts);
    }
    fetchData();
  },[searchInput]);
  

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleCategoryChange = (event) => {
      setSelectedCategory(event.target.value);
  };

  const navigate = useNavigate();
  // console.log(products);

  return (
    <>
      <div className="main-container">
        <div className="uppercontainer">
          <h1>Our Menu</h1>
          <div className="text-wrapper-11">Order Online is now easy</div>
          <img className="a-food-on-darke" src={image1} />
        </div>

        <div className="middle-container">
          <h1>Shop Information</h1>
          <p className="text1" style={{textAlign:'center'}}>
          Whether it is the cuisine of the Maharajas of yesteryear or the exotic flavours of the world over, Automn's impressive masters of culinary across the brand, weave together elevated experiences that tell an epicurean tale of the local culture, from sharing regional recipes to using offbeat ingredients with inventive menus in magical settings.
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
          <p>Total Items Found: {products.length}</p>
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
