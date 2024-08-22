import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import '../styles/view.css'
import Header1 from "../components/Header1";
import HeaderOfficer from "../components/Header2";

function ViewViolation() {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => { 
    axios
      .get("http://localhost:8086/violation/all")
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
        .delete("http://localhost:8086/violation/" + id)
        .then((res) => {
          alert("Violation has deleted");
          navigate("/view-violation");
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
    <div className='page'><HeaderOfficer/></div>
    <div id="body">
      <div className="container ">
        <br />
        <h1 id="app2" className="text-center text-bg-success ">
          Violation Records
        </h1>

        <div className="text-end">
          <Link to="/create-violation" className="btn btn-primary">
            Add +
          </Link>
        </div>
        <br />
        <table className="table table-bordered  table-striped w-100 border bg-white shadow px-5 pb-5 rounded ">
          <thead>
            <tr>              
              <th>Violation ID</th>
              <th>Violation Date</th>
              <th>Violation Type</th>
              <th>Location</th>
              <th>Description</th>
              <th>Violator Name</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {records.map((d, i) => (
              <tr key={i}>
                <td>{d.violation_id}</td>
                <td>{d.violation_Date}</td>
                <td>{d.violation_type}</td>
                <td>{d.location}</td>
                <td>{d.description}</td>
                <td>{d.violator.name}</td>
                <td>
                  <button
                    onClick={(e) => handleSubmit(d.violation_id)}
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

export default ViewViolation;
