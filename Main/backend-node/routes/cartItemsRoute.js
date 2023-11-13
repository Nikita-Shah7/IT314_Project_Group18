const express = require("express");
const pool = require("../db.js")
const { v4: uuidv4 } = require('uuid');

const cartItemRouter = express.Router();


cartItemRouter.post("/", async (req, res) => {
    // console.log(req.body)
    try {
        if (!req.body.table_id || !req.body.menu_name || !req.body.quantity || !req.body.item_price || !req.body.total_price || !req.body.item_profit || !req.body.total_profit || !req.body.date_time) {
            return res.status(400).json({ message: "All fields are mandatory !!" })
        }
        const newCartItem = await pool.query("INSERT INTO cart_items(table_id, menu_name, quantity, item_price, total_price, item_profit, total_profit, date_time) VALUES($1,$2,$3,$4,$5,$6,$7,$8)",
            [req.body.table_id, req.body.menu_name, req.body.quantity, req.body.item_price, req.body.total_price, req.body.item_profit, req.body.total_profit, req.body.date_time]);
        let total_bill_amount = await pool.query("SELECT SUM(total_price) AS total_bill_amount FROM cart_items WHERE table_id = $1",[req.body.table_id]);
        let total_bill_profit = await pool.query("SELECT SUM(total_profit) AS total_bill_profit FROM cart_items WHERE table_id = $1",[req.body.table_id]);
        // console.log(total_bill_amount.rows[0].total_bill_amount, total_bill_profit.rows[0].total_bill_profit)
        total_bill_amount = parseInt(total_bill_amount.rows[0].total_bill_amount);
        total_bill_profit = parseInt(total_bill_profit.rows[0].total_bill_profit);
        // console.log("nik in cartItems Route1");
        await pool.query("INSERT INTO cart(table_id, total_bill_amount, total_bill_profit, date_time) VALUES($1,$2,$3,$4) ON CONFLICT(table_id) DO UPDATE SET total_bill_amount = EXCLUDED.total_bill_amount, total_bill_profit = EXCLUDED.total_bill_profit, date_time = EXCLUDED.date_time;",
        [req.body.table_id, total_bill_amount, total_bill_profit, req.body.date_time]);
        // console.log("nik in cartItems Route2");
        res.status(201).json({
            message: "CartItem created successfully !!",
            // data: newCartItems
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message);
        res.status(500).json({ message: "Can't create a new CartItem!!" });
    }
});

// get all CartItems ordered by table_id
cartItemRouter.get("/", async (req, res) => {
    try {
        const allCartItems = await pool.query(`SELECT*FROM cart_items ORDER BY table_id DESC, menu_name ASC;`);
        return res.status(200).json({
            message: "All CartItems received !!",
            count: allCartItems.rows.length,
            data: allCartItems.rows
        });
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get all CartItems!!" })
    }
});

// get CartItems of particular table
cartItemRouter.get("/cart_table/:table_id", async (req, res) => {
    try {
        const {table_id} = req.params;
        const allCartItems = await pool.query(`SELECT*FROM cart_items WHERE table_id = $1 ORDER BY menu_name ASC ;`,[table_id]);
        return res.status(200).json({
            message: "All CartItems received of particular table!!",
            count: allCartItems.rows.length,
            data: allCartItems.rows
        });
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get all CartItems of particular table!!" })
    }
});

// get cart_items based on menu_name
cartItemRouter.get("/cart_menu_name/:menu_name", async (req, res) => {
    try {
        const { menu_name } = req.params
        const allCartItem = await pool.query("SELECT * FROM cart_items WHERE menu_name = $1 ORDER BY menu_name ASC;", [menu_name]);
        // console.log(oneCartItem.rows)
        if (!allCartItem.rows[0]) {
            return res.status(404).json({ message: "CartItem not found based on menu_name !!" });
        }
        return res.status(200).json({
            message: "CartItem received based on menu_name!!",
            data: allCartItem.rows[0]
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get the CartItems based on menu_name!!" });
    }
});

// get cart_item based on table_id and menu_name
cartItemRouter.get("/:table_id/:menu_name", async (req, res) => {
    try {
        const { table_id, menu_name } = req.params
        const allCartItem = await pool.query("SELECT * FROM cart_items WHERE menu_name = $1 AND table_id = $2 ORDER BY menu_name ASC;", [menu_name,table_id]);
        // console.log(oneCartItem.rows)
        if (!allCartItem.rows[0]) {
            return res.status(404).json({ message: "CartItem not found based on menu_name and table_id !!" });
        }
        return res.status(200).json({
            message: "CartItem received based on menu_name!!",
            data: allCartItem.rows[0]
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get the CartItems based on menu_name and table_id!!" });
    }
});


cartItemRouter.put("/", async (req, res) => {
    try {
        if (!req.body.table_id || !req.body.menu_name || !req.body.quantity || !req.body.item_price || !req.body.total_price || !req.body.item_profit || !req.body.total_profit || !req.body.date_time) {
            return res.status(400).json({ message: "All fields are mandatory !!" })
        }
        const updateCartItem = await pool.query("UPDATE cart_items SET quantity = $1, total_price = $2, total_profit = $3, date_time = $4 WHERE table_id = $5 AND menu_name = $6;", 
                        [req.body.quantity, req.body.total_price, req.body.total_profit, req.body.date_time, req.body.table_id, req.body.menu_name]);

        if (updateCartItem.rowCount == 0) {
            return res.status(404).json({ message: "CartItem not found !!" })
        }
        let total_bill_amount = await pool.query("SELECT SUM(total_price) AS total_bill_amount FROM cart_items WHERE table_id = $1",[req.body.table_id]);
        let total_bill_profit = await pool.query("SELECT SUM(total_profit) AS total_bill_profit FROM cart_items WHERE table_id = $1",[req.body.table_id]);
        // console.log(total_bill_amount.rows[0].total_bill_amount, total_bill_profit.rows[0].total_bill_profit)
        total_bill_amount = parseInt(total_bill_amount.rows[0].total_bill_amount);
        total_bill_profit = parseInt(total_bill_profit.rows[0].total_bill_profit);
        await pool.query("UPDATE cart SET table_id = $1, total_bill_amount = $2, total_bill_profit = $3, date_time = $4 WHERE table_id = $5 ;",
            [req.body.table_id, total_bill_amount, total_bill_profit, req.body.date_time, req.body.table_id]);
        // console.log(typeof total_bill_amount, typeof total_bill_profit)
        return res.status(200).json({
            message: "Updated successfully !!",
            // data: updateCartItem
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't update !!" })
    }
});


cartItemRouter.delete("/cart_table/:table_id", async (req, res) => {
    // console.log("nik in delete1");
    try {
        const { table_id } = req.params
        const deleteCartItems = await pool.query("DELETE FROM cart_items WHERE table_id = $1;", [table_id]);
        if (deleteCartItems.rowCount == 0) {
            return res.status(404).json({ message: "CartItems not found !!" });
        }
        let total_bill_amount = await pool.query("SELECT SUM(total_price) AS total_bill_amount FROM cart_items WHERE table_id = $1",[table_id]);
        let total_bill_profit = await pool.query("SELECT SUM(total_profit) AS total_bill_profit FROM cart_items WHERE table_id = $1",[table_id]);
        // console.log(total_bill_amount.rows[0].total_bill_amount, total_bill_profit.rows[0].total_bill_profit)
        total_bill_amount = parseInt(total_bill_amount.rows[0].total_bill_amount);
        total_bill_profit = parseInt(total_bill_profit.rows[0].total_bill_profit);
        await pool.query("DELETE FROM cart WHERE table_id = $1 ;",[table_id]);
        return res.status(200).json({
            message: "Deleted successfully !!",
            // data: deleteCartItem
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't delete!!" })
    }
});

// delete a particular menu_item from cart
cartItemRouter.delete("/:table_id/:menu_name", async (req, res) => {
    // console.log("nik in delete2");
    try {
        const { table_id, menu_name } = req.params
        const deleteCartItems = await pool.query("DELETE FROM cart_items WHERE table_id = $1 AND menu_name = $2;", [table_id, menu_name]);
        if (deleteCartItems.rowCount == 0) {
            return res.status(404).json({ message: "CartItems not found !!" });
        }
        // console.log("nik111");
        let total_bill_amount = await pool.query("SELECT SUM(total_price) AS total_bill_amount FROM cart_items WHERE table_id = $1",[table_id]);
        let total_bill_profit = await pool.query("SELECT SUM(total_profit) AS total_bill_profit FROM cart_items WHERE table_id = $1",[table_id]);
        // console.log(total_bill_amount.rows[0].total_bill_amount, total_bill_profit.rows[0].total_bill_profit)
        total_bill_amount = parseInt(total_bill_amount.rows[0].total_bill_amount) || 0;
        total_bill_profit = parseInt(total_bill_profit.rows[0].total_bill_profit) || 0;
        // console.log("nik222");
        // console.log(total_bill_amount, total_bill_profit)
        if(total_bill_amount == 0) {
            await pool.query("DELETE FROM cart WHERE table_id = $1 ;",[table_id]);
        } else {
            await pool.query("UPDATE cart SET table_id = $1, total_bill_amount = $2, total_bill_profit = $3, date_time = $4 WHERE table_id = $5 ;",
                [table_id, total_bill_amount, total_bill_profit, new Date().toISOString(), table_id]);
        }
        // console.log("nik333",menu_name,table_id);
        return res.status(200).json({
            message: "Deleted successfully !!",
            // data: deleteCartItem
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't delete!!" })
    }
});


module.exports = cartItemRouter;