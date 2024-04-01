module.exports = function(app) {
        app.put('/api/employees/:id', async (req, res) => {
        const { id } = req.params;
        const { name, email } = req.body;
    
        try {
            const result = await pool.query(
                'UPDATE employee SET name = $1, email = $2 WHERE id = $3 RETURNING *',
                [name, email, id]
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
}
  