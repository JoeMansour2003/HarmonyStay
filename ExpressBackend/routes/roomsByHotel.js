const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/:hotelId/rooms", async (req, res) => {
    const { hotelId } = req.params;
    try {
        const query = {
            text: "SELECT * FROM public.hotelroom WHERE hotel_id = $1",
            values: [hotelId],
        };
        const { rows } = await db.query(query);
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


module.exports = router;
