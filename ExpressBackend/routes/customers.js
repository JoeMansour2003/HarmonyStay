const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", async (req, res) => {
  const customerData = req.body;
  try {
    const query = {
      text: "INSERT INTO customers (type, full_name, first_name, middle_name, last_name, address_street_number, address_street_name, city, province, ZIP, registration_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
      values: [
        customerData.type,
        customerData.full_name,
        customerData.first_name,
        customerData.middle_name,
        customerData.last_name,
        customerData.address_street_number,
        customerData.address_street_name,
        customerData.city,
        customerData.province,
        customerData.ZIP,
        customerData.registration_date,
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
