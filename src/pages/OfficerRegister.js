import React, { useState } from 'react';
import axios from 'axios';
import '../styles/register.css';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function OfficerRegister() {
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
    confrim_password: "",
    phone_number: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confrim_password: "",
    phone_number: "",
    address: "",
  });

  const navigate = useNavigate();
  
  const validateField = (name, value, inputData) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value) error = "Please enter the Name!";
        break;
      case "email":
        if (!value) error = "Please enter the Email!";
        else if (!/\S+@\S+\.\S+/.test(value)) error = "Email is invalid!";
        break;
      case "password":
        if (!value) error = "Please enter the Password!";
        else if (value.length < 8) error = "Password must be at least 8 characters long!";
        else if (!/[A-Z]/.test(value)) error = "Password must contain at least one uppercase letter!";
        else if (!/[a-z]/.test(value)) error = "Password must contain at least one lowercase letter!";
        else if (!/[0-9]/.test(value)) error = "Password must contain at least one number!";
        else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) error = "Password must contain at least one special character!";
        break;
      case "confrim_password":
        if (!value) error = "Please enter the Confirm Password!";
        else if (value !== inputData.password) error = "Confirm Password does not match Password!";
        break;
      case "phone_number":
        if (!value) error = "Please enter the Phone Number!";
        else if (!/^\d{10}$/.test(value)) error = "Phone Number must be exactly 10 digits!";
        break;
      case "address":
        if (!value) error = "Please enter the Address!";
        break;
      default:
        break;
    }
    return error;
  };  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value, { ...inputData, [name]: value })
    }));
  };

  const validateValues = () => {
    const validationErrors = {
      name: validateField("name", inputData.name, inputData),
      email: validateField("email", inputData.email, inputData),
      password: validateField("password", inputData.password, inputData),
      confrim_password: validateField("confrim_password", inputData.confrim_password, inputData),
      phone_number: validateField("phone_number", inputData.phone_number, inputData),
      address: validateField("address", inputData.address, inputData),
    };

    setErrors(validationErrors);
    return Object.values(validationErrors).every(error => !error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateValues()) {
      axios.post("http://localhost:8086/officer", inputData)
        .then((res) => {
          Swal.fire({
            icon: 'success',
            title: 'Registered Successfully',
            text: 'You have been registered successfully!',
            confirmButtonText: 'OK'
          }).then(() => {
            navigate("/officerlogin");
          });
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className='body'>
      <section id='register'>
        <form onSubmit={handleSubmit}>
          <div className="container">
            <h2>Register</h2>
            <br/>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name='name'
                className="login"
                value={inputData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name='email'
                className="login"
                value={inputData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name='password'
                className="login"
                value={inputData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="confrim_password">Confirm Password</label>
              <input
                type="password"
                id="confrim_password"
                name='confrim_password'
                className="login"
                value={inputData.confrim_password}
                onChange={handleChange}
              />
              {errors.confrim_password && <p className="error">{errors.confrim_password}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="phone_number">Phone Number</label>
              <input
                type="text"
                id="phone_number"
                name="phone_number"
                className="login"
                value={inputData.phone_number}
                onChange={handleChange}
              />
              {errors.phone_number && <p className="error">{errors.phone_number}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                className="login"
                value={inputData.address}
                onChange={handleChange}
              />
              {errors.address && <p className="error">{errors.address}</p>}
            </div>

            <div>
              <button
                type='submit'
                name="submit"
                value="Register"
                className='login btn btn-danger'
              >
                Register
              </button>
            </div>

            <div>
              <p style={{textAlign:"center"}}>Already have an account? 
                <Link to="/officerlogin" className="link">Login</Link>
              </p>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default OfficerRegister;

