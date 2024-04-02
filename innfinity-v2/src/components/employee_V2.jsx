import React, { useState, useEffect } from "react";
import axios from "axios";

const initialState = {
  booking_id: "",
  payment_status: "",
  employee_id: "",
};

export const EmployeeV2 = () => {
  const [bookingList, setBookingList] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const [employeesList, setEmployeesList] = useState([]);
  const [otherData, setOtherData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/booking")
      .then((response) => {
        setBookingList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    axios
      .get("http://localhost:3001/api/employees")
      .then((response) => {
        setEmployeesList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(`http://localhost:3001/api/bookingid/${formData.booking_id}`)
      .then((response) => {
        setOtherData(response.data);
        const dataToSend = {
          ...formData,
          ...otherData,
        };
        axios
          .post("http://localhost:3001/api/createRenting", dataToSend)
          .then((response) => {
            console.log(response);
            setFormData(initialState);
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error creating renting: ", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching booking data: ", error);
      });
  };

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Booking:</label>
          <select name="booking_id" onChange={handleChange} required>
            <option value="">Select a booking</option>
            {bookingList.map((booking) => (
              <option
                key={booking.booking_number}
                value={booking.booking_number}
              >
                room number: {booking.room_number}, checkin_date:{" "}
                {booking.checkin_date}, checkout_date: {booking.checkout_date}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Payment Status:</label>
          <select name="payment_status" onChange={handleChange} required>
            <option value="">Select a status</option>
            <option value="approved">Approved</option>
            <option value="denied">Denied</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div>
          <label>Employee:</label>
          <select name="employee_id" onChange={handleChange} required>
            <option value="">Select an employee</option>
            {employeesList.map((employee) => (
              <option key={employee.employeeid} value={employee.employeeid}>
                {employee.full_name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
