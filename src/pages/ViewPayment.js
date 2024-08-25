import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import '../styles/viewpayment.css';
import HeaderAdmin from "../components/Header3";

function ViewPayment() {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8086/payment/all")
      .then((response) => {
        setRecords(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this payment record?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8086/payment/${id}`)
          .then(() => {
            Swal.fire(
              'Deleted!',
              'Payment record has been deleted.',
              'success'
            );
            setRecords(records.filter(record => record.paymentId !== id));
          })
          .catch((err) => {
            Swal.fire(
              'Error!',
              'There was an error deleting the record.',
              'error'
            );
            console.log(err);
          });
      }
    });
  };

  return (
    <div>
      <div className='page'><HeaderAdmin /></div>
      <br /><br />
      <div id="payment-body">
        <div className="payments-container">
          <h1 className="text-center text-bg-success">Payment Records</h1>
          <div className="payment-cards">
            {records.map((d, i) => (
              <div className="payment-card" key={i}>
                <div className="card-header">
                  <h3 className="text-primary">Payment ID: {d.paymentId}</h3>
                  <button
                    onClick={() => handleDelete(d.paymentId)}
                    className="payment btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </div>
                <div className="card-body">
                  <p><strong>Payment Method:</strong> {d.paymentMethod}</p>
                  {d.paymentMethod === 'card' ? (
                    <>
                      <p><strong>Card Holder Name:</strong> {d.cardHolderName}</p>
                      <p><strong>Card Number:</strong> {d.cardNumber}</p>
                      <p><strong>Expiry Date:</strong> {d.expiryDate}</p>
                      <p><strong>CVV:</strong> {d.cvv}</p>
                    </>
                  ) : d.paymentMethod === 'upi' ? (
                    <p><strong>UPI ID:</strong> {d.upiId}</p>
                  ) : (
                    <p><strong>Payment Method Details:</strong> N/A</p>
                  )}
                  <p><strong>Amount:</strong> {d.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPayment;
