import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import '../styles/view.css';
import HeaderAdmin from "../components/Header3";

function ViewAllInvoiceCopy() {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const [invoiceData, setInvoiceData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { 
    axios
      .get("http://localhost:8086/invoice/all")
      .then((response) => {
        setColumns(Object.keys(response.data[0]));
        setRecords(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let handleSubmit = (id) => {
    const conf = window.confirm("Do you want to delete");
    if (conf) {
      axios
        .delete("http://localhost:8086/invoice/" + id)
        .then((res) => {
          alert("Invoice has deleted");
          navigate("/view-invoice");
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleViewInvoice = (Id) => {
    axios
      .get(`http://localhost:8086/invoice/${Id}`)
      .then((res) => {
        setInvoiceData(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div id="body">
      <div className='page'><HeaderAdmin/></div>
      <div className="container ">
        <br />
        <h1 id="app2" className="text-center text-bg-success ">
          Invoice Records
        </h1>

        <div className="text-end">
        </div>
        <br />
        <table className="table table-bordered  table-striped w-100 border bg-white shadow px-5 pb-5 rounded ">
          <thead>
            <tr>              
              <th>Invoice ID</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Invoice Date</th>
              <th>Violation Type</th>
              <th>Description</th>
              <th>Violator Name</th>
              <th>License Plate</th>
              <th>Vehicle Type</th>
              <th>Vehicle Model</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {records.map((d, i) => (
              <tr key={i}>
                <td>{d.invoice_id}</td>
                <td>{d.invoice_Date}</td>
                <td>{d.amount}</td>
                <td>{d.due_date}</td>
                <td>{d.violation.violation_type}</td>
                <td>{d.violation.description}</td>
                <td>{d.violation.violator.name}</td>
                <td>{d.violation.violator.license_plate}</td>
                <td>{d.violation.violator.vehicle_type}</td>
                <td>{d.violation.violator.vehicle_model}</td>
                <td>
                  <button
                    onClick={(e) => handleSubmit(d.invoice_id)}
                    className="btn btn-sm ms-1 btn-danger"
                   >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewAllInvoiceCopy;