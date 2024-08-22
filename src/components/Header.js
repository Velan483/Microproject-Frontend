import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../App.css';

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  const [isNavOpen, setIsNavOpen] = useState(false);

     const handleToggleClick = () => {
     setIsNavOpen(!isNavOpen);
};

  return (
    <header className="header">
    <div className="header-content">
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>
      <button className="nav-toggle" onClick={handleToggleClick}>
        ☰
      </button>
      <nav className={`nav ${isNavOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about-us">About Us</a>
          </li>
          <li>
            <a href="#traffic-rules">Traffic Rules</a>
          </li>
          <li>
            <a href="#contact-us">Contact Us</a>
          </li>
          <li
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="dropdown"
          >
            <Link to="#">Login</Link>
            {showDropdown && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/adminlogin">Admin Login</Link>
                </li>
                <li>
                  <Link to="/officerlogin">Officer Login</Link></li>
                <li>
                  <Link to="/violatorlogin">Violator Login</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  </header>
  
  );
}

export default Header;
