import React from 'react';
import '../styles/login.css';
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function OfficerLogin() {

  const [inputData, setInputData] = useState({
    email:"",
    password:"",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = validateValues(inputData);
    if (result === true) {
      try {
        const res = await axios.post("http://localhost:8086/officer/login", inputData);
        console.log("API Response:", res.data);
        if (res.data === "Login successful") {
          console.log("entered");
          navigate("/officer-home");  
        } else {
          console.log("not entered");
          setError("Login failed: Invalid email or password");  
        }
      } catch (err) {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const validateValues = (inputData) => {

    if (inputData.email.length === 0) {
      alert("Please enter the Email !!! ");
      return false;
    }else if (inputData.password.length === 0) {
      alert("Please enter the Password!!!");
      return false;
    }else {
      return true;
    }
  };

  return (
    <div className='body'>
    <section id='login'>
      <form onSubmit={handleSubmit}>
        <div class="container">
            <h1>Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
             <input
              type="text"
              name='email'
              placeholder="Email"
              className="login"
              onChange={(e) =>
                setInputData({ ...inputData, email: e.target.value })
              }
            />
            
          </div>
          <div>
             <input
              type="password"
              name='password'
              placeholder="Password"
              className="login"
              onChange={(e) =>
                setInputData({ ...inputData, password: e.target.value })
              }
            />
          </div>
          <div class="con">
             <input
             id='checkbox'
             type="checkbox"
             name="rememberme"
             />
            <span id='rem-me'>Remember ME</span>
            <span id='for-pass'><a href='#'  className="link">Forgot Password</a></span> 
          </div> <br/>
          <div>
          <button
            type='submit'
            name="submit"
            Value="Login"
            className='login btn btn-danger'
            >Login</button>
          </div>
          <div>
            <p>Don't have account?<Link className="link" to="/register">
              &nbsp;&nbsp;Register</Link></p>
          </div>
        </div>
      </form>
    </section>
    </div>
  )
}

export default OfficerLogin
