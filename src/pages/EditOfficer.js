import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/App2.css";
import HeaderAdmin from "../components/Header3";

function EditOfficer() {
  
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get("http://localhost:8086/officer/" + id)
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  }, [id]);

  let handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    let result = validateValues(data);
    console.log("Validation result:", result);
    if (result === true) {
      axios.put("http://localhost:8086/officer", data)
        .then((res) => {
          alert("Officer Updated Successfully");
          navigate("/view-officer");
        })
        .catch((err) => console.log(err));
    }
  };

  const validateValues = (inputData) => {
    console.log("Validating data:", inputData);
    if (inputData.name.length === 0) {
      alert("Please enter the Name !!! ");
      return false;
    } else if (inputData.email.length === 0) {
      alert("Please enter the Email!!!");
      return false;
    } else if (inputData.password.length === 0) {
      alert("Please enter the Password!!!");
      return false;
    } else if (inputData.confrim_password.length === 0) {
      alert("Please enter the Confrim Password!!!");
      return false;
    } else if (inputData.confrim_password !== inputData.password) {
      alert("Confrim Password is not matched with Password!!!");
      return false;
    } else if (inputData.phone_number.length === 0) {
      alert("Please enter the Phone Number!!!");
      return false;
    } else if (inputData.address.length === 0) {
      alert("Please enter the Address!!!");
      return false;
    } else {
      return true;
    }
  };

  return (
    <div>
      <div className='page'>
      <HeaderAdmin />
      </div>
      <div
        id="edit2"
        className="d-flex w-100 vh-100 justify-content-center align-items-center "
      >
        <div className="w-50 border bg-light p-5">
          <form onSubmit={handleSubmit}>
            <h1>UPDATE OFFICER DATA</h1>
            <br/>
            <div>
              <label htmlFor="officer_id">Officer ID :</label><br/><br/>
              <input
                type="text"
                disabled
                name="officer_id"
                className="form-control"
                value={data.officer_id}
              />
            </div>
            <br/>
            <div>
              <label htmlFor="name">Name :</label><br/><br/>
              <input
                type="text"
                name="name"
                className="form-control"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>
            <br/>
            <div>
              <label htmlFor="email">Email :</label><br/><br/>
              <input
                type="text"
                name="email"
                className="form-control"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <br/>
            <div>
              <label htmlFor="password">Password :</label><br/><br/>
              <input
                type="text"
                name="password"
                className="form-control"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
            <br />
            <div>
              <label htmlFor="confrim_password">Confrim Password :</label><br/><br/>
              <input
                type="text"
                name="confrim_password"
                className="form-control"
                value={data.confrim_password}
                onChange={(e) => setData({ ...data, confrim_password: e.target.value })}
              />
            </div>
            <br />
            <div>
              <label htmlFor="phone_number">Phone Number :</label><br/><br/>
              <input
                type="text"
                name="phone_number"
                className="form-control"
                value={data.phone_number}
                onChange={(e) => setData({ ...data, phone_number: e.target.value })}
              />
            </div>
            <br />
            <div>
              <label htmlFor="address">Address :</label><br/><br/>
              <input
                type="text"
                name="address"
                className="form-control"
                value={data.address}
                onChange={(e) => setData({ ...data, address: e.target.value })}
              />
            </div>
            <br /><br />

            <button className="btn btn-info" style={{ width: '100%' }}>Update</button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default EditOfficer;
