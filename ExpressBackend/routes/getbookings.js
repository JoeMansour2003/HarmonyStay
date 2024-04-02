const express = require('express');
const router = express.Router();
const pool = require('../db'); 

router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT b.*, r.renting_id 
            FROM booking b
            LEFT JOIN renting r ON b.customer_id = r.customer_id
        `;
        const result = await pool.query(query); 
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching bookings with associated renting info:', err);
        res.status(500).json({ message: 'Error fetching bookings' });
    }
});

module.exports = router; 