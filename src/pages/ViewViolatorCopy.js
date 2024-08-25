import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import '../styles/view.css'
import Swal from "sweetalert2";
import HeaderAdmin from "../components/Header3";

function ViewViolatorCopy() {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => { 
    axios
      .get("http://localhost:8086/violator/all")
      .then((response) => {
        setColumns(Object.keys(response.data[0]));
        setRecords(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let handleSubmit = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this violator?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("http://localhost:8086/violator/" + id)
          .then((res) => {
            Swal.fire(
              'Deleted!',
              'Violator has been deleted.',
              'success'
            );
            navigate("/view-violator");
            window.location.reload();
          })
          .catch((err) => {
            Swal.fire(
              'Error!',
              'There was an error deleting the violator.',
              'error'
            );
            console.log(err);
          });
      }
    });
  };

  return (
    <div id="body">
    <div className='page'><HeaderAdmin/></div>
      <div className="container ">
        <br />
        <h1 id="app2" className="text-center text-bg-success ">
          Violator Details 
        </h1>

        <div className="text-end">
        </div>
        <br />
        <table className="table table-bordered  table-striped w-100 border bg-white shadow px-5 pb-5 rounded ">
          <thead>
            <tr>
               
              <th>Violator ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Gender</th>
              <th>License Plate</th>
              <th>Vehicle Type</th>
              <th>Vehicle Model</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {records.map((d, i) => (
              <tr key={i}>
                <td>{d.violator_id}</td>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>{d.phone_number}</td>
                <td>{d.address}</td>
                <td>{d.gender}</td>
                <td>{d.license_plate}</td>
                <td>{d.vehicle_type}</td>
                <td>{d.vehicle_model}</td>

                <td>
                  <button
                    onClick={(e) => handleSubmit(d.violator_id)}
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

export default ViewViolatorCopy;
