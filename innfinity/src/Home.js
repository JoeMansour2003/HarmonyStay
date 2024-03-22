import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';
import './index.css';
import './App.css';
import Title from './title.js';
import Image from './mainimage.js';
import HotelsList from './HotelsList.js';

function Home() {
    return (
      <div>
        <div className="title-container">
          <Image/>
          <Title text={"WELCOME TO"} line={"INNFINITY."}/>

        </div>
        <div className="main-content">
          <HotelsList/>
        </div>
      </div>

    );
}

export default Home;