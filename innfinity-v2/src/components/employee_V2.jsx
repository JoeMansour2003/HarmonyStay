import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './employeeportal.css';
import Book from "./book";

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
  const navigate = useNavigate();

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
    <div id="renting">
      <div className="container">
        <div className="col-md-12">
          <div className="row">
            <div className="section-title">
              <h2>Employee Page</h2>
            </div>
            <form name="employeeForm" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-8">
                  <h4>Approving Rental</h4>{" "}
                  <p>
                    Please fill out the form below to create a new renting record.
                  </p></div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="booking_id">Booking:</label>
                    <select
                      id="booking_id"
                      name="booking_id"
                      className="form-control"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a booking</option>
                      {bookingList.map((booking) => (
                        <option
                          key={booking.booking_number}
                          value={booking.booking_number}
                        >
                          room number: {booking.room_number}, checkin_date:{" "}
                          {booking.checkin_date}, checkout_date:{" "}
                          {booking.checkout_date}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="payment_status">Payment Status:</label>
                    <select
                      id="payment_status"
                      name="payment_status"
                      className="form-control"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a status</option>
                      <option value="approved">Approved</option>
                      <option value="denied">Denied</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="employee_id">Employee:</label>
                    <select
                      id="employee_id"
                      name="employee_id"
                      className="form-control"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select an employee</option>
                      {employeesList.map((employee) => (
                        <option
                          key={employee.employeeid}
                          value={employee.employeeid}
                        >
                          {employee.full_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <button type="submit" className="btn btn-primary" id="renting-btn">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
          <Book />
        </div>
      </div>
    </div>
  );
};

export default EmployeeV2;
