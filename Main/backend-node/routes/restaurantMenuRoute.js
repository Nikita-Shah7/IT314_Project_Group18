const express = require("express");
const pool = require("../db.js")
const { v4: uuidv4 } = require('uuid');
const authenticateToken = require('../middlewares/auth.js');
require('dotenv').config();

const restaurantMenuRouter = express.Router();


restaurantMenuRouter.post("/", authenticateToken, async (req, res) => {
    // console.log(req.body)
    try {
        if (!req.body.categoryName || !req.body.menu_name || !req.body.price || !req.body.profit || !req.body.img) {
            return res.status(400).json({ message: "All fields are mandatory !!" })
        }
        const id = uuidv4();
        const newMenuItem = await pool.query("INSERT INTO \"restaurantMenu\"(menu_id,\"categoryName\",\"menu_name\",description,price,profit,img) VALUES($1,$2,$3,$4,$5,$6,$7)",
            [id, req.body.categoryName, req.body.menu_name, req.body.description, parseInt(req.body.price), parseInt(req.body.profit), req.body.img]);
        res.status(201).json({
            message: "MenuItem created successfully !!",
            // data: newMenuItem
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message);
        res.status(500).json({ message: "Can't create a new menuItem!!" });
    }
});

// get menuItems according to pagination
restaurantMenuRouter.get("/", async (req, res) => {
    try {
        let { page, limit, searchTerm, category } = req.query;
        category = category ? category = decodeURIComponent(category) : null;
        page = page ? page : 0;
        searchTerm = searchTerm ? `%${searchTerm}%` : '%'; // sanitize the input
        // console.log(page, limit, searchTerm, category);
        let menuCount = 0;
        if (category && category.length) {
            menuCount = await pool.query(`SELECT COUNT(*) FROM \"restaurantMenu\" WHERE \"categoryName\" = $2 AND (menu_name ILIKE $1 OR \"categoryName\" ILIKE $1);`, [searchTerm, category]);
            // console.log(menuCount.rows[0].count);
        }
        else
            menuCount = await pool.query(`SELECT COUNT(*) FROM \"restaurantMenu\" WHERE menu_name ILIKE $1 OR \"categoryName\" ILIKE $1;`, [searchTerm]);
        menuCount = menuCount.rows[0].count;
        limit = limit ? limit : parseInt(menuCount) + 1;
        // console.log(page, limit, searchTerm, category);
        if (page < 1)
            page = 1;
        if (page > Math.ceil(menuCount / limit))
            page = Math.ceil(menuCount / limit);
        let startIndex = (page - 1) * limit;
        let endIndex = Math.min(page * limit - 1, menuCount - 1);
        if (startIndex < 0 || endIndex < 0) {
            startIndex = 0;
            endIndex = 0;
        }
        // console.log(startIndex, endIndex, searchTerm, category)
        let paginatedMenu;
        if (category) {
            paginatedMenu = await pool.query(`SELECT*FROM \"restaurantMenu\" WHERE \"categoryName\" = $4 AND (menu_name ILIKE $1 OR \"categoryName\" ILIKE $1) ORDER BY menu_name ASC LIMIT $2 OFFSET $3 ;`, [searchTerm, limit, startIndex, category]);
        }
        else {
            paginatedMenu = await pool.query(`SELECT*FROM \"restaurantMenu\" WHERE menu_name ILIKE $1 OR \"categoryName\" ILIKE $1 ORDER BY menu_name ASC LIMIT $2 OFFSET $3 ;`, [searchTerm, limit, startIndex]);
        }
        // const allMenuItems = await pool.query(`SELECT*FROM \"restaurantMenu\" ORDER BY menu_name ASC`);

        // Set cache control headers
        const max_age = 120; // 120 seconds
        res.setHeader('Cache-Control', `private, max-age=${max_age}`);
        
        return res.status(200).json({
            message: "All menuItems received !!",
            totalCount: menuCount,
            count: paginatedMenu.rows.length,
            data: paginatedMenu.rows
        });
        // return res.status(200).json({
        //     message: "All menuItems received !!",
        //     count: allMenuItems.rows.length,
        //     data: allMenuItems.rows
        // });
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


restaurantMenuRouter.put("/:id", authenticateToken, async (req, res) => {
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


restaurantMenuRouter.delete("/:id", authenticateToken, async (req, res) => {
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