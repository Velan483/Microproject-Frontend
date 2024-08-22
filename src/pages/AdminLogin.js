import React, { useState } from 'react';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminLogin() {
  const [inputData, setInputData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = validateValues(inputData);
    if (result === true) {
      try {
        const res = await axios.post('http://localhost:8086/admin/login', inputData);
        console.log('API Response:', res.data);
        if (res.data === 'Login successful') {
          console.log('entered');
          navigate('/admin-home');
        } else {
          console.log('not entered');
          setError('Login failed: Invalid email or password');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    }
  };

  const validateValues = (inputData) => {
    if (inputData.email.length === 0) {
      alert('Please enter the Email!!!');
      return false;
    } else if (inputData.password.length === 0) {
      alert('Please enter the Password!!!');
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="body">
      <section id="login">
        <form onSubmit={handleSubmit}>
          <div className="container">
            <h1>Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="login"
                onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="login"
                onChange={(e) => setInputData({ ...inputData, password: e.target.value })}
              />
            </div>
            <div className="con">
              <input id="checkbox" type="checkbox" name="rememberme" />
              <span id="rem-me">Remember ME</span>
              <span id="for-pass">
                <a href="#" className="link">
                  Forgot Password
                </a>
              </span>
            </div>
            <br />
            <div>
              <button type="submit" name="submit" value="Login" className="login btn btn-primary">
                Login
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default AdminLogin;
