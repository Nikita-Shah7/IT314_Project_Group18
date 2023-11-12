const express = require("express");
const pool = require("../db.js")

const tableRouter = express.Router();


tableRouter.post("/", async (req, res) => {
    // console.log(req.body)
    try {
        if (!req.body.table_id || !req.body.capacity || !req.body.availability_status) {
            return res.status(400).json({ message: "All fields are mandatory !!" })
        }
        const newTable = await pool.query("INSERT INTO \"table\"(table_id, capacity, availability_status) VALUES($1,$2,$3)",
            [req.body.table_id, req.body.capacity, req.body.availability_status]);
        res.status(201).json({
            message: "Table created successfully !!",
            // data: newTable
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message);
        res.status(500).json({ message: "Can't create a new Table!!" });
    }
});

// get Tables
tableRouter.get("/", async (req, res) => {
    try {
        const allTables = await pool.query(`SELECT*FROM \"table\" `);
        return res.status(200).json({
            message: "All Tables received !!",
            count: allTables.rows.length,
            data: allTables.rows
        });
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get all Tables!!" })
    }
});


// get Tables based on availability_status
tableRouter.get("/availability_status/:availability_status", async (req, res) => {
    try {
        const {availability_status} = req.params
        const allTables = await pool.query(`SELECT*FROM \"table\" WHERE availability_status = $1;`,[availability_status]);
        return res.status(200).json({
            message: "All Tables received based on availability_status !!",
            count: allTables.rows.length,
            data: allTables.rows
        });
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get all Tables based on availability_status!!" })
    }
});


// get Tables based on capacity
tableRouter.get("/capacity/:capacity", async (req, res) => {
    try {
        const {capacity} = req.params
        const allTables = await pool.query(`SELECT*FROM \"table\" WHERE availability_status = 'Available'AND capacity >= $1 ORDER BY capacity ASC, table_id ASC;`,[capacity]);
        return res.status(200).json({
            message: "All Tables received based on capacity !!",
            count: allTables.rows.length,
            data: allTables.rows
        });
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get all Tables based on capacity!!" })
    }
});


tableRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const oneTable = await pool.query("SELECT * FROM \"table\" WHERE table_id = $1", [id]);
        // console.log(oneTable.rows)
        if (!oneTable.rows[0]) {
            return res.status(404).json({ message: "Table not found !!" })
        }
        return res.status(200).json({
            message: "Table received !!",
            data: oneTable.rows[0]
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get the Table!!" })
    }
});


tableRouter.put("/:id", async (req, res) => {
    try {
        if (!req.body.table_id || !req.body.capacity || !req.body.availability_status) {
            return res.status(400).json({ message: "All fields are mandatory !!" })
        }
        const { id } = req.params
        const updateTable = await pool.query("UPDATE \"table\" SET table_id = $4, capacity = $1, availability_status = $2 WHERE table_id = $3;", [req.body.capacity, req.body.availability_status, id, req.body.table_id]);

        if (updateTable.rowCount == 0) {
            return res.status(404).json({ message: "Table not found !!" })
        }
        return res.status(200).json({
            message: "Updated successfully !!",
            // data: updateTable
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't update !!" })
    }
});


tableRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deleteTable = await pool.query("DELETE FROM \"table\" WHERE table_id = $1;", [id]);
        if (deleteTable.rowCount == 0) {
            return res.status(404).json({ message: "Table not found !!" });
        }
        return res.status(200).json({
            message: "Deleted successfully !!",
            // data: deleteTable
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't delete!!" })
    }
});


module.exports = tableRouter;