// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Swal from 'sweetalert2';

// function ForgotPassword() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const queryParams = new URLSearchParams(location.search);
//   const emailFromQuery = queryParams.get('email') || '';

//   const [data, setData] = useState({
//     email: emailFromQuery,
//     password: "",
//     confrim_password: ""
//   });
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (data.email) {
//       axios
//         .get(`http://localhost:8086/officer/email/${data.email}`)
//         .then((response) => setData(prevData => ({ ...prevData, ...response.data })))
//         .catch((err) => console.log(err));
//     }
//   }, [data.email]);

//   const validateField = (name, value) => {
//     let error = '';
//     switch (name) {
//       case 'email':
//         error = value ? '' : 'Please enter the Email!';
//         break;
//       case 'password':
//         if (!value) error = "Please enter the Password!";
//         else if (value.length < 8) error = "Password must be at least 8 characters long!";
//         else if (!/[A-Z]/.test(value)) error = "Password must contain at least one uppercase letter!";
//         else if (!/[a-z]/.test(value)) error = "Password must contain at least one lowercase letter!";
//         else if (!/[0-9]/.test(value)) error = "Password must contain at least one number!";
//         else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) error = "Password must contain at least one special character!";
//         break;
//       case 'confrim_password':
//         error = value
//           ? value === data.password
//             ? ''
//             : 'Confirm Password does not match Password!'
//           : 'Please enter the Confirm Password!';
//         break;
//       default:
//         break;
//     }
//     setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData(prevData => ({ ...prevData, [name]: value }));
//     validateField(name, value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validateValues(data);
//     if (Object.keys(validationErrors).length === 0) {
//       axios.put(`http://localhost:8086/officer`, {
//         email: data.email,
//         password: data.password,
//         confrim_password: data.confrim_password,
//       })
//       .then((res) => {
//         Swal.fire({
//           icon: 'success',
//           title: 'Password Changed Successfully',
//           text: 'Password has been changed successfully!',
//           confirmButtonText: 'OK'
//         }).then(() => {
//           navigate("/officerlogin");
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Failed to change password. Please try again.',
//           confirmButtonText: 'OK'
//         });
//       });
//     } else {
//       setErrors(validationErrors);
//     }
//   };  

//   const validateValues = (inputData) => {
//     const errors = {};
//     Object.keys(inputData).forEach(key => validateField(key, inputData[key]));
//     return errors;
//   };

//   return (
//     <div className="forgot-password-container">
//       <style>
//         {`
//           .forgot-password-container {
//             display: flex;
//             height: 100vh;
//             align-items: center;
//             justify-content: center;
//             font-family: Arial, sans-serif;
//           }
          
//           .image-container {
//             flex:1;
//             background: url('https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg') no-repeat center center;
//             background-size: cover;
//             height: 100%;
//             margin-right:15%
//           }
          
//           .form-container {
//             flex: 1;
//             max-width: 500px;
//             padding: 30px;
//             border: 1px solid #ddd;
//             background-color: #f4f4f4;
//           }
          
//           .form-container h3 {
//             margin-bottom: 20px;
//           }
          
//           .form-container .form-control {
//             width: 100%;
//             margin-bottom: 10px;
//             padding: 8px;
//             border: 1px solid #ccc;
//             border-radius: 4px;
//           }
          
//           .form-container .btn {
//             width: 100%;
//             padding: 10px;
//             border: none;
//             border-radius: 4px;
//             background-color: #007bff;
//             color: #fff;
//             font-size: 16px;
//             cursor: pointer;
//           }
          
//           .form-container .btn:hover {
//             background-color: #0056b3;
//           }
          
//           .text-danger {
//             color: red;
//           }
//         `}
//       </style>
//       <div className="image-container"></div>
//       <div className="form-container">
//         <form onSubmit={handleSubmit}>
//           <h3>Change Password</h3> <br/>
//           <div>
//             <label htmlFor="email">Email :</label>
//             <input
//               type="text"
//               name="email"
//               className="form-control"
//               value={data.email || ''}
//               onChange={handleChange}
//               disabled // email is used for identification and should not be changed
//             />
//             {errors.email && <small className="text-danger">{errors.email}</small>}
//           </div> <br/>
//           <div>
//             <label htmlFor="password">New Password :</label>
//             <input
//               type="password"
//               name="password"
//               className="form-control"
//               onChange={handleChange}
//             />
//             {errors.password && <small className="text-danger">{errors.password}</small>}
//           </div> <br/>
//           <div>
//             <label htmlFor="confrim_password">Confirm Password :</label>
//             <input
//               type="password"
//               name="confrim_password"
//               className="form-control"
//               onChange={handleChange}
//             />
//             {errors.confrim_password && <small className="text-danger">{errors.confrim_password}</small>}
//           </div> <br/>
//           <button className="btn btn-primary" type="submit">Update</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ForgotPassword;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from 'sweetalert2';

function ForgotPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const emailFromQuery = queryParams.get('email') || '';

  const [data, setData] = useState({
    email: emailFromQuery,
    password: "",
    confirm_password: ""
  });
  const [errors, setErrors] = useState({});
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  useEffect(() => {
    if (data.email) {
      axios
        .get(`http://localhost:8086/officer/email/${data.email}`)
        .then((response) => setData(prevData => ({ ...prevData, ...response.data })))
        .catch((err) => console.log(err));
    }
  }, [data.email]);

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'email':
        error = value ? '' : 'Please enter the Email!';
        break;
      case 'password':
        if (!value) error = "Please enter the Password!";
        else if (value.length < 8) error = "Password must be at least 8 characters long!";
        else if (!/[A-Z]/.test(value)) error = "Password must contain at least one uppercase letter!";
        else if (!/[a-z]/.test(value)) error = "Password must contain at least one lowercase letter!";
        else if (!/[0-9]/.test(value)) error = "Password must contain at least one number!";
        else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) error = "Password must contain at least one special character!";
        break;
      case 'confirm_password':
        error = value
          ? value === data.password
            ? ''
            : 'Confirm Password does not match Password!'
          : 'Please enter the Confirm Password!';
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
      axios.put(`http://localhost:8086/officer`, {
        email: data.email,
        password: data.password,
        confirm_password: data.confirm_password,
      })
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Password Changed Successfully',
          text: 'Password has been changed successfully!',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate("/officerlogin");
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to change password. Please try again.',
          confirmButtonText: 'OK'
        });
      });
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
    <div className="forgot-password-container">
      <style>
        {`
          .forgot-password-container {
            display: flex;
            height: 100vh;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
          }
          
          .image-container {
            flex: 1;
            background: url('https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg') no-repeat center center;
            background-size: cover;
            height: 100%;
            margin-right: 15%;
          }
          
          .form-container {
            flex: 1;
            max-width: 500px;
            padding: 30px;
            border: 1px solid #ddd;
            background-color: #f4f4f4;
          }
          
          .form-container h3 {
            margin-bottom: 20px;
          }
          
          .form-container .form-control {
            width: 100%;
            margin-bottom: 10px;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          
          .form-container .btn {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 4px;
            background-color: #007bff;
            color: #fff;
            font-size: 16px;
            cursor: pointer;
          }
          
          .form-container .btn:hover {
            background-color: #0056b3;
          }
          
          .text-danger {
            color: red;
          }
        `}
      </style>
      <div className="image-container"></div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h3>Change Password</h3> <br />
          {!showPasswordFields && (
            <div>
              <label htmlFor="email">Email :</label>
              <input
                type="text"
                name="email"
                className="form-control"
                value={data.email || ''}
                onChange={handleChange}
              />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>
          )}
          <br />
          {!showPasswordFields && (
            <div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowPasswordFields(true)}
              >
                Next
              </button>
            </div>
          )}
          {showPasswordFields && (
            <>
              <div>
                <label htmlFor="password">New Password :</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  onChange={handleChange}
                />
                {errors.password && <small className="text-danger">{errors.password}</small>}
              </div>
              <br />
              <div>
                <label htmlFor="confirm_password">Confirm Password :</label>
                <input
                  type="password"
                  name="confirm_password"
                  className="form-control"
                  onChange={handleChange}
                />
                {errors.confirm_password && <small className="text-danger">{errors.confirm_password}</small>}
              </div>
              <br />
              <button className="btn btn-primary" type="submit">Update</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
