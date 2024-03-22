import React from 'react';
import './App.css';
import mainImage from './main.png';


function Image() {
  return (
    <div className="image-content">
      <img src={mainImage} className="App-logo" alt="logo" />
    </div>
  );
}

export default Image;