const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", async (req, res) => {
  try {
    const { employee_id, Customer_id, room_number, renting_date } = req.body;
    const query = `
    INSERT INTO public.Renting (employee_id, Customer_id, room_number, renting_date)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `;
    const { rows } = await db.query(query, [
      employee_id,
      Customer_id,
      room_number,
      renting_date,
    ]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
