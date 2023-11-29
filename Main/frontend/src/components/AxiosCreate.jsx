import axios from "axios";
import {API_URL} from '../config.js';

// const SERVER_HOST = "localhost";
// const SERVER_PORT = 5555;
// const SERVER_SOCKET_ADDRESS = "http://" + SERVER_HOST + ":" + SERVER_PORT + "/";
const SERVER_SOCKET_ADDRESS = API_URL;


export const category = axios.create({
    baseURL: SERVER_SOCKET_ADDRESS + "category"
});

export const restaurantMenu = axios.create({
    baseURL: SERVER_SOCKET_ADDRESS + "menu"
});

export const cart = axios.create({
    baseURL: SERVER_SOCKET_ADDRESS + "cart"
});

export const table = axios.create({
    baseURL: SERVER_SOCKET_ADDRESS + "table"
});

export const cartItems = axios.create({
    baseURL: SERVER_SOCKET_ADDRESS + "cart_items"
});

export const feedback = axios.create({
    baseURL: SERVER_SOCKET_ADDRESS + "feedback"
});

export const admin = axios.create({
    baseURL: SERVER_SOCKET_ADDRESS + "admin"
});

export const users = axios.create({
    baseURL: SERVER_SOCKET_ADDRESS + "users"
});