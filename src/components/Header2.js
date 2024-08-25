import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../App.css';

function HeaderOfficer() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleClick = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = () => {
    sessionStorage.clear(); // Clear all session data
    navigate('/'); // Redirect to login page
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <Link to="/officer-home">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
        </div>
        <button className="nav-toggle" onClick={handleToggleClick}>
          ☰
        </button>
        <nav className={`nav ${isNavOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <Link to="/officer-home">Home</Link>
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
            <li>
              <Link to="/officer-dashboard">Dashboard</Link>
            </li>
            <li>
              <button className='btn btn-danger' onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default HeaderOfficer;
