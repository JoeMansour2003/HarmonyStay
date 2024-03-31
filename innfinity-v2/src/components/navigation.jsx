import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const location = useLocation();

  const handleScroll = (e, selector) => {
    // Check if we're currently on the homepage
    if (location.pathname === "/") {
      e.preventDefault(); // Prevent default link behavior
      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    // If not on the homepage, the <Link> to="/" with state will handle navigation
  };

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link to="/" className="navbar-brand page-scroll">
            <img src="tabicon.png" alt="InnFinity" className="nav-logo"/>
          </Link>
          <Link to="/" className="navbar-brand page-scroll">
            InnFinity
          </Link>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            {/* Use an <a> tag with onClick for in-page navigation; for external pages, use <Link> */}
            <li>
              <a href="#about" onClick={(e) => handleScroll(e, '#about')} className="page-scroll">About</a>
            </li>
            <li>
              <a href="#features" onClick={(e) => handleScroll(e, '#features')} className="page-scroll">Features</a>
            </li>
            <li>
              <a href="#book" onClick={(e) => handleScroll(e, '#book')} className="page-scroll">Book</a>
            </li>
            <li>
              <a href="#gallery" onClick={(e) => handleScroll(e, '#gallery')} className="page-scroll">Gallery</a>
            </li>
            <li>
              <a href="#services" onClick={(e) => handleScroll(e, '#services')} className="page-scroll">Services</a>
            </li>
            <li>
              <a href="#testimonials" onClick={(e) => handleScroll(e, '#testimonials')} className="page-scroll">Testimonials</a>
            </li>
            <li>
              <a href="#team" onClick={(e) => handleScroll(e, '#team')} className="page-scroll">Team</a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => handleScroll(e, '#contact')} className="page-scroll">Contact</a>
            </li>
            {/* For the Login, use <Link> for navigation to a different route */}
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
