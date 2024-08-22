import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import '../styles/view.css'
import HeaderAdmin from "../components/Header3";

function ViewOfficer() {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => { 
    axios
      .get("http://localhost:8086/officer/all")
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
        .delete("http://localhost:8086/officer/" + id)
        .then((res) => {
          alert("Officer  has deleted");
          navigate("/view-officer");
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div id="body">
    <div className='page'>
      <HeaderAdmin />
    </div>
      <div className="container ">
        <br />
        <h1 id="app2" className="text-center text-bg-success ">
          Officer Details 
        </h1>

        <div className="text-end">
        </div>
        <br />
        <table className="table table-bordered  table-striped w-100 border bg-white shadow px-5 pb-5 rounded ">
          <thead>
            <tr>
               
              <th>Officer ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {records.map((d, i) => (
              <tr key={i}>
                <td>{d.officer_id}</td>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>{d.phone_number}</td>
                <td>{d.address}</td>

                <td>
                <Link
                    to={`/edit-officer/${d.officer_id}`}
                    className="btn btn-sm btn-success "
                  >
                    Update
                  </Link>
                  <button
                    onClick={(e) => handleSubmit(d.officer_id)}
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

export default ViewOfficer;
