import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../styles/register.css';
import { useNavigate } from "react-router-dom";
import HeaderOfficer from '../components/Header2';
import Swal from 'sweetalert2';

function RegisterViolator() {
  const [records, setRecords] = useState([]);
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
    confrim_password: "",
    phone_number: "",
    address: "",
    gender: "",
    license_plate: "",
    vehicle_type: "",
    vehicle_model: "",
    officer: {
      officer_id: "",
      name: "",
      email: "",
      phone_number: "",
      address: "",
    }
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await axios.get("http://localhost:8086/officer/idlist");
      setRecords(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "officer_id") {
      setInputData(prevData => ({ ...prevData, officer: { officer_id: value } }));
      axios.get(`http://localhost:8086/officer/${value}`)
        .then((res) => {
          setInputData(prevData => ({ ...prevData, officer: res.data }));
        })
        .catch((err) => console.error(err));
    } else {
      setInputData(prevData => {
        const newInputData = { ...prevData, [name]: value };
        const validationErrors = validateValues(newInputData);
        setErrors(validationErrors);
        return newInputData;
      });
    }
  };

  const validateValues = (data) => {
    let newErrors = {};
    if (data.name.length === 0) newErrors.name = "Please enter the Name!";
    if (data.email.length === 0) newErrors.email = "Please enter the Email!";
    if (data.password.length === 0) newErrors.password = "Please enter the Password!";
    if (data.confrim_password.length === 0) newErrors.confrim_password = "Please enter the Confirm Password!";
    if (data.confrim_password !== data.password) newErrors.confrim_password = "Confirm Password does not match Password!";
    if (data.phone_number.length === 0) newErrors.phone_number = "Please enter the Phone Number!";
    if (data.phone_number.length !== 10) newErrors.phone_number = "Phone Number should be exactly 10 digits!";
    if (data.address.length === 0) newErrors.address = "Please enter the Address!";
    if (data.gender.length === 0) newErrors.gender = "Please select the Gender!";
    if (data.license_plate.length === 0) newErrors.license_plate = "Please enter the License Plate!";
    if (data.vehicle_type.length === 0) newErrors.vehicle_type = "Please enter the Vehicle Type!";
    if (data.vehicle_model.length === 0) newErrors.vehicle_model = "Please enter the Vehicle Model!";

    return newErrors;
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateValues(inputData);
    if (Object.keys(validationErrors).length === 0) {
      axios.post("http://localhost:8086/violator", inputData)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: 'Violator registered successfully!',
            confirmButtonText: 'OK'
          }).then(() => {
            navigate("/create-violation");
          });
        })
        .catch((err) => console.error(err));
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div>
      <div className='page'><HeaderOfficer/></div>
      <section id='register1'>
        <form onSubmit={handleSubmit}>
          <div className="container">
            <br /> <br />
            <h3>Register Violator</h3>

            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                className="login"
                value={inputData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="error">{errors.name}</div>}
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                className="login"
                value={inputData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>

            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                className="login"
                value={inputData.password}
                onChange={handleChange}
              />
              {errors.password && <div className="error">{errors.password}</div>}
            </div>

            <div>
              <label htmlFor="confrim_password">Confirm Password:</label>
              <input
                type="password"
                id="confrim_password"
                name="confrim_password"
                className="login"
                value={inputData.confrim_password}
                onChange={handleChange}
              />
              {errors.confrim_password && <div className="error">{errors.confrim_password}</div>}
            </div>

            <div>
              <label htmlFor="phone_number">Phone Number:</label>
              <input
                type="text"
                id="phone_number"
                name="phone_number"
                className="login"
                value={inputData.phone_number}
                onChange={handleChange}
              />
              {errors.phone_number && <div className="error">{errors.phone_number}</div>}
            </div>

            <div>
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                className="login"
                value={inputData.address}
                onChange={handleChange}
              />
              {errors.address && <div className="error">{errors.address}</div>}
            </div>

            <div>
              <label htmlFor="gender">Gender:</label>
              <select
                id="gender"
                name="gender"
                className="login"
                value={inputData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
              {errors.gender && <div className="error">{errors.gender}</div>}
            </div>

            <div>
              <label htmlFor="license_plate">License Plate:</label>
              <input
                type="text"
                id="license_plate"
                name="license_plate"
                className="login"
                value={inputData.license_plate}
                onChange={handleChange}
              />
              {errors.license_plate && <div className="error">{errors.license_plate}</div>}
            </div>

            <div>
              <label htmlFor="vehicle_type">Vehicle Type:</label>
              <input
                type="text"
                id="vehicle_type"
                name="vehicle_type"
                className="login"
                value={inputData.vehicle_type}
                onChange={handleChange}
              />
              {errors.vehicle_type && <div className="error">{errors.vehicle_type}</div>}
            </div>

            <div>
              <label htmlFor="vehicle_model">Vehicle Model:</label>
              <input
                type="text"
                id="vehicle_model"
                name="vehicle_model"
                className="login"
                value={inputData.vehicle_model}
                onChange={handleChange}
              />
              {errors.vehicle_model && <div className="error">{errors.vehicle_model}</div>}
            </div>

            <div>
              <button
                type='submit'
                name="submit"
                className='login btn btn-danger'
              >
                Register Violator
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default RegisterViolator;

