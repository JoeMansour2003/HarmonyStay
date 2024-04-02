import emailjs from "emailjs-com";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Book from "./book";
import './employeeportal.css';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const initialState = {
  // Employee input data

  //   full_name: "",
  //   employee_address: "",
  //   employee_SIN: "",

  // Customer input data
  name: "",
  email: "",
  checkInDate: "",
  checkOutDate: "",
  guests: "",
  selectedHotel: "",
  renting_id: "",
  Customer_id: "",
  room_number: "",
  renting_date: "",
  payment_status: "",
  employee_id: "",
};

export const Employee = (props) => {
  const [renting, setRenting] = useState([]);
  const [employeesList, setEmployeesList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [roomNumberList, setRoomNumber] = useState([]);
  const [bookingList, setBooking] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/booking")
      .then((response) => {
        setBooking(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/room_number")
      .then((response) => {
        setRoomNumber(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/customer")
      .then((response) => {
        setCustomerList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/employees")
      .then((response) => {
        setEmployeesList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/renting")
      .then((response) => {
        setRenting(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/createRenting", formData)
      .then((response) => {
        console.log(response);
        // You might want to clear the form here
        setFormData(initialState);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error creating renting: ", error);
      });
  };

  const [formData, setFormData] = useState(initialState);

  return (
    <div id="renting">
      <div className="container">
        <div className="col-md-12">
          <div className="row">
            <div className="section-title">
              <h2>Create new Renting if user has an account</h2>
              <p>Please fill out this form to complete the renting process.</p>
            </div>
            <form name="renting" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="employee_info">Employee info</label>
                    <select
                      //   type="text"
                      id="employee_info"
                      name="employee_info"
                      className="form-control"
                      //   placeholder="Select Empolyee"
                      required
                      onChange={handleChange}
                    >
                      <option value="">Select Empolyee</option>
                      {employeesList.map((employee) => (
                        <option
                          key={employee.employeeid}
                          value={employee.full_name}
                        >
                          {employee.full_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="Customer_id">Customer ID</label>
                    <select
                      //   type="text"
                      id="Customer_id"
                      name="Customer_id"
                      className="form-control"
                      //   placeholder="Customer ID"
                      required
                      onChange={handleChange}
                    >
                      <option value="">Select Customer</option>
                      {customerList.map((customer) => (
                        <option
                          key={customer.customer_id}
                          value={customer.customer_id}
                        >
                          {customer.first_name} {customer.last_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="room_number">Room Number</label>
                    <select
                      //   type="number"
                      id="room_number"
                      name="room_number"
                      className="form-control"
                      //   placeholder="Customer ID"
                      required
                      onChange={handleChange}
                    >
                      <option value="">Select room</option>
                      {roomNumberList.map((room_number) => (
                        <option
                          key={room_number.room_number}
                          value={room_number.room_number}
                        >
                          Room Number: {room_number.room_number} , Price:{" "}
                          {room_number.price}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="date">Check-in</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="form-control"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="date">Check-out</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="form-control"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <button type="submit" className="btn btn-primary" id="renting-btn">
                    Submit
                  </button>
                </div>
              </div>
            </form>
            <Book />

          </div>

          <div className="row" id="approval-box">
            <h2>Approve Renting status</h2>
            <p>Please fill out this form to approve a room rental.</p>
            <form name="approval" onSubmit={handleSubmit}>
              {/* Form content goes here */}
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="Booking_info">Booking info</label>
                  <select
                    //   type="text"
                    id="booking_info"
                    name="booking_info"
                    className="form-control"
                    //   placeholder="Select Empolyee"
                    required
                    onChange={handleChange}
                  >
                    <option value="">Select Booking</option>
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
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="Employee_id">Employee</label>
                    <select
                      //   type="text"
                      id="Employee_id"
                      name="Employee_id"
                      className="form-control"
                      //   placeholder="Customer ID"
                      required
                      onChange={handleChange}
                    >
                      <option value="">Select Employee</option>
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
                  <div className="form-group">
                    <label htmlFor="apporval">Approval</label>
                    <select
                      //   type="number"
                      id="approval"
                      name="approval"
                      className="form-control"
                      //   placeholder="Customer ID"
                      required
                      onChange={handleChange}
                    >
                      <option value="">Select Approval</option>
                      <option value="approved">Approved</option>
                      <option value="pending">Pending</option>
                      <option value="Not approved">Not approved</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="form-control"
                      required
                      onChange={handleChange}
                    />
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
        </div>
      </div>
    </div>
  );
};
