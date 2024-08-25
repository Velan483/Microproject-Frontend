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
  const [touchedFields, setTouchedFields] = useState({});
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
        if (touchedFields[name]) {
          const validationErrors = validateValues(newInputData);
          setErrors(validationErrors);
        }
        return newInputData;
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouchedFields(prevState => ({ ...prevState, [name]: true }));
    const validationErrors = validateValues({ ...inputData, [name]: e.target.value });
    setErrors(validationErrors);
  };

  const validateValues = (data) => {
    const errors = {};
    const validations = {
      name: {
        condition: data.name.trim().length === 0,
        message: "Name is required."
      },
      email: {
        condition: data.email.trim().length === 0,
        message: "Email is required."
      },
      password: {
        condition: data.password.length === 0,
        message: "Password is required.",
        additionalChecks: [
          { test: data.password.length < 8, message: "Password must be at least 8 characters long." },
          { test: !/[A-Z]/.test(data.password), message: "Password must contain at least one uppercase letter." },
          { test: !/[a-z]/.test(data.password), message: "Password must contain at least one lowercase letter." },
          { test: !/[0-9]/.test(data.password), message: "Password must contain at least one number." },
          { test: !/[!@#$%^&*(),.?":{}|<>]/.test(data.password), message: "Password must contain at least one special character." }
        ]
      },
      confrim_password: {
        condition: data.confrim_password.length === 0,
        message: "Confirm Password is required.",
        additionalChecks: [
          { test: data.confrim_password !== data.password, message: "Confirm Password must match Password." }
        ]
      },
      phone_number: {
        condition: data.phone_number.length === 0,
        message: "Phone Number is required.",
        additionalChecks: [
          { test: data.phone_number.length !== 10, message: "Phone Number must be exactly 10 digits long." }
        ]
      },
      address: {
        condition: data.address.trim().length === 0,
        message: "Address is required."
      },
      gender: {
        condition: data.gender === "",
        message: "Gender is required."
      },
      license_plate: {
        condition: data.license_plate.trim().length === 0,
        message: "License Plate is required."
      },
      vehicle_type: {
        condition: data.vehicle_type.trim().length === 0,
        message: "Vehicle Type is required."
      },
      vehicle_model: {
        condition: data.vehicle_model.trim().length === 0,
        message: "Vehicle Model is required."
      }
    };

    Object.keys(validations).forEach(field => {
      const { condition, message, additionalChecks } = validations[field];
      if (condition) {
        errors[field] = message;
      } else if (additionalChecks) {
        additionalChecks.forEach(check => {
          if (check.test) {
            errors[field] = check.message;
          }
        });
      }
    });

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateValues(inputData);
    setErrors(validationErrors);

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
                onBlur={handleBlur}
              />
              {touchedFields.name && errors.name && <div className="error">{errors.name}</div>}
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
                onBlur={handleBlur}
              />
              {touchedFields.email && errors.email && <div className="error">{errors.email}</div>}
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
                onBlur={handleBlur}
              />
              {touchedFields.password && errors.password && <div className="error">{errors.password}</div>}
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
                onBlur={handleBlur}
              />
              {touchedFields.confrim_password && errors.confrim_password && <div className="error">{errors.confrim_password}</div>}
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
                onBlur={handleBlur}
              />
              {touchedFields.phone_number && errors.phone_number && <div className="error">{errors.phone_number}</div>}
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
                onBlur={handleBlur}
              />
              {touchedFields.address && errors.address && <div className="error">{errors.address}</div>}
            </div>

            <div>
              <label htmlFor="gender">Gender:</label>
              <select
                id="gender"
                name="gender"
                className="login"
                value={inputData.gender}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
              {touchedFields.gender && errors.gender && <div className="error">{errors.gender}</div>}
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
                onBlur={handleBlur}
              />
              {touchedFields.license_plate && errors.license_plate && <div className="error">{errors.license_plate}</div>}
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
                onBlur={handleBlur}
              />
              {touchedFields.vehicle_type && errors.vehicle_type && <div className="error">{errors.vehicle_type}</div>}
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
                onBlur={handleBlur}
              />
              {touchedFields.vehicle_model && errors.vehicle_model && <div className="error">{errors.vehicle_model}</div>}
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
