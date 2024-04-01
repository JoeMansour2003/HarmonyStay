const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", async (req, res) => {
  const bookingData = req.body;
  try {
    const query = {
      text: "INSERT INTO public.booking (customer_id, room_number, booking_date, checkin_date, checkout_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      values: [
        bookingData.customer_id,
        bookingData.room_number,
        bookingData.booking_date,
        bookingData.checkin_date,
        bookingData.checkout_date,
      ],
    };
    const result = await db.query(query);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
