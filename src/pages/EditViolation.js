import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/App2.css";
import Swal from 'sweetalert2';
import HeaderOfficer from "../components/Header2";

function EditViolation() {
  
  const { id } = useParams();
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get(`http://localhost:8086/violation/${id}`)
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  }, [id]);

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'violation_Date':
        error = value ? '' : 'Please enter the Violation Date!';
        break;
      case 'violation_type':
        error = value ? '' : 'Please enter the Violation Type!';
        break;
      case 'location':
        error = value ? '' : 'Please enter the Location!';
        break;
      case 'description':
        error = value ? '' : 'Please enter the description!';
        break;
      case 'violator.name':
        error = value ? '' : 'Please enter the violator name!';
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
      axios.put("http://localhost:8086/violation", data)
        .then((res) => {
          Swal.fire({
            icon: 'success',
            title: 'Update Successfully',
            text: 'Violation have been Updated successfully!',
            confirmButtonText: 'OK'
          }).then(() => {
            navigate("/view-violation");
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
        className="d-flex w-100 vh-100 justify-content-center align-items-center"
        style={{marginTop:"4%"}}
      >
        <div className="w-50 border bg-light p-5">
          <form onSubmit={handleSubmit}>
            <h3>UPDATE VIOLATION DATA</h3>
            <br/>
            <div>
              <label htmlFor="violation_id">Violation ID :</label><br/><br/>
              <input
                type="text"
                disabled
                name="violation_id"
                className="form-control"
                value={data.violation_id || ''}
              />
            </div>
            <br/>
            <div>
              <label htmlFor="violation_type">Violation Type :</label><br/><br/>
              <input
                type="text"
                name="violation_type"
                className="form-control"
                value={data.violation_type || ''}
                onChange={handleChange}
              />
              {errors.violation_type && <small className="text-danger">{errors.violation_type}</small>}
            </div>
            <br/>
            <div>
              <label htmlFor="location">Location :</label><br/><br/>
              <input
                type="text"
                name="location"
                className="form-control"
                value={data.location || ''}
                onChange={handleChange}
              />
              {errors.location && <small className="text-danger">{errors.location}</small>}
            </div>
            <br />
            <div>
              <label htmlFor="description">Description :</label><br/><br/>
              <input
                type="text"
                name="description"
                className="form-control"
                value={data.description || ''}
                onChange={handleChange}
              />
              {errors.description && <small className="text-danger">{errors.description}</small>}
            </div>
            <br/>
            <div>
              <label htmlFor="violator.name">Violator Name :</label><br/><br/>
                 <input
                  type="text"
                  name="violator.name"
                  className="form-control"
                  value={data.violator && data.violator.name || ''}
                  onChange={handleChange}
                />
                {errors.violator && errors.violator.name && (
                <small className="text-danger">{errors.violator.name}</small>
                )}
           </div>
            <br /><br />
            <button className="btn btn-primary" style={{ width: '100%' }}>Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditViolation;
