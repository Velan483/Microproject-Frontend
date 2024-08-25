import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/officerDashboard.css';
import HeaderAdmin from '../components/Header3';

function AdminDashboard() {
  return (
    <div>
    <div className='page'>
      <HeaderAdmin />
    </div>
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-links">
        <Link to="/view-violators" className="dashboard-link">View Violator</Link>
        <Link to="/view-officer" className="dashboard-link">View and Update Officer</Link>
        <Link to="/view-violations" className="dashboard-link">View Violation Records</Link>
        <Link to="/view-all-invoices" className="dashboard-link">View Invoice Records</Link>
        <Link to="/view-message" className="dashboard-link">View User Message</Link>    
        <Link to="/view-payment" className="dashboard-link">Track Payment</Link>  
      </div>
    </div>
    </div>
  );
}

export default AdminDashboard;
