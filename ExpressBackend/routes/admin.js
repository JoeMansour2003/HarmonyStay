const express = require('express');
const router = express.Router();

router.put('/api/admin/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
        const updatedEmployee = await updateEmployeeById(id, { name, email });

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

// This is a placeholder function, replace it with your actual data access method
async function updateEmployeeById(id, { name, email }) {
    try {
      const result = await pool.query(
        'UPDATE employees SET name = $1, email = $2 WHERE id = $3 RETURNING *',
        [name, email, id]
      );
      return result.rows[0]; // Assuming 'RETURNING *' gives us the updated employee
    } catch (err) {
      console.error('Error updating employee:', err);
      throw err;
    }
  }
