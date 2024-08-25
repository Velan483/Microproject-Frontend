import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../styles/home.css';

function SendRequest() {
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    message: "",
  });
  
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (value.trim().length === 0) error = 'Name is required.';
        break;
      case 'email':
        if (value.trim().length === 0) {
          error = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Email address is invalid.';
        }
        break;
      case 'message':
        if (value.trim().length === 0) error = 'Message is required.';
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
    
    // Validate field on change
    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouchedFields((prevState) => ({ ...prevState, [name]: true }));
    
    // Validate field on blur
    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const newErrors = {
      name: validateField('name', inputData.name),
      email: validateField('email', inputData.email),
      message: validateField('message', inputData.message),
    };

    setErrors(newErrors);

    // If no errors, proceed with submission
    if (Object.values(newErrors).every((error) => error === '')) {
      axios
        .post("http://localhost:8086/contact", inputData)
        .then((res) => {
          Swal.fire({
            icon: 'success',
            title: 'Message Sent',
            text: 'Your message has been sent to the admin.',
          });
          // Optionally reset the form here
          setInputData({ name: "", email: "", message: "" });
          setErrors({});
          setTouchedFields({});
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong. Please try again later.',
          });
          console.log(err);
        });
    }
  };

  return (
    <div className="contact-us-container" style={{marginTop:"6%"}}>
      <h2>Send Request Message</h2>
      <form className="contact-form" onSubmit={handleSubmit}> <br/>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={inputData.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touchedFields.name && errors.name && <div className="error">{errors.name}</div>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={inputData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touchedFields.email && errors.email && <div className="error">{errors.email}</div>}
        </div>

        <div>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            required
            value={inputData.message}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touchedFields.message && errors.message && <div className="error">{errors.message}</div>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SendRequest;
