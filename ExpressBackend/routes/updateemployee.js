const express = require('express');
const router = express.Router();
const pool = require('../db'); // Adjust this path to where your pool is defined

// Corrected PUT route
router.put('/:id', async (req, res) => { // Removed '/api/employees' prefix here
    const { id } = req.params;
    const { full_name, role } = req.body;

    try {
        const result = await pool.query(
            'UPDATE employee SET full_name = $1, role = $2 WHERE employeeid = $3 RETURNING *',
            [full_name, role, id]
        );

        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating employee' });
    }
});

module.exports = router;
