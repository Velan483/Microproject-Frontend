// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../styles/create.css';
// import HeaderOfficer from '../components/Header2';
// import Swal from 'sweetalert2';

// function CreateViolation() {
//   const [records, setRecords] = useState([]);
//   const [inputData, setInputData] = useState({
//     violation_Date: new Date().toISOString().slice(0, 10),
//     violation_type: "",
//     location: "",
//     description: "",
//     violator: {
//       violator_id: "",
//       name: "",
//     }
//   });

//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const res = await axios.get("http://localhost:8086/violator/idlist");
//       setRecords(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
  
//     // Handle changes for violator_id separately
//     if (name === "violator_id") {
//       const selectedId = value;
//       setInputData((prevData) => ({
//         ...prevData,
//         violator: { ...prevData.violator, violator_id: selectedId }
//       }));
      
//       axios.get(`http://localhost:8086/violator/${selectedId}`)
//         .then((res) => {
//           setInputData((prevData) => ({
//             ...prevData,
//             violator: res.data
//           }));
//         })
//         .catch((err) => console.error(err));
//     } else {
//       setInputData((prevData) => ({
//         ...prevData,
//         [name]: value
//       }));
//     }
  
//     // Clear errors when the user updates the input
//     setErrors((prevErrors) => {
//       const { [name]: omittedError, ...restErrors } = prevErrors;
//       return restErrors;
//     });
//   };

//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validateValues(inputData);
//     if (Object.keys(validationErrors).length === 0) {
//       axios.post("http://localhost:8086/violation", inputData)
//         .then((res) => {
//           Swal.fire({
//             icon: 'success',
//             title: 'Violation Created',
//             text: 'The violation has been successfully created!',
//             confirmButtonText: 'OK'
//           }).then(() => {
//             navigate(`/invoice`);
//           });
//         })
//         .catch((err) => console.error(err));
//     } else {
//       setErrors(validationErrors);
//     }
//   };

//   const validateValues = (inputData) => {
//     const errors = {};
//     if (inputData.violation_type.trim() === "") {
//       errors.violation_type = "Please select the Violation Type !!!";
//     }
//     if (inputData.location.trim() === "") {
//       errors.location = "Please enter the Location !!!";
//     }
//     if (inputData.description.trim() === "") {
//       errors.description = "Please enter the Description !!!";
//     }
//     return errors;
//   };

//   const violationTypes = [
//     "Speeding", "Failure to Obey Traffic Signs", "Driving in the Wrong Direction", "Running a Red Light", "Overloading",
//     "Driving Without a License", "Driving With a Suspended License", "Failure to Stop for Railroad Crossings", "Illegal U-Turn",
//     "Illegal Parking", "Driving Without Insurance", "Hit and Run", "Driving Under the Influence of Drugs",
//     "Unlicensed Driver", "Driving Without a Seatbelt","Disregarding Emergency Vehicles"
//   ];

//   return (
//     <div>
//       <div className='page'>
//         <HeaderOfficer />
//       </div>
//       <div className="violation-container">
//         <section id='violation-register'>
//           <form onSubmit={handleSubmit}>
//             <h1>Create Violation</h1>
            
//             <div className="violation-form-group">
//               <label htmlFor="violationDate">Violation Date:</label>
//               <input
//                 type="date"
//                 name='violation_Date'
//                 className="violation-form-control"
//                 onChange={handleChange}
//                 value={inputData.violation_Date}
//                 disabled
//               />
//             </div>

//             <div className="violation-form-group">
//               <label htmlFor="violationType">Violation Type:</label>
//               <select
//                 className='violation-form-control'
//                 name="violation_type"
//                 onChange={handleChange}
//                 value={inputData.violation_type}
//               >
//                 <option value="">Select One</option>
//                 {violationTypes.map((type, index) => (
//                   <option value={type} key={index}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//               {errors.violation_type && <p className="error-message">{errors.violation_type}</p>}
//             </div>

//             <div className="violation-form-group">
//               <label htmlFor="location">Location:</label>
//               <input
//                 type="text"
//                 name='location'
//                 className="violation-form-control"
//                 onChange={handleChange}
//                 value={inputData.location}
//               />
//               {errors.location && <p className="error-message">{errors.location}</p>}
//             </div>

//             <div className="violation-form-group">
//               <label htmlFor="description">Description:</label>
//               <textarea
//                 name='description'
//                 className="violation-form-control"
//                 onChange={handleChange}
//                 value={inputData.description}
//               />
//               {errors.description && <p className="error-message">{errors.description}</p>}
//             </div>

//             <div className="violation-form-group">
//               <label htmlFor="violator_id">Violator ID:</label>
//               <select
//                 className='violation-form-control'
//                 required
//                 name="violator_id"
//                 onChange={handleChange}
//                 value={inputData.violator.violator_id}
//               >
//                 <option value="">Select One</option>
//                 {records.map((item) => (
//                   <option value={item} key={item}>
//                     {item}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <button
//                 type='submit'
//                 className='violation-btn'
//               >
//                 Create Violation
//               </button>
//             </div>
//           </form>
//         </section>
//       </div>
//     </div>
//   );
// }

