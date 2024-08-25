import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ViolatorLogin() {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = validateValues(inputData);
    if (result === true) {
      try {
        const res = await axios.post("http://localhost:8086/violator/login", inputData);
        console.log("API Response:", res.data);
  
        // Adjust the condition to check against the message field in LoginResponse
        if (res.data.message === "Login successful") {
          console.log('Login successful');
          sessionStorage.setItem('Violator ID', res.data.user_id);
          sessionStorage.setItem('Violator Name', res.data.name);
          navigate("/login-home");  
        } else {
          console.log('Login failed');
          setError("Login failed: Invalid email or password");  
        }
      } catch (err) {
        console.error('Error during login:', err);
        setError("Login failed: Invalid email or password");
      }
    }
  };
  

  const validateValues = (inputData) => {
    if (inputData.email.length === 0) {
      alert("Please enter the Email!!! ");
      return false;
    } else if (inputData.password.length === 0) {
      alert("Please enter the Password!!!");
      return false;
    } else {
      return true;
    }
  };

  const handleForgotPassword = () => {
    toast.info("Email and Password already sent to your mail, please check it.");
  };

  const styles = {
    container: {
      display: 'flex',
      height: '100vh',
    },
    imageSection: {
      flex: 1,
      backgroundImage: 'url("https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg")', // Ensure this path is correct
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    },
    loginFormSection: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f4f4f4',
    },
    login: {
      textAlign: 'center',
      padding: '20px',
      width: '100%',
      maxWidth: '450px',
      borderRadius: '10px',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      color: '#333',
    },
    input: {
      margin: '15px 0',
      width: '100%',
      height: '45px',
      borderRadius: '5px',
      paddingLeft: '15px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    link: {
      textDecoration: 'none',
      color: '#007bff',
    },
    linkHover: {
      textDecoration: 'underline',
    },
    containerFlex: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '10px',
    },
    checkbox: {
      marginRight: '10px',
    },
    rememberMe: {
      fontSize: '14px',
      marginRight: '140px',
    },
    forgotPassword: {
      fontSize: '14px',
    },
    button: {
      width: '100%',
      height: '45px',
      borderRadius: '5px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    error: {
      color: 'red',
      fontSize: '0.875em',
      marginTop: '0.25em',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageSection}></div>
      <div style={styles.loginFormSection}>
        <section style={styles.login}>
          <form onSubmit={handleSubmit}>
            <div className="container">
              <h2>Login</h2>
              {error && <p style={styles.error}>{error}</p>}
              <div>
                <input
                  type="text"
                  name='email'
                  placeholder="Email"
                  style={styles.input}
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
                  style={styles.input}
                  onChange={(e) =>
                    setInputData({ ...inputData, password: e.target.value })
                  }
                />
              </div>
              <div style={styles.containerFlex}>
                <input
                  id='checkbox'
                  type="checkbox"
                  name="rememberme"
                  style={styles.checkbox}
                />
                <span style={styles.rememberMe}>Remember ME</span>
                <span style={styles.forgotPassword}>
                  <a href='#' style={styles.link} onClick={handleForgotPassword}>Forgot Password</a>
                </span> 
              </div>
              <br/>
              <div>
                <button
                  type='submit'
                  name="submit"
                  value="Login"
                  style={styles.button}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                >Login</button>
              </div>
            </div>
          </form>
        </section>
      </div>
      <ToastContainer />
    </div>
  )
}

export default ViolatorLogin;


