import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../App.css';
import React, { useState } from 'react';

function HeaderAdmin() {

  const [isNavOpen, setIsNavOpen] = useState(false);

         const handleToggleClick = () => {
         setIsNavOpen(!isNavOpen);
    };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <Link to="/admin-home">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
        </div>
        <button className="nav-toggle" onClick={handleToggleClick}>
           ☰
       </button>
        <nav className={`nav ${isNavOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <Link to="/admin-home">Home</Link>
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
              <Link to="/admin-dashboard">Dashboard</Link>
            </li>
            <li>
              <button className='btn btn-danger'>
                <Link to="/">Logout</Link>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default HeaderAdmin;
