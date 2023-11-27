const express = require("express");
const pool = require("../db.js");
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const adminRouter = express.Router();


adminRouter.post("/", async (req, res) => {
    // console.log(req.body)
    try {
        if (!req.body.admin_name || !req.body.password) {
            return res.status(400).json({ message: "All fields are mandatory !!" })
        }
        const admin_id = uuidv4();
        const newAdmin = await pool.query("INSERT INTO \"Admin\"(admin_id,admin_name,\"password\") VALUES($1,$2,$3)",
            [admin_id, req.body.admin_name, req.body.password]);
        res.status(201).json({
            message: "Admin created successfully !!",
            // data: newAdmin
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message);
        res.status(500).json({ message: "Can't create a new Admin!!" });
    }
});

// get all admin
adminRouter.get("/", async (req, res) => {
    try {
        const { adminName } = req.query;
        const allAdmin = await pool.query(`SELECT*FROM \"Admin\" ORDER BY \"admin_name\" ASC;`);
        return res.status(200).json({
            message: "All admin received !!",
            count: allAdmin.rows.length,
            data: allAdmin.rows
        });
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get all admin!!" })
    }
});


adminRouter.get("/:admin_name", async (req, res) => {
    try {
        const { admin_name } = req.params
        const oneAdmin = await pool.query("SELECT * FROM \"Admin\" WHERE admin_name = $1", [admin_name]);
        // console.log(oneAdmin.rows)
        if (!oneAdmin.rows[0]) {
            return res.status(404).json({ message: "Admin not found !!" })
        }
        console.log("nik1")
        const payLoad = oneAdmin.rows[0];
        const accessToken = jwt.sign(payLoad, process.env.ACCESS_TOKEN_SECRET)
        return res.status(200).json({
            message: "Admin received !!",
            data: oneAdmin.rows[0],
            accessToken: accessToken
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get the Admin!!" })
    }
});


adminRouter.put("/:id", async (req, res) => {
    try {
        // validating the input
        if (!req.body.admin_name) {
            return res.status(400).json({ message: "All fields are mandatory !!" })
        }
        const { id } = req.params
        const updateAdmin = await pool.query("UPDATE \"Admin\" SET \"admin_name\" = $1 WHERE admin_id = $2;", [req.body.admin_name, id]);

        if (updateAdmin.rowCount == 0) {
            return res.status(404).json({ message: "Admin not found !!" })
        }
        return res.status(200).json({
            message: "Updated successfully !!",
            // data: updateAdmin
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't update !!" })
    }
});


adminRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deleteAdmin = await pool.query("DELETE FROM \"Admin\" WHERE admin_id = $1;", [id]);
        if (deleteAdmin.rowCount == 0) {
            return res.status(404).json({ message: "Admin not found !!" });
        }
        return res.status(200).json({
            message: "Deleted successfully !!",
            // data: deleteAdmin
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't delete!!" })
    }
});


module.exports = adminRouter;