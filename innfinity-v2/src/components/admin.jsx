// Admin.js
import React, { useState, useEffect } from 'react';

const Admin = () => {
    const [employees, setEmployees] = useState([]);
    const [editingEmployeeId, setEditingEmployeeId] = useState(null);
    const [editFormData, setEditFormData] = useState({ name: '', email: '' });

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/employees');
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    const handleEditClick = (employee) => {
        setEditingEmployeeId(employee.id);
        setEditFormData({ name: employee.name, email: employee.email });
    };

    const handleEditFormChange = (e) => {
        setEditFormData({
            ...editFormData,
            [e.target.name]: e.target.value,
        });
    };

    const handleEditFormSubmit = async (e) => {
        e.preventDefault();
        const editedEmployee = {
            id: editingEmployeeId,
            ...editFormData,
        };

        await fetch(`http://localhost:3001/api/employees/${editingEmployeeId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editedEmployee),
        });

        const updatedEmployees = [...employees];
        const index = employees.findIndex((employee) => employee.id === editingEmployeeId);
        updatedEmployees[index] = editedEmployee;

        setEmployees(updatedEmployees);
        setEditingEmployeeId(null);
    };

    const handleCancelClick = () => {
        setEditingEmployeeId(null);
    };

    return (
        <div>
            <h1>Admin Page</h1>
            <div className="employee-grid">
                {employees.map((employee) => (
                    <div key={employee.employeeid} className="employee-card">
                        <div>ID: {employee.employeeid}</div>
                        <div>Name: {employee.full_name}</div>
                        <div>Email: {employee.sin} {/* Assuming SIN is used temporarily in place of email */}</div>
                        <div>Address: {employee.address_street_number} {employee.address_street_name}, {employee.city}, {employee.province}, {employee.zip}</div>
                        <div>Role: {employee.role}</div>
                        <div>Hotel ID: {employee.works_for_hotel_id}</div>
                        <div>Chain Name: {employee.works_for_chain_name}</div>
                        <button onClick={() => handleEditClick(employee)}>Edit</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Admin;