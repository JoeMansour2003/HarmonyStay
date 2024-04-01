const express = require('express');
const router = express.Router();
const pool = require('../db'); // Adjust this path based on your setup

router.get('/', async (req, res) => {
    const { rating, province } = req.query;
    let baseQuery = 'SELECT * FROM hotel';
    let conditions = [];
    let params = [];

    if (rating) {
        conditions.push('rating = $1');
        params.push(rating);
    }
    if (province) {
        conditions.push('province = $' + (params.length + 1));
        params.push(province);
    }
    if (conditions.length > 0) {
        baseQuery += ' WHERE ' + conditions.join(' AND ');
    }

    try {
        const result = await pool.query(baseQuery, params);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching hotels' });
    }
});

module.exports = router;
