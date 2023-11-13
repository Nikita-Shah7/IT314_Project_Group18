const express = require("express");
const pool = require("../db.js")
const { v4: uuidv4 } = require('uuid');

const cartRouter = express.Router();


cartRouter.post("/", async (req, res) => {
    // console.log(req.body)
    try {
        if (!req.body.table_id || !req.body.total_bill_amount || !req.body.total_bill_profit || !req.body.date_time) {
            return res.status(400).json({ message: "All fields are mandatory !!" })
        }
        const newCart = await pool.query("INSERT INTO cart(table_id, total_bill_amount, total_bill_profit, date_time) VALUES($1,$2,$3,$4)",
            [req.body.table_id, req.body.total_bill_amount, req.body.total_bill_profit, req.body.date_time]);
        res.status(201).json({
            message: "Cart created successfully !!",
            // data: newCart
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message);
        res.status(500).json({ message: "Can't create a new Cart!!" });
    }
});

// get all carts ordered by date_time
cartRouter.get("/", async (req, res) => {
    try {
        const allCarts = await pool.query(`SELECT*FROM cart ORDER BY date_time DESC`);
        return res.status(200).json({
            message: "All Carts received !!",
            count: allCarts.rows.length,
            data: allCarts.rows
        });
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get all Carts!!" })
    }
});

// get Carts ordered by table_id
cartRouter.get("/cart_table", async (req, res) => {
    try {
        const allCarts = await pool.query(`SELECT*FROM cart ORDER BY table_id DESC`);
        return res.status(200).json({
            message: "All Carts received !!",
            count: allCarts.rows.length,
            data: allCarts.rows
        });
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get all Carts!!" })
    }
});

// get carts based on table_id
cartRouter.get("/:table_id", async (req, res) => {
    try {
        const { table_id } = req.params
        const oneCart = await pool.query("SELECT * FROM cart WHERE table_id = $1", [table_id]);
        // console.log(oneCart.rows)
        if (!oneCart.rows[0]) {
            return res.status(404).json({ message: "Cart not found !!" })
        }
        return res.status(200).json({
            message: "Cart received !!",
            data: oneCart.rows[0]
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get the Cart!!" })
    }
});

//  put on basis of table_id
cartRouter.put("/:table_id", async (req, res) => {
    try {
        if (!req.body.table_id || !req.body.total_bill_amount || !req.body.total_bill_profit || !req.body.date_time) {
            return res.status(400).json({ message: "All fields are mandatory !!" })
        }
        const { table_id } = req.params
        const updateCart = await pool.query("UPDATE cart SET total_bill_amount = $1, date_time = $2, WHERE table_id = $3;", [req.body.total_bill_amount, req.body.date_time, table_id]);

        if (updateCart.rowCount == 0) {
            return res.status(404).json({ message: "Cart not found !!" })
        }
        return res.status(200).json({
            message: "Updated successfully !!",
            // data: updateCart
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't update !!" })
    }
});

// delete based on table_id
cartRouter.delete("/:table_id", async (req, res) => {
    try {
        const { table_id } = req.params
        const deleteCart = await pool.query("DELETE FROM cart WHERE table_id = $1;", [table_id]);
        if (deleteCart.rowCount == 0) {
            return res.status(404).json({ message: "Cart not found !!" });
        }
        return res.status(200).json({
            message: "Deleted successfully !!",
            // data: deleteCart
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't delete!!" })
    }
});


module.exports = cartRouter;