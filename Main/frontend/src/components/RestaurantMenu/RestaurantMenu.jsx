import React, { useState, useEffect, useRef } from "react";
import { Product } from "./product";
import { useNavigate } from "react-router-dom";
import { restaurantMenu as menuAxios } from "../AxiosCreate";
import { category as categoryAxios } from "../AxiosCreate";
import './RestaurantMenu.scss';
import image1 from "./a-food-on-darke-0-1.png";
// import Loader from "../Loader/Loader";
import Pagination from "../PaginationBar/PaginationBar";
import Loader from "../Loader/Loader";
function RestaurantMenu() {
  // console.log("nik in menu")

  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [itemCnt, setItemCnt] = useState(0);
  const [currPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(6);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await categoryAxios.get(`/`)
        .then((response) => {
          // console.log(response.data.data)
          setCategories(response.data.data);
          setSelectedCategory(response.data.data[0].categoryName)
          setLoading(false);
        })
        .catch((error) => {
          console.log("ERROR MESSAGE ::", error)
          setLoading(false);
        });
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const encodedCategory = encodeURIComponent(selectedCategory);
      await menuAxios.get(`?page=${currPage}&limit=${limit}&category=${encodedCategory}&searchTerm=${searchInput}`)
        .then((response) => {
          // console.log([response.data.data])
          setProducts([response.data.data]);
          setItemCnt(response.data.totalCount);
          setLoading(false);
        })
        .catch((error) => {
          console.log("ERROR MESSAGE ::", error)
          setLoading(false);
        });
    }
    if (selectedCategory)
      fetchData();
  }, [currPage, selectedCategory, searchInput]);


  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  const navigate = useNavigate();

  const handleSetCurrentPage = (curr) => {
    setCurrentPage(curr)
  }

  const handleInfiniteScroll = () => {
    console.log("nik in handleInfiniteScroll...");
    if (scrollContainerRef.current) {
      const scrollHeight = scrollContainerRef.current.scrollHeight;
      const innerHeight = scrollContainerRef.current.clientHeight;
      const scrollTop = scrollContainerRef.current.scrollTop;

      console.log('scrollHeight =>', scrollHeight);
      console.log('innerHeight =>', innerHeight);
      console.log('scrollTop =>', scrollTop);

      if (innerHeight + scrollTop + 1 >= scrollHeight) {
        console.log("nik inside if...")
        setCurrentPage((prev) => prev + 1);
      }
    } else {
      console.log("nik can't get heights...")
    }
  };

  // useEffect( () => {
  //   scrollContainerRef.current.addEventListener('scroll', handleInfiniteScroll);
  //   return () => {
  //     scrollContainerRef.current.removeEventListener('scroll', handleInfiniteScroll);
  //   };
  // },[]);

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
          <p className="text1" style={{ textAlign: 'center' }}>
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
                {categories.map((category) => (
                  <option key={category.category_id} value={category.categoryName}>
                    {" "}
                    {category.categoryName}{" "}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {loading ? (
        <Loader />
      ) : (<>
          <p>Total Items Found: {itemCnt}</p>
          <div className="scroll-container" ref={scrollContainerRef}>
            <div className="product-list">
              {itemCnt == 0 ? (
                <p>No items found</p>
              ) : (
                products[0].map((product) => (
                  <Product key={product.menu_id} data={product} />
                ))
              )}
            </div>
            {(itemCnt == 0 || Math.ceil(itemCnt / limit) == 1) ? (<></>) : (
              <Pagination
                currPage={currPage}
                limit={limit}
                handleSetCurrentPage={handleSetCurrentPage}
                totalItemCount={itemCnt}
              />)
            }
          </div>
          </>)}
        </div>
      </div>
    </>
  );
}

export default RestaurantMenu;
