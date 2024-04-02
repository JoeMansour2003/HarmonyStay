const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
        SELECT * FROM public.booking
        WHERE booking_number = $1
      `;
    const { rows } = await db.query(query, [id]);
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).send("Booking not found");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
