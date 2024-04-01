import React, { useState, useEffect } from "react";
import axios from "axios";
import location from "../data/customer_location.json";

const initialState = {
  type: "",
  full_name: "",
  first_name: "",
  middle_name: "",
  last_name: "",
  address_street_number: "",
  address_street_name: "",
  city: "",
  province: "",
  ZIP: "",
  registration_date: new Date().toISOString().split("T")[0],
  room_number: "",
  booking_date: new Date().toISOString().split("T")[0],
  checkin_date: "",
  checkout_date: "",
};

export const Book = () => {
  const [formData, setFormData] = useState(initialState);
  const [hotels, setHotels] = useState([]);
  const [roomNumbers, setRoomNumbers] = useState([]);
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/hotels");
      setHotels(response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const fetchRoomNumbers = async (hotelId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/hotels/${hotelId}/rooms`
      );
      setRoomNumbers(response.data);
    } catch (error) {
      console.error("Error fetching room numbers:", error);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "hotel_name") {
      fetchRoomNumbers(value);
    }
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setCountry(selectedCountry);
    setProvince("");
    setCities([]);
  };

  const handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    setProvince(selectedProvince);
    setCities(location[country][selectedProvince]);
  };

  const clearFormData = () => setFormData({ ...initialState });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const customerResponse = await axios.post(
        "http://localhost:3001/api/customers",
        formData
      );
      console.log(
        "Customer data successfully submitted:",
        customerResponse.data
      );

      const customerId = customerResponse.data.Customer_id;

      const bookingData = {
        ...formData,
        Customer_id: customerId,
      };

      const bookingResponse = await axios.post(
        "http://localhost:3001/api/bookings",
        bookingData
      );
      console.log("Booking data successfully submitted:", bookingResponse.data);

      clearFormData();
    } catch (error) {
      console.error("Error submitting booking:", error);
    }
  };

  return (
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
              {/* Customer information fields */}

              <div className="row">
                <h4>Customer Information</h4>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      className="form-control"
                      placeholder="First Name"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="middle_name">Middle Name</label>
                    <input
                      type="text"
                      id="middle_name"
                      name="middle_name"
                      className="form-control"
                      placeholder="Middle Name"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      className="form-control"
                      placeholder="Last Name"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <select
                      id="country"
                      name="country"
                      className="form-control"
                      onChange={handleCountryChange}
                      required
                    >
                      <option value="">Select Country</option>
                      <option value="Canada">Canada</option>
                      <option value="United States">United States</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="province">Province/State</label>
                    <select
                      id="province"
                      name="province"
                      className="form-control"
                      onChange={handleProvinceChange}
                      required
                      disabled={!country}
                    >
                      <option value="">
                        Select {country === "Canada" ? "Province" : "State"}
                      </option>
                      {country &&
                        location[country] &&
                        Object.keys(location[country]).map((province) => (
                          <option key={province} value={province}>
                            {province}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <select
                      id="city"
                      name="city"
                      className="form-control"
                      onChange={handleChange}
                      required
                      disabled={!province}
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {country === "Canada" ? (
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="ZIP">Postal Code</label>
                      <input
                        type="text"
                        id="ZIP"
                        name="ZIP"
                        className="form-control"
                        placeholder="Postal Code"
                        pattern="[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                ) : country === "United States" ? (
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="ZIP">ZIP Code</label>
                      <input
                        type="text"
                        id="ZIP"
                        name="ZIP"
                        className="form-control"
                        placeholder="ZIP Code"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                ) : null}

                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="address_street_number">Street Number</label>
                    <input
                      type="text"
                      id="address_street_number"
                      name="address_street_number"
                      className="form-control"
                      placeholder="Street Number"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="form-group">
                    <label htmlFor="address_street_name">Street Name</label>
                    <input
                      type="text"
                      id="address_street_name"
                      name="address_street_name"
                      className="form-control"
                      placeholder="Street Name"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Booking information fields */}

              <div className="row">
                <h4>Booking Information</h4>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="number">Phone Number</label>
                    <input
                      type="number"
                      id="number"
                      name="number"
                      className="form-control"
                      placeholder="Phone Number"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="hotel_name">Hotel Name</label>
                    <select
                      id="hotel_name"
                      name="hotel_name"
                      className="form-control"
                      required
                      onChange={handleChange}
                    >
                      <option value="">Select Hotel</option>
                      {hotels.map((hotel) => (
                        <option key={hotel.hotel_id} value={hotel.hotel_id}>
                          {hotel.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="room_number">Room Number</label>
                    <select
                      id="room_number"
                      name="room_number"
                      className="form-control"
                      required
                      onChange={handleChange}
                    >
                      <option value="">Select Room Number</option>
                      {roomNumbers.map((room) => (
                        <option key={room.room_number} value={room.room_number}>
                          {room.room_number}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="checkin_date">Check-in Date</label>
                    <input
                      type="date"
                      id="checkin_date"
                      name="checkin_date"
                      className="form-control"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="checkout_date">Check-out Date</label>
                    <input
                      type="date"
                      id="checkout_date"
                      name="checkout_date"
                      className="form-control"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <a href="/payment" className="btn btn-custom btn-lg">
                Book Now
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
