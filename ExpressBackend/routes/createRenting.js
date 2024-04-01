const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", async (req, res) => {
  try {
    const {
      employee_id,
      customer_id,
      room_number,
      renting_date,
      payment_status,
    } = req.body;
    console.log(req.body);
    const query = `
    INSERT INTO public.Renting (employee_id, customer_id, room_number, renting_date, payment_status)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `;
    const { rows } = await db.query(query, [
      employee_id,
      customer_id,
      room_number,
      renting_date,
      payment_status,
    ]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
