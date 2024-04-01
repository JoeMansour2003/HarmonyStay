import React from 'react';
import './confirmation.css'; 

const Confirmation = () => {
  return (
    <div className="confirmation">
      <h1 className="confirmation-title">Booking Confirmed!</h1>
      <p className="confirmation-message">
        Thank you for booking with us. Your reservation has been confirmed.
      </p>
    </div>
  );
};

export default Confirmation;