require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const router = express.Router();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = result.rows[0];

    // Directly compare the plain text passwords
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate a token as before
    const token = jwt.sign({ userId: user.user_id, role: user.role }, process.env.JWT_SECRET || 'JT4jNrO40BSkElWpMQ9pvy8bRXStk6aYQjmc7TrSXsQ=', { expiresIn: '1h' });

    res.json({ token, role: user.role });
  } catch (err) {
    console.error("Error details:", err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
