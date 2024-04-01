const express = require('express');
const router = express.Router();
const pool = require('../db');

router.put('/admin/:id', async (req, res) => {
  const { id } = req.params;
  const {
      full_name, role, sin, address_street_number, address_street_name,
      city, province, zip, works_for_hotel_id, works_for_chain_name
  } = req.body;

    try {
        const updatedEmployee = await updateEmployeeById(id, {
            full_name, role, sin, address_street_number, address_street_name,
            city, province, zip, works_for_hotel_id, works_for_chain_name
        });

        if (updatedEmployee) {
            res.json({ message: 'Employee updated successfully', employee: updatedEmployee });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        console.error('Failed to update employee:', error);
        res.status(500).json({ message: 'Error updating employee' });
    }
});

module.exports = router;

async function updateEmployeeById(id, employeeDetails) {
    const {
        full_name, role, sin, address_street_number, address_street_name,
        city, province, zip, works_for_hotel_id, works_for_chain_name
    } = employeeDetails;

    try {
        const query = `
        UPDATE employees SET 
        full_name = $1, 
        role = $2, 
        sin = $3, 
        address_street_number = $4, 
        address_street_name = $5, 
        city = $6, 
        province = $7, 
        zip = $8, 
        works_for_hotel_id = $9, 
        works_for_chain_name = $10 
    WHERE employeeid = $11 RETURNING *;
    `;

        const values = [
            full_name, role, sin, address_street_number, address_street_name,
            city, province, zip, works_for_hotel_id, works_for_chain_name, id
        ];

        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error updating employee:', err);
        throw err;
    }
}
