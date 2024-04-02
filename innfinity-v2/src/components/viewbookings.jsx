import React, { useState, useEffect } from 'react';
import './viewbookings.css';

export const BookingPage = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/getbookings');
                const data = await response.json();
                setBookings(data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, []);

    const archiveBooking = async (bookingId, rentingId) => {
        console.log(`Attempting to archive booking: ${bookingId}, renting: ${rentingId}`); // Debugging log
    
        try {
            // Ensure the URL is constructed correctly
            const url = `http://localhost:3001/api/archive/${bookingId}/${rentingId}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other necessary headers here
                },
                // No body is needed since bookingId and rentingId are in the URL
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
                setBookings(currentBookings => 
                    currentBookings.filter(booking => booking.booking_number !== bookingId)
                );
            } else {
                // Handle error response here
                console.error('Failed to archive booking:', await response.text());
            }
        } catch (error) {
            console.error('Error archiving booking:', error);
        }
    };
    

    
    return (
        <div>
            <h1>Bookings</h1>
            <div className="booking-grid">
                {bookings.map((booking) => (
                    <div key={booking.booking_number} className="booking-card">
                        <p>Booking Number: {booking.booking_number}</p>
                        <p>Customer ID: {booking.customer_id}</p>
                        <p>Room Number: {booking.room_number}</p>
                        <p>Booking Date: {booking.booking_date}</p>
                        <p>Check-in Date: {booking.checkin_date}</p>
                        <p>Check-out Date: {booking.checkout_date}</p>
                        <button onClick={() => archiveBooking(booking.booking_number, booking.renting_id)}>Archive</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookingPage;
