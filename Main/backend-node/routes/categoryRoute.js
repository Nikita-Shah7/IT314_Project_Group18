const express = require("express");
const pool = require("../db.js");
const { v4: uuidv4 } = require('uuid');
const authenticateToken = require('../middlewares/auth.js');
require('dotenv').config();

const categoryRouter = express.Router();


categoryRouter.post("/", authenticateToken, async (req, res) => {
    // console.log(req.body)
    try {
        if (!req.body.categoryName) {
            return res.status(400).json({ message: "All fields are mandatory !!" })
        }
        const category_id = uuidv4();
        const newCategory = await pool.query("INSERT INTO category(category_id,\"categoryName\") VALUES($1,$2) ON CONFLICT (\"categoryName\") DO NOTHING",
            [category_id, req.body.categoryName]);
        if (newCategory.rowCount == 0) {
            res.status(500).json({ message: "Category already exists!!" });
        }
        res.status(201).json({
            message: "Category created successfully !!",
            // data: newCategory
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message);
        res.status(500).json({ message: "Can't create a new Category!!" });
    }
});

// get all category
categoryRouter.get("/", async (req, res) => {
    try {
        const { categoryName } = req.query;
        // const allCategories = await pool.query(`SELECT*FROM \"category\" ORDER BY \"categoryName\" ASC;`);
        const allCategories = await pool.query(`SELECT c.*, COALESCE(r.item_count, 0) AS item_count FROM "category" c
                    LEFT JOIN (
                        SELECT "categoryName", COUNT(*) AS item_count
                        FROM "restaurantMenu"
                        GROUP BY "categoryName"
                    ) r ON c."categoryName" = r."categoryName" 
                    ORDER BY c."categoryName" ASC;`);

        // Set cache-related headers
        const max_age = 120; // 120 seconds
        const currentDate = new Date();
        const thirtySecondsLater = new Date(currentDate.getTime() + max_age * 1000); // 30 seconds later
        // const lastModified = /* Calculate or retrieve the last modified date of the data */

        res.setHeader('Cache-Control', `private, max-age=${max_age}`);
        res.setHeader('Date', currentDate.toUTCString());
        res.setHeader('Expires', thirtySecondsLater.toUTCString());
        // res.setHeader('Last-Modified', lastModified.toUTCString());

        return res.status(200).json({
            message: "All categories received !!",
            count: allCategories.rows.length,
            data: allCategories.rows
        });
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get all category!!" })
    }
});


categoryRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const oneCategory = await pool.query("SELECT * FROM category WHERE category_id = $1", [id]);
        // console.log(oneCategory.rows)
        if (!oneCategory.rows[0]) {
            return res.status(404).json({ message: "Category not found !!" })
        }
        return res.status(200).json({
            message: "Category received !!",
            data: oneCategory.rows[0]
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get the Category!!" })
    }
});


categoryRouter.put("/:id", authenticateToken, async (req, res) => {
    try {
        // validating the input
        if (!req.body.categoryName) {
            return res.status(400).json({ message: "All fields are mandatory !!" })
        }
        const { id } = req.params
        const updateCategory = await pool.query("UPDATE category SET \"categoryName\" = $1 WHERE category_id = $2;", [req.body.categoryName, id]);

        if (updateCategory.rowCount == 0) {
            return res.status(404).json({ message: "Category not found !!" })
        }
        return res.status(200).json({
            message: "Updated successfully !!",
            // data: updateCategory
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't update !!" })
    }
});


categoryRouter.delete("/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params
        let categoryName = await pool.query("SELECT \"categoryName\" FROM category WHERE category_id = $1;", [id]);
        // console.log(categoryName.rows[0].categoryName);
        categoryName = categoryName.rows[0].categoryName;
        const deleteMenuItems = await pool.query("DELETE FROM \"restaurantMenu\" WHERE \"categoryName\" = $1;", [categoryName]);
        // console.log(deleteMenuItems);
        const deleteCategory = await pool.query("DELETE FROM category WHERE category_id = $1;", [id]);
        if (deleteCategory.rowCount == 0) {
            return res.status(404).json({ message: "Category not found !!" });
        }
        console.log(deleteCategory);
        return res.status(200).json({
            message: "Deleted successfully !!",
            // data: deleteCategory
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't delete!!" })
    }
});


module.exports = categoryRouter;
