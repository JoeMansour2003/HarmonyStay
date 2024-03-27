import React, { useState } from "react";
import emailjs from "emailjs-com";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import hotelsData from "../data/hotels.json";

const initialState = {
  name: "",
  email: "",
  checkInDate: "",
  checkOutDate: "",
  guests: "",
  selectedHotel: "",
};

export const Book = (props) => {
  const [{ name, email, checkInDate, checkOutDate, guests, selectedHotel }, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearState = () => setState({ ...initialState });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, checkInDate, checkOutDate, guests, selectedHotel);

    emailjs
      .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", e.target, "YOUR_USER_ID")
      .then(
        (result) => {
          console.log(result.text);
          clearState();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div>
      <div id="book">
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>Book Now</h2>
                <p>
                  Please fill out the form below to book a reservation and we will
                  get back to you as soon as possible.
                </p>
              </div>
              <form name="bookingForm" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Your Name"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="email">Your Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Your Email"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="selectedHotel">Select a Hotel</label>
                      <select
                        id="selectedHotel"
                        name="selectedHotel"
                        className="form-control"
                        required
                        onChange={handleChange}
                      >
                        <option value="">Select Hotel</option>
                        {Object.keys(hotelsData).map((chain) =>
                          hotelsData[chain].map((hotel, index) => (
                            <option key={`${chain}-${index}`} value={hotel.hotel}>
                              {hotel.hotel}
                            </option>
                          ))
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="guests">Number of Guests</label>
                      <input
                        type="number"
                        id="guests"
                        name="guests"
                        className="form-control"
                        placeholder="Number of Guests"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="checkInDate">Check-in Date</label>
                      <input
                        type="date"
                        id="checkInDate"
                        name="checkInDate"
                        className="form-control"
                        placeholder="Check-in Date"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="checkOutDate">Check-out Date</label>
                      <input
                        type="date"
                        id="checkOutDate"
                        name="checkOutDate"
                        className="form-control"
                        placeholder="Check-out Date"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-custom btn-lg">
                  Book Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};