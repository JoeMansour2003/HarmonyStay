import React, { useState, useEffect } from 'react';

const Admin = () => {
    const [employees, setEmployees] = useState([]);
    const [editingEmployeeId, setEditingEmployeeId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        full_name: '',
        role: ''
    });

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

//     const handleEditClick = (employee) => {
//         setEditingEmployeeId(employee.id);
//         setEditFormData({ name: employee.name, email: employee.email });
//     };

//     const handleEditFormChange = (e) => {
//         setEditFormData({
//             ...editFormData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleEditFormSubmit = async (e) => {
//         e.preventDefault();
//         const editedEmployee = {
//             id: editingEmployeeId,
//             ...editFormData,
//         };

//         await fetch(`http://localhost:3001/api/employees/${editingEmployeeId}`, {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(editedEmployee),
//         });

//         const updatedEmployees = [...employees];
//         const index = employees.findIndex((employee) => employee.id === editingEmployeeId);
//         updatedEmployees[index] = editedEmployee;

//         setEmployees(updatedEmployees);
//         setEditingEmployeeId(null);
//     };

//     const handleCancelClick = () => {
//         setEditingEmployeeId(null);
//     };

//     return (
//         <div>
//             <h1>Admin Page</h1>
//             <div className="employee-grid">
//                 {employees.map((employee) => (
//                     <div key={employee.employeeid} className="employee-card">
//                         <div>ID: {employee.employeeid}</div>
//                         <div>Name: {employee.full_name}</div>
//                         <div>Email: {employee.sin}</div>
//                         <div>Address: {employee.address_street_number} {employee.address_street_name}, {employee.city}, {employee.province}, {employee.zip}</div>
//                         <div>Role: {employee.role}</div>
//                         <div>Hotel ID: {employee.works_for_hotel_id}</div>
//                         <div>Chain Name: {employee.works_for_chain_name}</div>
//                         <button onClick={() => handleEditClick(employee)}>Edit</button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Admin;
const handleEditClick = (employee) => {
    setEditingEmployeeId(employee.employeeid);
    setEditFormData({
        full_name: employee.full_name,
        role: employee.role
    });
};

const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevState) => ({
        ...prevState,
        [name]: value,
    }));
};

const handleEditFormSubmit = async (e) => {
    e.preventDefault();

    const editedEmployee = {
        employeeid: editingEmployeeId,
        ...editFormData,
    };

    const response = await fetch(`http://localhost:3001/api/employees/${editingEmployeeId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedEmployee),
    });

    if (response.ok) {
        const updatedEmployees = employees.map((employee) => 
            employee.employeeid === editingEmployeeId ? { ...employee, ...editFormData } : employee
        );
        setEmployees(updatedEmployees);
        setEditingEmployeeId(null);
    } else {
        console.error('Failed to update employee.');
    }
};

const handleCancelClick = () => {
    setEditingEmployeeId(null);
};

return (
    <div>
        <h1>Admin Page</h1>
        {editingEmployeeId ? (
            <form onSubmit={handleEditFormSubmit} className="edit-form">
                <input
                    name="full_name"
                    value={editFormData.full_name}
                    onChange={handleEditFormChange}
                    required
                />
                <input
                    name="role"
                    value={editFormData.role}
                    onChange={handleEditFormChange}
                    required
                />
                <button type="submit">Save</button>
                <button onClick={handleCancelClick}>Cancel</button>
            </form>
        ) : (
            <div className="employee-grid">
                 {employees.map((employee) => (
                    <div key={employee.employeeid} className="employee-card">
                        <div>ID: {employee.employeeid}</div>
                        <div>Name: {employee.full_name}</div>
                        <div>Email: {employee.sin}</div>
                        <div>Address: {employee.address_street_number} {employee.address_street_name}, {employee.city}, {employee.province}, {employee.zip}</div>
                        <div>Role: {employee.role}</div>
                        <div>Hotel ID: {employee.works_for_hotel_id}</div>
                        <div>Chain Name: {employee.works_for_chain_name}</div>
                        <button onClick={() => handleEditClick(employee)}>Edit</button>
                    </div>
                ))}
            </div>
        )}
    </div>
);
};

export default Admin;