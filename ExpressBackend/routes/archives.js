const express = require('express');
const router = express.Router();
const pool = require('../db'); 

router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT a.archive_id, a.booking_number, a.renting_id, b.*, r.* 
            FROM archives a
            JOIN Booking b ON a.booking_number = b.booking_number
            JOIN Renting r ON a.renting_id = r.renting_id`
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching archives' });
    }
});

module.exports = router;
