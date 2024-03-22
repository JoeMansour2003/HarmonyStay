import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.js';
import Home from './Home';
import About from './About.js';
import Hotels from './Hotels.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About/>} />
          <Route path="/hotels" element={<Hotels/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
