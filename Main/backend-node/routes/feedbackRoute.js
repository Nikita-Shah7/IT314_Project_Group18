const express = require("express");
const pool = require("../db.js")
const { v4: uuidv4 } = require('uuid');

const feedbackRouter = express.Router();


feedbackRouter.post("/", async (req, res) => {
    // console.log(req.body)
    try {
        if (!req.body.date_time) {
            return res.status(400).json({ message: "All fields are mandatory !!" })
        }
        const id = uuidv4();
        const newFeedback = await pool.query("INSERT INTO feedback(feedback_id, starate1, starate2, comments, date_time) VALUES($1,$2,$3,$4,$5)",
            [id, req.body.starate1, req.body.starate2, req.body.comments, req.body.date_time]);
        res.status(201).json({
            message: "Feedback created successfully !!",
            // data: newFeedback
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message);
        res.status(500).json({ message: "Can't create a new Feedback!!" });
    }
});

// get Feedbacks
feedbackRouter.get("/", async (req, res) => {
    try {
        const allFeedbacks = await pool.query(`SELECT*FROM feedback ORDER BY date_time DESC`);

        // Set cache control headers
        const max_age = 120; // 120 seconds
        res.setHeader('Cache-Control', `private, max-age=${max_age}`);

        console.log("nik cache");
        return res.status(200).json({
            message: "All Feedbacks received !!",
            count: allFeedbacks.rows.length,
            data: allFeedbacks.rows
        });
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get all Feedbacks!!" })
    }
});

// get Feedbacks based on starating1
feedbackRouter.get("/starate/:starate1", async (req, res) => {
    try {
        const { starate1 } = req.params
        const allFeedbacks = await pool.query(`SELECT*FROM feedback WHERE starate1 = $1 ORDER BY date_time ASC`, [starate1]);
        return res.status(200).json({
            message: "All Feedbacks received based on starRate !!",
            count: allFeedbacks.rows.length,
            data: allFeedbacks.rows
        });
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get all Feedbacks based on starRate!!" })
    }
});


feedbackRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const oneFeedback = await pool.query("SELECT * FROM feedback WHERE feedback_id = $1", [id]);
        // console.log(oneFeedback.rows)
        if (!oneFeedback.rows[0]) {
            return res.status(404).json({ message: "Feedback not found !!" })
        }
        return res.status(200).json({
            message: "Feedback received !!",
            data: oneFeedback.rows[0]
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get the Feedback!!" })
    }
});


feedbackRouter.put("/:id", async (req, res) => {
    try {
        if (!req.body.date_time) {
            return res.status(400).json({ message: "All fields are mandatory !!" })
        }
        const { id } = req.params
        const updateFeedback = await pool.query("UPDATE feedback SET starate1 = $1, starate2 = $2, comments = $3 WHERE feedback_id = $4;", [req.body.starate1, req.body.starate2, req.body.comments, id]);

        if (updateFeedback.rowCount == 0) {
            return res.status(404).json({ message: "Feedback not found !!" })
        }
        return res.status(200).json({
            message: "Updated successfully !!",
            // data: updateFeedback
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't update !!" })
    }
});


feedbackRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deleteFeedback = await pool.query("DELETE FROM feedback WHERE feedback_id = $1;", [id]);
        if (deleteFeedback.rowCount == 0) {
            return res.status(404).json({ message: "Feedback not found !!" });
        }
        return res.status(200).json({
            message: "Deleted successfully !!",
            // data: deleteFeedback
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't delete!!" })
    }
});


module.exports = feedbackRouter;