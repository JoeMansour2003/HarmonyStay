import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HotelsList = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/hotels')
      .then(response => {
        setHotels(response.data);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      })
  }, []);

  return (
    <div>
      {hotels.length > 0 ? (
        <ul>
          {hotels.map(hotel => <li key={hotel.id}>{hotel.name}</li>)}
        </ul>
      ) : (
        <p>No hotels found.</p>
      )}
    </div>
  );
};

export default HotelsList;
