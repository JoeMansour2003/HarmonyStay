// const express = require('express');
// const router = express.Router();
// const pool = require('../db'); 

// router.post('/', async (req, res) => {
//     const bookingId = req.body.bookingId;
//     const rentingId = req.body.rentingId;
//     console.log(`Archiving Booking ID: ${bookingId}, Renting ID: ${rentingId}`); 

//     try {
//         await pool.query('BEGIN');
//         await pool.query('INSERT INTO archives (booking_number, renting_id) VALUES ($1, $2)', [bookingId, rentingId]);
//         await pool.query('DELETE FROM booking WHERE booking_number = $1', [bookingId]);
//         await pool.query('DELETE FROM renting WHERE renting_id = $1', [rentingId]);
//         await pool.query('COMMIT');
//         res.json({ message: 'Booking and renting archived successfully' });
//     } catch (err) {
//         await pool.query('ROLLBACK');
//         console.error('Failed to archive booking and renting:', err);
//         res.status(500).json({ message: 'Failed to archive booking and renting', error: err.toString() });
//     }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const { pool } = require('../db'); 

// router.post('/', async (req, res) => {
//     const { bookingId, rentingId } = req.params;
//     const client = await pool.connect();

//     try {
//         await client.query('BEGIN');
//         await client.query('INSERT INTO Archives (booking_number, renting_id) VALUES ($1, $2)', [bookingId, rentingId]);
//         await client.query('DELETE FROM Booking WHERE booking_number = $1', [bookingId]);
//         await client.query('DELETE FROM Renting WHERE renting_id = $1', [rentingId]);
//         await client.query('COMMIT');
//         res.json({ message: 'Booking and renting archived successfully' });
//     } catch (err) {
//         await client.query('ROLLBACK');
//         console.error('Failed to archive booking and renting:', err);
//         res.status(500).json({ message: 'Failed to archive booking and renting', error: err.toString() });
//     } finally {
//         client.release(); 
//     }
// });

router.post('/', async (req, res) => {
    const { bookingId, rentingId } = req.params;
    console.log(`Archiving Booking ID: ${bookingId}, Renting ID: ${rentingId}`); // Ensure these are not undefined

    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        const insertArchives = 'INSERT INTO Archives (booking_number, renting_id) VALUES ($1, $2)';
        await client.query(insertArchives, [bookingId, rentingId]);
        const deleteBooking = 'DELETE FROM Booking WHERE booking_number = $1';
        await client.query(deleteBooking, [bookingId]);
        const deleteRenting = 'DELETE FROM Renting WHERE renting_id = $1';
        await client.query(deleteRenting, [rentingId]);
        await client.query('COMMIT');
        res.json({ message: 'Booking and renting archived successfully' });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Failed to archive booking and renting:', err);
        res.status(500).json({ message: 'Failed to archive booking and renting', error: err.toString() });
    } finally {
        client.release();
    }
});


module.exports = router;

