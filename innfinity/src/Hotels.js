import React from 'react';
import './App.css';
// import Section from './components/section';
// import BigSection from './components/bigsection';
import HotelsList from './HotelsList';


function Hotels() {
  return (
    <div className='content'>
      {/* <BigSection
        subtitle="Our Hotels"
        description={
          <div className="main-content">
            <HotelsList/>
          </div>
        }
      /> */}
      <div className="title-container">
          <h1>Our Hotels</h1>
      </div>
      <div className="main-content">
          <HotelsList/>
      </div>
    </div>
  );
}

export default Hotels;