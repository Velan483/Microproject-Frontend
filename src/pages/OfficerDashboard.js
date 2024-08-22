import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/officerDashboard.css';
import HeaderOfficer from '../components/Header2';

function OfficerDashboard() {
  return (
    <div>
      <div className='page'><HeaderOfficer/></div>
    <div className="dashboard-container">
      <h1>Officer Dashboard</h1>
      <div className="dashboard-links">
        <Link to="/reg-violator" className="dashboard-link">Register Violator</Link>
        <Link to="/view-violator" className="dashboard-link">View Violator Records</Link>
        <Link to="/create-violation" className="dashboard-link">Create Violation</Link>
        <Link to="/view-violation" className="dashboard-link">View Violation Records</Link>
        <Link to="/invoice" className="dashboard-link">Create Invoice</Link>
        <Link to="/view-all-invoice" className="dashboard-link">View Invoice Records</Link>
      </div>
    </div>
    </div>
  );
}

export default OfficerDashboard;
