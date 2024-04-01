import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


export const Navigation = () => {
  const location = useLocation();

  const handleNavClick = (e, path) => {
    if (location.pathname === "/login") {
      e.preventDefault();
      window.location.href = path;
    }
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
          <a href="#page-top" className="navbar-brand page-scroll" onClick={(e) => handleNavClick(e, "/#page-top")}>
            <img src="tabicon.png" alt="InnFinity" className="nav-logo" />
          </a>
          <a
            href="#page-top"
            onClick={(e) => handleNavClick(e, "/#page-top")}
            className="navbar-brand"
          >
            InnFinity
          </a>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, "/#about")}
                className="page-scroll"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#features"
                onClick={(e) => handleNavClick(e, "/#features")}
                className="page-scroll"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#book"
                onClick={(e) => handleNavClick(e, "/#book")}
                className="page-scroll"
              >
                Book
              </a>
            </li>
            <li>
              <a
                href="#gallery"
                onClick={(e) => handleNavClick(e, "/#gallery")}
                className="page-scroll"
              >
                Gallery
              </a>
            </li>
            <li>
              <a
                href="#services"
                onClick={(e) => handleNavClick(e, "/#services")}
                className="page-scroll"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                onClick={(e) => handleNavClick(e, "/#testimonials")}
                className="page-scroll"
              >
                Testimonials
              </a>
            </li>
            <li>
              <a
                href="#team"
                onClick={(e) => handleNavClick(e, "/#team")}
                className="page-scroll"
              >
                Team
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "/#contact")}
                className="page-scroll"
              >
                Contact
              </a>
            </li>
            <li>
              <a href="/login" className="page-scroll">
                <FontAwesomeIcon icon={faUser} style={{ color: '#345f41' }} Login /> Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
