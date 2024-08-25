import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import '../styles/view.css';
import HeaderAdmin from "../components/Header3";

function ViewMessage() {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => { 
    axios
      .get("http://localhost:8086/contact/all")
      .then((response) => {
        setColumns(Object.keys(response.data[0]));
        setRecords(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this message?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8086/contact/${id}`)
          .then((res) => {
            Swal.fire(
              'Deleted!',
              'Message has been deleted.',
              'success'
            );
            // Update records after deletion
            setRecords(records.filter(record => record.contact_id !== id));
          })
          .catch((err) => {
            Swal.fire(
              'Error!',
              'There was an error deleting the message.',
              'error'
            );
            console.log(err);
          });
      }
    });
  };

  return (
    <div>
      <div className='page'>
        <HeaderAdmin />
      </div>
      <div id="body">
        <div className="container">
          <br />
          <h1 id="app2" className="text-center text-bg-success">
            User Message Details
          </h1>

          <div className="text-end">
            {/* You can add other actions here if needed */}
          </div>
          <br />
          <table className="table table-bordered table-striped w-100 border bg-white shadow px-5 pb-5 rounded">
            <thead>
              <tr>
                <th>Contact ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {records.map((d, i) => (
                <tr key={i}>
                  <td>{d.contact_id}</td>
                  <td>{d.name}</td>
                  <td>{d.email}</td>
                  <td>{d.message}</td>
                  <td>
                    <button
                      onClick={() => handleSubmit(d.contact_id)}
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
    </div>
  );
}

export default ViewMessage;
