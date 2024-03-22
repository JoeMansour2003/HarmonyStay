import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './navbar.css';
import HotelsList from './HotelsList';
import Home from './Home';
import Navbar from './Navbar';
import About from './about.js';
import Title from './title.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Home />
      </div>
    </Router>
  );
}

export default App;
