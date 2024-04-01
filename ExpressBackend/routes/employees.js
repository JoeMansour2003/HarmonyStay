// app.get('/api/employees', async (req, res) => {
//     try {
//       const result = await pool.query('SELECT * FROM employee');
//       res.json(result.rows);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Error fetching employees' });
//     }
//   });
  
const express = require('express');
const router = express.Router();
const db = require('../db'); 

router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM employee');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;
