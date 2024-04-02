import React, { useState, useEffect } from "react";

const Admin = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    full_name: "",
    sin: "",
    address_street_number: "",
    address_street_name: "",
    city: "",
    province: "",
    zip: "",
    role: "",
    works_for_hotel_id: "",
    works_for_chain_name: "",
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/employees");
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleEditClick = (employee) => {
    setEditingEmployeeId(employee.employeeid);
    setEditFormData({
      full_name: employee.full_name,
      sin: employee.sin.toString(),
      address_street_number: employee.address_street_number.toString(),
      address_street_name: employee.address_street_name,
      city: employee.city,
      province: employee.province,
      zip: employee.zip,
      role: employee.role,
      works_for_hotel_id: employee.works_for_hotel_id.toString(),
      works_for_chain_name: employee.works_for_chain_name,
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
      ...editFormData,
    };

    const response = await fetch(
      `http://localhost:3001/api/employees/${editingEmployeeId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedEmployee),
      }
    );

    if (response.ok) {
      const updatedEmployees = employees.map((employee) =>
        employee.employeeid === editingEmployeeId
          ? { ...employee, ...editFormData }
          : employee
      );
      setEmployees(updatedEmployees);
      setEditingEmployeeId(null);
    } else {
      console.error("Failed to update employee.");
    }
  };

  const handleCancelClick = () => {
    setEditingEmployeeId(null);
  };

  return (
    <div className="content">
      <h1>Admin Page</h1>
      <a href="/archives" className="btn btn-custom btn-lg">
                Archives
              </a>
      {editingEmployeeId ? (
        <form onSubmit={handleEditFormSubmit} className="edit-form">
          <input
            name="full_name"
            value={editFormData.full_name}
            onChange={handleEditFormChange}
            required
            placeholder="Full Name"
          />
          <input
            name="sin"
            value={editFormData.sin}
            onChange={handleEditFormChange}
            required
            placeholder="SIN"
          />
          <input
            name="address_street_number"
            value={editFormData.address_street_number}
            onChange={handleEditFormChange}
            required
            placeholder="Street Number"
          />
          <input
            name="address_street_name"
            value={editFormData.address_street_name}
            onChange={handleEditFormChange}
            required
            placeholder="Street Name"
          />
          <input
            name="city"
            value={editFormData.city}
            onChange={handleEditFormChange}
            required
            placeholder="City"
          />
          <input
            name="province"
            value={editFormData.province}
            onChange={handleEditFormChange}
            required
            placeholder="Province"
          />
          <input
            name="zip"
            value={editFormData.zip}
            onChange={handleEditFormChange}
            required
            placeholder="ZIP"
          />
          <input
            name="role"
            value={editFormData.role}
            onChange={handleEditFormChange}
            required
            placeholder="Role"
          />
          <input
            name="works_for_hotel_id"
            value={editFormData.works_for_hotel_id}
            onChange={handleEditFormChange}
            required
            placeholder="Hotel ID"
          />
          <input
            name="works_for_chain_name"
            value={editFormData.works_for_chain_name}
            onChange={handleEditFormChange}
            required
            placeholder="Chain Name"
          />
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancelClick}>
            Cancel
          </button>
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
