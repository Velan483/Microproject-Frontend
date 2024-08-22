import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/invoice.css"; // Adjust path as necessary
import HeaderOfficer from "../components/Header2";
import Swal from 'sweetalert2'; // Import SweetAlert2

function ViewInvoice() {
  const { invoiceId } = useParams(); // Retrieve invoiceId from URL parameters
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch invoice details based on invoiceId from URL
    axios.get(`http://localhost:8086/invoice/${invoiceId}`)
      .then((res) => {
        setInvoice(res.data);
      })
      .catch((err) => console.error(err));
  }, [invoiceId]);

  const handleSendMail = () => {
    setLoading(true); // Start loading

    // Prepare email data with HTML formatting
    const emailData = new URLSearchParams({
      from: 'noreply@yourdomain.com', // Your "noreply" email address
      to: 'balavelias@gmail.com', // Recipient email address
      subject: `${invoice?.violation?.violator?.name} Violation Invoice Details`,
      body: `
        <p><strong>Invoice ID:</strong> ${invoice?.invoice_id}</p>
        <p><strong>Invoice Date:</strong> ${invoice?.invoice_Date}</p>
        <p><strong>Amount:</strong> ${invoice?.amount}</p>
        <p><strong>Due Date:</strong> ${invoice?.due_date}</p>
        <p><strong>Violation Type:</strong> ${invoice?.violation?.violation_type}</p>
        <p><strong>Description:</strong> ${invoice?.violation?.description}</p>
        <p><strong>Violator Name:</strong> ${invoice?.violation?.violator?.name}</p>
        <p><strong>License Plate:</strong> ${invoice?.violation?.violator?.license_plate}</p>
        <p><strong>Vehicle Type:</strong> ${invoice?.violation?.violator?.vehicle_type}</p>
        <p><strong>Vehicle Model:</strong> ${invoice?.violation?.violator?.vehicle_model}</p>
        <p><strong>Note:</strong> Please use your credentials to log in to the portal and proceed with the payment for the violation.</p>
        <p><strong>Registered Email:</strong> ${invoice?.violation?.violator?.email}</p>
        <p><strong>Registered Password:</strong> ${invoice?.violation?.violator?.password}</p>
      `
    });

    // Send email request
    axios.post('http://localhost:8086/violator/send', emailData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(() => {
      setLoading(false); // Stop loading
      Swal.fire({
        icon: 'success',
        title: 'Mail Sent Successfully',
        text: 'The email has been sent to the recipient.',
        confirmButtonText: 'OK'
      });
    })
    .catch((err) => {
      setLoading(false); // Stop loading
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Failed to Send Mail',
        text: 'There was an error sending the email. Please try again.',
        confirmButtonText: 'OK'
      });
    });
  };

  if (!invoice) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='page'><HeaderOfficer/></div>
      <div className="invoice-bill">
        <h1>Invoice Details</h1>
        <div className="invoice-detail">
          <div className="invoice-item">
            <span className="invoice-label">Invoice ID:</span>
            <span className="invoice-value">{invoice.invoice_id}</span>
          </div>
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
          <div className="invoice-item">
            <span className="invoice-label">Violation Type:</span>
            <span className="invoice-value">{invoice.violation?.violation_type}</span>
          </div>
          <div className="invoice-item">
            <span className="invoice-label">Description:</span>
            <span className="invoice-value">{invoice.violation?.description}</span>
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
        </div>
        <div className="invoice-action">
          {loading ? (
            <div className="loading-spinner">
              <span>Sending mail...</span>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={handleSendMail}>Send Mail</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewInvoice;


