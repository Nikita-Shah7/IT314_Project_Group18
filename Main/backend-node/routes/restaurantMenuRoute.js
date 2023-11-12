const express = require("express");
const pool = require("../db.js")
const { v4: uuidv4 } = require('uuid');

const restaurantMenuRouter = express.Router();


restaurantMenuRouter.post("/", async (req, res) => {
    // console.log(req.body)
    try {
        if (!req.body.categoryName || !req.body.menu_name || !req.body.price || !req.body.profit || !req.body.img) {
            return res.status(400).json({ message: "All fields are mandatory !!" })
        }
        const id = uuidv4();
        const newMenuItem = await pool.query("INSERT INTO \"restaurantMenu\"(menu_id,\"categoryName\",\"menu_name\",description,price,profit,img) VALUES($1,$2,$3,$4,$5,$6,$7)",
            [id, req.body.categoryName, req.body.menu_name, req.body.description, req.body.price, req.body.profit, req.body.img]);
        res.status(201).json({
            message: "MenuItem created successfully !!",
            // data: newMenuItem
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message);
        res.status(500).json({ message: "Can't create a new menuItem!!" });
    }
});

// get menuItems
restaurantMenuRouter.get("/", async (req, res) => {
    try {
        const allMenuItems = await pool.query(`SELECT*FROM \"restaurantMenu\" ORDER BY menu_name ASC`);
        return res.status(200).json({
            message: "All menuItems received !!",
            count: allMenuItems.rows.length,
            data: allMenuItems.rows
        });
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get all menuItems!!" })
    }
});

// based on category
restaurantMenuRouter.get("/category/:category", async (req, res) => {
    try {
        const {category} = req.params
        // console.log(category)
        let allMenuItems ;
        if(category === "All") {
            allMenuItems = await pool.query(`SELECT*FROM \"restaurantMenu\" ORDER BY menu_name ASC ;`);
        } else {
            allMenuItems = await pool.query(`SELECT*FROM \"restaurantMenu\" WHERE \"categoryName\" = $1 ORDER BY price ASC`,[category]);
        }
        return res.status(200).json({
            message: "All menuItems received based on category!!",
            count: allMenuItems.rows.length,
            data: allMenuItems.rows
        });
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get all menuItems based on category!!" })
    }
});

// based on searchTerm
restaurantMenuRouter.get("/search/:searchTerm", async (req, res) => {
    try {
        let {searchTerm} = req.params
        searchTerm = searchTerm ? `${searchTerm}%` : '%'; // sanitize the input
        const allMenuItems = await pool.query(`SELECT*FROM \"restaurantMenu\" WHERE menu_name ILIKE $1 OR \"categoryName\" ILIKE $2`,[searchTerm,searchTerm]);
        return res.status(200).json({
            message: "All menuItems received based on menu_name!!",
            count: allMenuItems.rows.length,
            data: allMenuItems.rows
        });
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get all menuItems based on menu_name!!" })
    }
});


restaurantMenuRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const oneMenuItem = await pool.query("SELECT * FROM \"restaurantMenu\" WHERE menu_id = $1", [id]);
        // console.log(oneMenuItem.rows)
        if (!oneMenuItem.rows[0]) {
            return res.status(404).json({ message: "MenuItem not found !!" })
        }
        return res.status(200).json({
            message: "MenuItem received !!",
            data: oneMenuItem.rows[0]
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get the menuItem!!" })
    }
});


restaurantMenuRouter.put("/:id", async (req, res) => {
    try {
        // validating the input
        if (!req.body.categoryName || !req.body.menu_name || !req.body.price || !req.body.profit || !req.body.img) {
            return res.status(400).json({ message: "All fields are mandatory !!" })
        }
        const { id } = req.params
        const updateMenuItem = await pool.query("UPDATE \"restaurantMenu\" SET \"categoryName\" = $1, menu_name = $2, description = $3, price = $4, profit = $5, img = $7 WHERE menu_id = $6;", [req.body.categoryName, req.body.menu_name, req.body.description, req.body.price, req.body.profit, id, req.body.img]);

        if (updateMenuItem.rowCount == 0) {
            return res.status(404).json({ message: "MenuItem not found !!" })
        }
        return res.status(200).json({
            message: "Updated successfully !!",
            // data: updateMenuItem
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't update !!" })
    }
});


restaurantMenuRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deleteMenuItem = await pool.query("DELETE FROM \"restaurantMenu\" WHERE menu_id = $1;", [id]);
        if (deleteMenuItem.rowCount == 0) {
            return res.status(404).json({ message: "MenuItem not found !!" });
        }
        return res.status(200).json({
            message: "Deleted successfully !!",
            // data: deleteMenuItem
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't delete!!" })
    }
});


module.exports = restaurantMenuRouter;