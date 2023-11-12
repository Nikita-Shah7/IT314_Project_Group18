const SERVER_PORT = 5555;
const USER = "<user>";
const PASSWORD = "<password>";
const HOST = "<host>";
const DB_PORT = 5432;
const DB1 = "<database>";
const RELATION1 = "category";
const RELATION2 = "restaurantMenu";
const RELATION3 = "table";
const RELATION4 = "feedback";
const RELATION5 = "Admin";
const RELATION6 = "cart_items";
const RELATION7 = "cart";
const RELATION8 = "payment";
const RELATION9 = "orders";
const CONNECTION_STRING = `postgresql://${USER}:${PASSWORD}@${HOST}:${DB_PORT}/${DB1}`;

module.exports = {
    SERVER_PORT, USER, PASSWORD, HOST, DB_PORT, DB1, CONNECTION_STRING, 
    RELATION1, RELATION2, RELATION3, RELATION4, RELATION5, RELATION6, RELATION7, RELATION8, RELATION9
}

