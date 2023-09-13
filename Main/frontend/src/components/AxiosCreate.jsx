import axios from "axios";

export const dishCategory = axios.create({
    baseURL: "http://127.0.0.1:8000/api/dishcategory"
});

export const restaurantMenu = axios.create({
    baseURL: "http://127.0.0.1:8000/api/restaurantmenu"
});

export const cart = axios.create({
    baseURL: "http://127.0.0.1:8000/api/mycart"
});