// export default CreateViolation;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/create.css';
import HeaderOfficer from '../components/Header2';
import Swal from 'sweetalert2';

function CreateViolation() {
  const [records, setRecords] = useState([]);
  const [inputData, setInputData] = useState({
    violation_Date: new Date().toISOString().slice(0, 10),
    violation_type: "",
    location: "",
    description: "",
    violator: {
      violator_id: "",
      name: "",
    }
  });

  const [errors, setErrors] = useState({});
  const [isViolatorIdSet, setIsViolatorIdSet] = useState(false); // State to track if the violator_id is set

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await axios.get("http://localhost:8086/violator/idlist");
      setRecords(res.data);

      if (res.data.length > 0) {
        // Set the last record as default
        const lastRecordId = res.data[res.data.length - 1];
        setInputData((prevData) => ({
          ...prevData,
          violator: { ...prevData.violator, violator_id: lastRecordId }
        }));

        // Fetch and set the violator details
        axios.get(`http://localhost:8086/violator/${lastRecordId}`)
          .then((res) => {
            setInputData((prevData) => ({
              ...prevData,
              violator: res.data
            }));
            setIsViolatorIdSet(true); // Set the flag to hide the field
          })
          .catch((err) => console.error(err));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Handle changes for violator_id separately
    if (name === "violator_id") {
      const selectedId = value;
      setInputData((prevData) => ({
        ...prevData,
        violator: { ...prevData.violator, violator_id: selectedId }
      }));
      
      axios.get(`http://localhost:8086/violator/${selectedId}`)
        .then((res) => {
          setInputData((prevData) => ({
            ...prevData,
            violator: res.data
          }));
          setIsViolatorIdSet(true); // Set the flag to hide the field
        })
        .catch((err) => console.error(err));
    } else {
      setInputData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  
    // Clear errors when the user updates the input
    setErrors((prevErrors) => {
      const { [name]: omittedError, ...restErrors } = prevErrors;
      return restErrors;
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateValues(inputData);
    if (Object.keys(validationErrors).length === 0) {
      axios.post("http://localhost:8086/violation", inputData)
        .then((res) => {
          Swal.fire({
            icon: 'success',
            title: 'Violation Created',
            text: 'The violation has been successfully created!',
            confirmButtonText: 'OK'
          }).then(() => {
            navigate(`/invoice`);
          });
        })
        .catch((err) => console.error(err));
    } else {
      setErrors(validationErrors);
    }
  };

  const validateValues = (inputData) => {
    const errors = {};
    if (inputData.violation_type.trim() === "") {
      errors.violation_type = "Please select the Violation Type !!!";
    }
    if (inputData.location.trim() === "") {
      errors.location = "Please enter the Location !!!";
    }
    if (inputData.description.trim() === "") {
      errors.description = "Please enter the Description !!!";
    }
    return errors;
  };

  const violationTypes = [
    "Speeding", "Failure to Obey Traffic Signs", "Driving in the Wrong Direction", "Running a Red Light", "Overloading",
    "Driving Without a License", "Driving With a Suspended License", "Failure to Stop for Railroad Crossings", "Illegal U-Turn",
    "Illegal Parking", "Driving Without Insurance", "Hit and Run", "Driving Under the Influence of Drugs",
    "Unlicensed Driver", "Driving Without a Seatbelt","Disregarding Emergency Vehicles"
  ];

  return (
    <div>
      <div className='page'>
        <HeaderOfficer />
      </div>
      <div className="violation-container">
        <section id='violation-register'>
          <form onSubmit={handleSubmit}>
            <h1>Create Violation</h1>
            
            <div className="violation-form-group">
              <label htmlFor="violationDate">Violation Date:</label>
              <input
                type="date"
                name='violation_Date'
                className="violation-form-control"
                onChange={handleChange}
                value={inputData.violation_Date}
                disabled
              />
            </div>

            <div className="violation-form-group">
              <label htmlFor="violationType">Violation Type:</label>
              <select
                className='violation-form-control'
                name="violation_type"
                onChange={handleChange}
                value={inputData.violation_type}
              >
                <option value="">Select One</option>
                {violationTypes.map((type, index) => (
                  <option value={type} key={index}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.violation_type && <p className="error-message">{errors.violation_type}</p>}
            </div>

            <div className="violation-form-group">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                name='location'
                className="violation-form-control"
                onChange={handleChange}
                value={inputData.location}
              />
              {errors.location && <p className="error-message">{errors.location}</p>}
            </div>

            <div className="violation-form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                name='description'
                className="violation-form-control"
                onChange={handleChange}
                value={inputData.description}
              />
              {errors.description && <p className="error-message">{errors.description}</p>}
            </div>

            {!isViolatorIdSet && (
              <div className="violation-form-group">
                <label htmlFor="violator_id">Violator ID:</label>
                <select
                  className='violation-form-control'
                  required
                  name="violator_id"
                  onChange={handleChange}
                  value={inputData.violator.violator_id}
                >
                  <option value="">Select One</option>
                  {records.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <button
                type='submit'
                className='violation-btn'
              >
                Create Violation
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default CreateViolation;

