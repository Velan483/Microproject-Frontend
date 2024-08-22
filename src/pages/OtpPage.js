import React, { useState } from 'react';

function OtpPage({ processPayment, isProcessing }) {
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);

    // Move to the next input box
    if (e.target.value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp.every((digit) => digit.length === 1)) {
      processPayment();
    } else {
      alert('Please enter a valid 4-digit OTP');
    }
  };

  return (
    <div className="otp-step">
      <h3>Enter OTP</h3>
      <form onSubmit={handleOtpSubmit}>
        <div className="otp-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleOtpChange(e, index)}
              maxLength="1"
              className="otp-input"
            />
          ))}
        </div>
        <button type="submit" disabled={isProcessing}>
          Submit
        </button>
      </form>
      {isProcessing && (
        <div className="processing-container">
          <div className="spinner"></div>
          <h2>Processing...</h2>
        </div>
      )}
    </div>
  );
}

export default OtpPage;


