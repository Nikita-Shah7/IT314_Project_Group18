import axios from "axios";

export const dishCategory = axios.create({
    baseURL: "http://127.0.0.1:8000/api/dishcategory"
});

export const restaurantMenu = axios.create({
    baseURL: "http://127.0.0.1:8000/api/restaurantmenu"
});

export const foodCart = axios.create({
    baseURL: "http://127.0.0.1:8000/api/foodcart"
});

export const table = axios.create({
    baseURL: "http://127.0.0.1:8000/api/table"
});

export const cartItems = axios.create({
    baseURL: "http://127.0.0.1:8000/api/cartitems"
});

export const cartItemsUpdate = axios.create({
    baseURL: "http://127.0.0.1:8000/api/cartitems-update"
});

export const cartItemsDelete = axios.create({
    baseURL: "http://127.0.0.1:8000/api/cartitems-delete"
});