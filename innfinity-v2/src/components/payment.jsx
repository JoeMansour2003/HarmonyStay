import React from 'react';
import './payment.css';

export const Payment = () => {
  return (
    <div className="payment-wrapper">
      <div className="form-wrapper">
        <div className="payment-header">
          <h1>Payment Form</h1>
        </div>
        <div className="container-payment">
          <form>
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <input type="text" className="form-control" id="cardNumber" placeholder="Enter card number" />
              </div></div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="expiryMonth">Expiry Month</label>
                <select id="expiryMonth" className="form-control">
                  <option>Month of Expiry</option>
                  <option>01</option>
                  <option>02</option>
                  <option>03</option>
                  <option>04</option>
                  <option>05</option>
                  <option>06</option>
                  <option>07</option>
                  <option>08</option>
                  <option>09</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                </select>
              </div></div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="expiryYear">Expiry Year</label>
                <select id="expiryYear" className="form-control">
                  <option>Year of Expiry</option>
                  <option>2024</option>
                  <option>2025</option>
                  <option>2026</option>
                  <option>2027</option>
                  <option>2028</option>
                  <option>2029</option>
                </select>
              </div></div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input type="text" className="form-control" id="cvv" placeholder="CVV" />
              </div></div>
            <div className="col-md-8">
              <div className="form-group">
                <label htmlFor="nameOnCard">Name on Card</label>
                <input type="text" className="form-control" id="nameOnCard" placeholder="Name on Card" />
              </div></div>
            <div className="col-md-12">
              <div>
                <button type="button" className="btn btn-primary" id='pay-now'>Pay Now</button>
              </div></div>
          </form>
        </div>
      </div>
    </div>
  );
};