import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../App.css';
import React, { useState } from 'react';

function HeaderViolator() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleClick = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <Link to="/login-home">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
        </div>
        <button className="nav-toggle" onClick={handleToggleClick}>
           ☰
       </button>
        <nav className={`nav ${isNavOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <Link to="/login-home">Home</Link>
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
              <Link to="/payment-invoice">Payment</Link>
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

export default HeaderViolator;
