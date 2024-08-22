import React, { useState } from "react";
import axios from "axios";
import "../styles/invoice.css"; 
import Header1 from "../components/Header1";
import { useNavigate } from 'react-router-dom';

function PaymentInvoice() {
  const [invoices, setInvoices] = useState([]);
  const [searchName, setSearchName] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate(); // Hook to handle navigation

  const handleSearch = () => {
    if (!searchName) {
      return;
    }

    setLoading(true);
    axios.get(`http://localhost:8086/invoice/name/${encodeURIComponent(searchName)}`)
      .then((res) => {
        setInvoices(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("An error occurred while fetching the invoices.");
        setLoading(false);
      });
  };

  const handleProceedToPayment = (amount, invoiceData) => {
    // Store invoice data in sessionStorage
    sessionStorage.setItem('invoiceData', JSON.stringify([invoiceData]));

    // Navigate to the payment page with amount as state
    navigate('/payment', { state: { amount } });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className='page'>
        <Header1 />
      </div>
      <div className="payment-advice">
        <h3>Important Advice</h3>
        <p>Traffic violations can lead to serious consequences including fines and legal trouble. To avoid future violations:</p>
        <ul>
          <li>Always obey traffic signals and signs.</li>
          <li>Ensure your vehicle is in good condition and meets safety requirements.</li>
          <li>Do not use your phone while driving, and avoid distractions.</li>
          <li>Follow speed limits and be aware of road conditions.</li>
          <li>Respect pedestrian crossings and always yield to pedestrians.</li>
        </ul>
        <p>Taking these precautions can help you avoid traffic violations and ensure the safety of all road users.</p>
      </div>

      <div className="payment-instructions">
        <h3>Payment Instructions</h3>
        <p>To make a payment for your invoice, follow these steps:</p>
        <ol>
          <li>Enter the name you provided to the officer at the time of the violation in the box below</li>
          <li>Click the "Submit" button to view your invoice.</li>
          <li>Carefully review the invoice details. If any information appears incorrect or does not match your records, please contact the support team for assistance.</li>
          <li>Select your preferred payment method, such as credit/debit card or UPI (Unified Payments Interface).</li>
          <li>Enter the required payment details and proceed to complete the payment for the violation.</li>
          <li>If you have any questions or require further assistance, please reach out to our support team at cvelanias@gmail.com.</li>
          <li>Ensure that you make your payment before the due date to avoid any additional penalties.</li>
        </ol>
      </div>
      <div className="invoice-input">
        <label className="label-style" htmlFor="violationID">Enter Name:</label>
        <input 
          type="text" 
          value={searchName} 
          onChange={(e) => setSearchName(e.target.value)} 
        />
      </div>
      <div className="invoice-button">
        <button className="btn btn-primary" onClick={handleSearch}>Submit</button>
      </div>
      {invoices.length === 0 ? (
        <div></div>
      ) : (
        <div className="invoice-bill">
          <h1>Invoice Details</h1>
          {invoices.map((invoice) => (
            <div key={invoice.invoice_id} className="invoice-detail">
              <div className="invoice-item">
                <span className="invoice-label">Invoice ID:</span>
                <span className="invoice-value">{invoice.invoice_id}</span>
              </div>
              <div className="invoice-item">
                <span className="invoice-label">Violator Name:</span>
                <span className="invoice-value">{invoice.violation?.violator?.name}</span>
              </div>
              <div className="invoice-item">
                <span className="invoice-label">License Plate:</span>
                <span className="invoice-value">{invoice.violation?.violator?.license_plate}</span>
              </div>
              <div className="invoice-item">
                <span className="invoice-label">Vehicle Type:</span>
                <span className="invoice-value">{invoice.violation?.violator?.vehicle_type}</span>
              </div>
              <div className="invoice-item">
                <span className="invoice-label">Vehicle Model:</span>
                <span className="invoice-value">{invoice.violation?.violator?.vehicle_model}</span>
              </div>
              <div className="invoice-item">
                <span className="invoice-label">Violation Type:</span>
                <span className="invoice-value">{invoice.violation?.violation_type}</span>
              </div>
              <div className="invoice-item">
                <span className="invoice-label">Description:</span>
                <span className="invoice-value">{invoice.violation?.description}</span>
              </div>
              <div className="invoice-detail">
                <div className="invoice-item">
                  <span className="invoice-label">Invoice Date:</span>
                  <span className="invoice-value">{invoice.invoice_Date}</span>
                </div>
                <div className="invoice-item">
                  <span className="invoice-label">Amount:</span>
                  <span className="invoice-value">{invoice.amount}</span>
                </div>
                <div className="invoice-item">
                  <span className="invoice-label">Due Date:</span>
                  <span className="invoice-value">{invoice.due_date}</span>
                </div>
                <br/>
                <div className="invoice-button">
                  <button 
                    className="btn btn-primary" 
                    style={{ width: '40%' }} 
                    onClick={() => handleProceedToPayment(invoice.amount, invoice)}
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PaymentInvoice;







