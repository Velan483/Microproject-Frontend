import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/App2.css";
import HeaderOfficer from "../components/Header2";
import Swal from 'sweetalert2';

function EditViolator() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8086/violator/${id}`)
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  }, [id]);

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        error = value ? '' : 'Please enter the Name!';
        break;
      case 'email':
        error = value ? '' : 'Please enter the Email!';
        break;
      case 'password':
        error = value ? '' : 'Please enter the Password!';
        break;
      case 'confrim_password':
        error = value
          ? value === data.password
            ? ''
            : 'Confirm Password does not match Password!'
          : 'Please enter the Confirm Password!';
        break;
      case 'phone_number':
        error = value ? '' : 'Please enter the Phone Number!';
        break;
      case 'address':
        error = value ? '' : 'Please enter the Address!';
        break;
      case 'gender':
        error = value ? '' : 'Please enter the Gender!';
        break;
      case 'license_plate':
        error = value ? '' : 'Please enter the License Plate!';
        break;
      case 'vehicle_type':
        error = value ? '' : 'Please enter the Vehicle Type!';
        break;
      case 'vehicle_model':
        error = value ? '' : 'Please enter the Vehicle Model!';
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({ ...prevData, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateValues(data);
    if (Object.keys(validationErrors).length === 0) {
      axios
        .put("http://localhost:8086/violator", data)
        .then((res) => {
            Swal.fire({
                icon: 'success',
                title: 'Update Successfully',
                text: 'Violator have been Updated successfully!',
                confirmButtonText: 'OK'
              }).then(() => {
                navigate("/view-violator");
              });
        })
        .catch((err) => console.log(err));
    } else {
      setErrors(validationErrors);
    }
  };

  const validateValues = (inputData) => {
    const errors = {};
    Object.keys(inputData).forEach(key => validateField(key, inputData[key]));
    return errors;
  };

  return (
    <div>
      <div className='page'>
        <HeaderOfficer />
      </div>
      <div
        id="edit2"
        className="d-flex w-100 vh-100 justify-content-center align-items-center "
        style={{ marginTop: "30%" }}
      >
        <div className="w-50 border bg-light p-5">
          <form onSubmit={handleSubmit}>
            <h3>UPDATE VIOLATOR DATA</h3>
            <br />
            <div>
              <label htmlFor="violator_id">Violator ID :</label><br /><br />
              <input
                type="text"
                disabled
                name="violator_id"
                className="form-control"
                value={data.violator_id || ''}
              />
            </div>
            <br />
            <div>
              <label htmlFor="name">Name :</label><br /><br />
              <input
                type="text"
                name="name"
                className="form-control"
                value={data.name || ''}
                onChange={handleChange}
              />
              {errors.name && <small className="text-danger">{errors.name}</small>}
            </div>
            <br />
            <div>
              <label htmlFor="email">Email :</label><br /><br />
              <input
                type="text"
                name="email"
                className="form-control"
                value={data.email || ''}
                onChange={handleChange}
              />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>
            <br />
            <div>
              <label htmlFor="password">Password :</label><br /><br />
              <input
                type="text"
                name="password"
                className="form-control"
                value={data.password || ''}
                onChange={handleChange}
              />
              {errors.password && <small className="text-danger">{errors.password}</small>}
            </div>
            <br />
            <div>
              <label htmlFor="confrim_password">Confirm Password :</label><br /><br />
              <input
                type="text"
                name="confrim_password"
                className="form-control"
                value={data.confrim_password || ''}
                onChange={handleChange}
              />
              {errors.confrim_password && <small className="text-danger">{errors.confrim_password}</small>}
            </div>
            <br />
            <div>
              <label htmlFor="phone_number">Phone Number :</label><br /><br />
              <input
                type="text"
                name="phone_number"
                className="form-control"
                value={data.phone_number || ''}
                onChange={handleChange}
              />
              {errors.phone_number && <small className="text-danger">{errors.phone_number}</small>}
            </div>
            <br />
            <div>
              <label htmlFor="address">Address :</label><br /><br />
              <input
                type="text"
                name="address"
                className="form-control"
                value={data.address || ''}
                onChange={handleChange}
              />
              {errors.address && <small className="text-danger">{errors.address}</small>}
            </div>
            <br />
            <div>
              <label htmlFor="gender">Gender :</label><br /><br />
              <input
                type="text"
                name="gender"
                className="form-control"
                value={data.gender || ''}
                onChange={handleChange}
              />
              {errors.gender && <small className="text-danger">{errors.gender}</small>}
            </div>
            <br />
            <div>
              <label htmlFor="license_plate">License Plate :</label><br /><br />
              <input
                type="text"
                name="license_plate"
                className="form-control"
                value={data.license_plate || ''}
                onChange={handleChange}
              />
              {errors.license_plate && <small className="text-danger">{errors.license_plate}</small>}
            </div>
            <br />
            <div>
              <label htmlFor="vehicle_type">Vehicle Type:</label><br /><br />
              <input
                type="text"
                name="vehicle_type"
                className="form-control"
                value={data.vehicle_type || ''}
                onChange={handleChange}
              />
              {errors.vehicle_type && <small className="text-danger">{errors.vehicle_type}</small>}
            </div>
            <br />
            <div>
              <label htmlFor="vehicle_model">Vehicle Model:</label><br /><br />
              <input
                type="text"
                name="vehicle_model"
                className="form-control"
                value={data.vehicle_model || ''}
                onChange={handleChange}
              />
              {errors.vehicle_model && <small className="text-danger">{errors.vehicle_model}</small>}
            </div>
            <br /><br />
            <button className="btn btn-primary" style={{ width: '100%' }}>Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditViolator;
