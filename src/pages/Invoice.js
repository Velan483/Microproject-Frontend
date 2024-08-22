// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../styles/App2.css";
// import HeaderOfficer from "../components/Header2";
// import Swal from 'sweetalert2';

// function Invoice() {
//   const [records, setRecords] = useState([]);
//   const [inputData, setInputData] = useState({
//     invoice_id: "",
//     invoice_Date: "",
//     amount: "",
//     due_date: "",
//     violation: {
//       violation_id: ""
//     }
//   });
//   const [errors, setErrors] = useState({}); // To store validation errors

//   useEffect(() => {
//     loadData();
//     const today = new Date().toISOString().split("T")[0];
//     setInputData((prevData) => ({
//       ...prevData,
//       invoice_Date: today,
//       due_date: calculateDueDate(today)
//     }));
//   }, []);

//   const loadData = async () => {
//     try {
//       const res = await axios.get("http://localhost:8086/violation/idlist");
//       setRecords(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const calculateDueDate = (invoiceDate) => {
//     const invoiceDateObj = new Date(invoiceDate);
//     const dueDateObj = new Date(invoiceDateObj.setDate(invoiceDateObj.getDate() + 30));
//     return dueDateObj.toISOString().split("T")[0];
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "violation_id") {
//       setInputData({ ...inputData, violation: { violation_id: value } });
//       axios.get("http://localhost:8086/violation/" + value)
//         .then((res) => {
//           setInputData({ ...inputData, violation: res.data });
//         })
//         .catch((err) => console.error(err));
//     } else {
//       setInputData({ ...inputData, [name]: value });
//     }

//     validateForm({ ...inputData, [name]: value });
//   };

//   const validateForm = (data) => {
//     const { invoice_Date, due_date, amount } = data;
//     const errors = {};

//     const today = new Date().toISOString().split("T")[0]; // Get today’s date in YYYY-MM-DD format

//     if (invoice_Date !== today) {
//       errors.invoice_Date = "Invoice date must be today.";
//     }

//     if (invoice_Date && due_date) {
//       const invoiceDate = new Date(invoice_Date);
//       const dueDate = new Date(due_date);
//       const minDueDate = new Date(invoiceDate.setDate(invoiceDate.getDate() + 30));

//       if (dueDate < minDueDate) {
//         errors.due_date = "Due date must be at least 30 days after the invoice date.";
//       }
//     }

//     if (!amount) {
//       errors.amount = "Amount is required.";
//     }

//     setErrors(errors);

//     // Return true if no errors
//     return Object.keys(errors).length === 0;
//   };

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm(inputData)) {
//       try {
//         await axios.post("http://localhost:8086/invoice", inputData);
//         Swal.fire({
//           icon: 'success',
//           title: 'Invoice Created',
//           text: 'The invoice has been successfully created!',
//           confirmButtonText: 'OK'
//         }).then(() => {
//           navigate(`/view-invoice/${inputData.violation.violation_id}`);
//         });
//       } catch (err) {
//         console.error(err);
//         Swal.fire({
//           icon: 'error',
//           title: 'Failed to Create Invoice',
//           text: 'There was an error creating the invoice. Please try again.',
//           confirmButtonText: 'OK'
//         });
//       }
//     }
//   };

//   return (
//     <div>
//       <div className='page'><HeaderOfficer/></div>
//       <div id="add2" className="d-flex w-100 vh-100 justify-content-center align-items-center">
//         <div className="w-50 border bg-light p-5">
//           <form onSubmit={handleSubmit}>
//             <h3>Create Invoice</h3>
//             <br />
//             <div>
//               <label htmlFor="invoice_Date" role="deplable">Invoice Date :</label>
//               <input
//                 type="date"
//                 name="invoice_Date"
//                 className="form-control"
//                 role="dep"
//                 value={inputData.invoice_Date}
//                 onChange={handleChange}
//                 min={new Date().toISOString().split("T")[0]} // Ensure only today’s date can be selected
//                 disabled
//               />
//               {errors.invoice_Date && <div className="error">{errors.invoice_Date}</div>}
//             </div>
//             <br />
//             <div>
//               <label htmlFor="amount" role="seclable">Amount :</label>
//               <input
//                 type="text"
//                 name="amount"
//                 className="form-control"
//                 role="sec"
//                 onChange={handleChange}
//                 value={inputData.amount}
//               />
//               {errors.amount && <div className="error">{errors.amount}</div>}
//             </div>
//             <br />
//             <div>
//               <label htmlFor="due_date" role="seclable">Due Date :</label>
//               <input
//                 type="date"
//                 name="due_date"
//                 className="form-control"
//                 role="sec"
//                 value={inputData.due_date}
//                 onChange={handleChange}
//                 disabled
//               />
//               {errors.due_date && <div className="error">{errors.due_date}</div>}
//             </div>
//             <br />
//             <div>
//               <label htmlFor="violation_id" role="attlable">Violation ID :</label>
//               <select
//                 className="form-select"
//                 name="violation_id"
//                 title="Select ID"
//                 onChange={handleChange}
//                 value={inputData.violation.violation_id}
//               >
//                 <option value="">Select One</option>
//                 {records.map((item) => (
//                   <option value={item} key={item}>
//                     {item}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <br />
//             <button className="btn btn-primary" type="submit" data-testid="add-submit" style={{ width: '100%' }}>Create Invoice</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Invoice;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/App2.css";
import HeaderOfficer from "../components/Header2";
import Swal from 'sweetalert2';

function Invoice() {
  const [records, setRecords] = useState([]);
  const [inputData, setInputData] = useState({
    invoice_id: "",
    invoice_Date: "",
    amount: "",
    due_date: "",
    violation: {
      violation_id: ""
    }
  });
  const [errors, setErrors] = useState({});
  const [isViolationIdSet, setIsViolationIdSet] = useState(false); // State to track if violation_id is set

  useEffect(() => {
    loadData();
    const today = new Date().toISOString().split("T")[0];
    setInputData((prevData) => ({
      ...prevData,
      invoice_Date: today,
      due_date: calculateDueDate(today)
    }));
  }, []);

  const loadData = async () => {
    try {
      const res = await axios.get("http://localhost:8086/violation/idlist");
      setRecords(res.data);

      if (res.data.length > 0) {
        // Set the last record as default
        const lastRecordId = res.data[res.data.length - 1];
        setInputData((prevData) => ({
          ...prevData,
          violation: { violation_id: lastRecordId }
        }));

        // Fetch and set the violation details
        axios.get(`http://localhost:8086/violation/${lastRecordId}`)
          .then((res) => {
            setInputData((prevData) => ({
              ...prevData,
              violation: res.data
            }));
            setIsViolationIdSet(true); // Set the flag to hide the field
          })
          .catch((err) => console.error(err));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const calculateDueDate = (invoiceDate) => {
    const invoiceDateObj = new Date(invoiceDate);
    const dueDateObj = new Date(invoiceDateObj.setDate(invoiceDateObj.getDate() + 30));
    return dueDateObj.toISOString().split("T")[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "violation_id") {
      setInputData({ ...inputData, violation: { violation_id: value } });
      axios.get("http://localhost:8086/violation/" + value)
        .then((res) => {
          setInputData({ ...inputData, violation: res.data });
          setIsViolationIdSet(true); // Set the flag to hide the field
        })
        .catch((err) => console.error(err));
    } else {
      setInputData({ ...inputData, [name]: value });
    }

    validateForm({ ...inputData, [name]: value });
  };

  const validateForm = (data) => {
    const { invoice_Date, due_date, amount } = data;
    const errors = {};

    const today = new Date().toISOString().split("T")[0];

    if (invoice_Date !== today) {
      errors.invoice_Date = "Invoice date must be today.";
    }

    if (invoice_Date && due_date) {
      const invoiceDate = new Date(invoice_Date);
      const dueDate = new Date(due_date);
      const minDueDate = new Date(invoiceDate.setDate(invoiceDate.getDate() + 30));

      if (dueDate < minDueDate) {
        errors.due_date = "Due date must be at least 30 days after the invoice date.";
      }
    }

    if (!amount) {
      errors.amount = "Amount is required.";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm(inputData)) {
      try {
        await axios.post("http://localhost:8086/invoice", inputData);
        Swal.fire({
          icon: 'success',
          title: 'Invoice Created',
          text: 'The invoice has been successfully created!',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate(`/view-invoice/${inputData.violation.violation_id}`);
        });
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Failed to Create Invoice',
          text: 'There was an error creating the invoice. Please try again.',
          confirmButtonText: 'OK'
        });
      }
    }
  };

  return (
    <div>
      <div className='page'><HeaderOfficer/></div>
      <div id="add2" className="d-flex w-100 vh-100 justify-content-center align-items-center">
        <div className="w-50 border bg-light p-5">
          <form onSubmit={handleSubmit}>
            <h3>Create Invoice</h3>
            <br />
            <div>
              <label htmlFor="invoice_Date" role="deplable">Invoice Date :</label>
              <input
                type="date"
                name="invoice_Date"
                className="form-control"
                role="dep"
                value={inputData.invoice_Date}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                disabled
              />
              {errors.invoice_Date && <div className="error">{errors.invoice_Date}</div>}
            </div>
            <br />
            <div>
              <label htmlFor="amount" role="seclable">Amount :</label>
              <input
                type="text"
                name="amount"
                className="form-control"
                role="sec"
                onChange={handleChange}
                value={inputData.amount}
              />
              {errors.amount && <div className="error">{errors.amount}</div>}
            </div>
            <br />
            <div>
              <label htmlFor="due_date" role="seclable">Due Date :</label>
              <input
                type="date"
                name="due_date"
                className="form-control"
                role="sec"
                value={inputData.due_date}
                onChange={handleChange}
                disabled
              />
              {errors.due_date && <div className="error">{errors.due_date}</div>}
            </div>
            <br />
            {!isViolationIdSet && (
              <div>
                <label htmlFor="violation_id" role="attlable">Violation ID :</label>
                <select
                  className="form-select"
                  name="violation_id"
                  title="Select ID"
                  onChange={handleChange}
                  value={inputData.violation.violation_id}
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
            <br />
            <button className="btn btn-primary" type="submit" data-testid="add-submit" style={{ width: '100%' }}>Create Invoice</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Invoice;

