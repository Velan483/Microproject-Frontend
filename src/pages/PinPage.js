import React, { useState } from 'react';

function PinPage({ processPayment, isProcessing }) {
  const [pin, setPin] = useState(['', '', '', '']);

  const handlePinChange = (e, index) => {
    const newPin = [...pin];
    newPin[index] = e.target.value;
    setPin(newPin);

    // Move to the next input box
    if (e.target.value && index < pin.length - 1) {
      document.getElementById(`pin-${index + 1}`).focus();
    }
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin.every((digit) => digit.length === 1)) {
      processPayment();
    } else {
      alert('Please enter a valid 4-digit PIN');
    }
  };

  return (
    <div className="pin-step">
      <h3>Enter PIN</h3>
      <form onSubmit={handlePinSubmit}>
        <div className="pin-container">
          {pin.map((digit, index) => (
            <input
              key={index}
              id={`pin-${index}`}
              type="password"
              value={digit}
              onChange={(e) => handlePinChange(e, index)}
              maxLength="1"
              className="pin-input"
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

export default PinPage;


