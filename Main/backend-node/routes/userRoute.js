const express = require("express");
const pool = require("../db.js");
// const jwt = require('jsonwebtoken');
require('dotenv').config();

const userRoute = express.Router();


userRoute.post("/", async (req, res) => {
    // console.log(req.body)
    try {
        if (!req.body.user_name || !req.body.user_email) {
            return res.status(400).json({ message: "All fields are mandatory !!" })
        }
        const newUser = await pool.query("INSERT INTO \"User\"(user_name,user_email) VALUES($1,$2)",
            [req.body.user_name, req.body.user_email]);
        res.status(201).json({
            message: "User created successfully !!",
            // data: newUser
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message);
        res.status(500).json({ message: "Can't create a new User!!" });
    }
});

// get all user
userRoute.get("/", async (req, res) => {
    try {
        const { userName } = req.query;
        const allUsers = await pool.query(`SELECT*FROM \"User\" ORDER BY \"user_name\" ASC;`);
        return res.status(200).json({
            message: "All users received !!",
            count: allUser.rows.length,
            data: allUser.rows
        });
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get all users!!" })
    }
});


userRoute.get("/:user_email", async (req, res) => {
    try {
        const { user_email } = req.params
        const oneUser = await pool.query("SELECT * FROM \"User\" WHERE user_email = $1", [user_email]);
        // console.log(oneUser.rows)
        if (!oneUser.rows[0]) {
            return res.status(404).json({ message: "User not found !!" })
        }
        // const payLoad = oneUser.rows[0];
        // const accessToken = jwt.sign(payLoad, process.env.ACCESS_TOKEN_SECRET)
        return res.status(200).json({
            message: "User received !!",
            data: oneUser.rows[0],
            // accessToken: accessToken
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get the User!!" })
    }
});


userRoute.delete("/:user_email", async (req, res) => {
    try {
        const { user_email } = req.params
        const deleteUser = await pool.query("DELETE FROM \"User\" WHERE user_email = $1;", [user_email]);
        if (deleteUser.rowCount == 0) {
            return res.status(404).json({ message: "User not found !!" });
        }
        return res.status(200).json({
            message: "Deleted successfully !!",
            // data: deleteUser
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't delete!!" })
    }
});


module.exports = userRouter;