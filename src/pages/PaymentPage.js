import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/payment.css';
import OtpPage from './OtpPage';
import PinPage from './PinPage';
import Header1 from '../components/Header1';

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardHolderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    amount: location.state?.amount || ''  // Retrieve amount from location state
  });
  const [upiDetails, setUpiDetails] = useState({
    upiId: ''
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState('payment');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
    validateCardField(name, value);
  };

  const handleUpiDetailsChange = (e) => {
    const { name, value } = e.target;
    setUpiDetails({ ...upiDetails, [name]: value });
    validateUpiField(name, value);
  };

  const validateCardField = (name, value) => {
    let error = '';
    if (name === 'cardHolderName' && !value) {
      error = 'Card holder name is required';
    } else if (name === 'cardNumber') {
      if (!value) {
        error = 'Card number is required';
      } else if (!/^\d{16}$/.test(value)) {
        error = 'Card number must be 16 digits';
      }
    } else if (name === 'expiryDate') {
      if (!value) {
        error = 'Expiry date is required';
      } else {
        const today = new Date();
        const [month, year] = value.split('/');
        const expiryDate = new Date(`20${year}`, month - 1);
        if (expiryDate <= today) {
          error = 'Expiry date must be in the future';
        }
      }
    } else if (name === 'cvv' && (!value || !/^\d{3}$/.test(value))) {
      error = 'CVV must be 3 digits';
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const validateUpiField = (name, value) => {
    let error = '';
    if (name === 'upiId' && !value) {
      error = 'UPI ID is required';
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const validateCardDetails = () => {
    const newErrors = {};
    if (!cardDetails.cardHolderName) newErrors.cardHolderName = 'Card holder name is required';
    if (!cardDetails.cardNumber) newErrors.cardNumber = 'Card number is required';
    else if (!/^\d{16}$/.test(cardDetails.cardNumber)) newErrors.cardNumber = 'Card number must be 16 digits';
    if (!cardDetails.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    else {
      const today = new Date();
      const [month, year] = cardDetails.expiryDate.split('/');
      const expiryDate = new Date(`20${year}`, month - 1);
      if (expiryDate <= today) newErrors.expiryDate = 'Expiry date must be in the future';
    }
    if (!cardDetails.cvv || !/^\d{3}$/.test(cardDetails.cvv)) newErrors.cvv = 'CVV must be 3 digits';
    if (!cardDetails.amount) newErrors.amount = 'Amount is required';
    return newErrors;
  };

  const validateUpiDetails = () => {
    const newErrors = {};
    if (!upiDetails.upiId) newErrors.upiId = 'UPI ID is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};
    if (paymentMethod === 'card') {
      validationErrors = validateCardDetails();
    } else {
      validationErrors = validateUpiDetails();
    }
    if (Object.keys(validationErrors).length === 0) {
      setStep(paymentMethod === 'card' ? 'otp' : 'pin');
    } else {
      setErrors(validationErrors);
    }
  };

  const processPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/payment-success'); // Navigate to the success page
    }, 5000);
  };

  // Check if the amount field is valid for enabling/disabling the button
  const isAmountValid = (amount) => {
    return amount && !isNaN(amount) && Number(amount) > 0;
  };

  return (
    <div>
      <div className='page'>
        <Header1 />
      </div>
      <div className="payment-container">
        <h2 className='bg-success'>Payment Page</h2>
        {step === 'payment' && (
          <>
            <div className="payment-method">
              <label>
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={handlePaymentMethodChange}
                />
                Card
              </label>
              <label>
                <input
                  type="radio"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={handlePaymentMethodChange}
                />
                UPI
              </label>
            </div>

            {paymentMethod === 'card' && (
              <div className="card-payment active">
                <h3>Card Payment</h3>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>Card Holder Name:</label>
                    <input
                      type="text"
                      name="cardHolderName"
                      placeholder="Muthu Kumar"
                      value={cardDetails.cardHolderName}
                      onChange={handleCardDetailsChange}
                    />
                    {errors.cardHolderName && <p className="error">{errors.cardHolderName}</p>}
                  </div>
                  <div>
                    <label>Card Number:</label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="xxxx-xxxx-xxxx-xxxx"
                      value={cardDetails.cardNumber}
                      onChange={handleCardDetailsChange}
                    />
                    {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}
                  </div>
                  <div>
                    <label>Expiry Date (MM/YY):</label>
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={cardDetails.expiryDate}
                      onChange={handleCardDetailsChange}
                    />
                    {errors.expiryDate && <p className="error">{errors.expiryDate}</p>}
                  </div>
                  <div>
                    <label>CVV:</label>
                    <input
                      type="text"
                      name="cvv"
                      placeholder="..."
                      value={cardDetails.cvv}
                      onChange={handleCardDetailsChange}
                    />
                    {errors.cvv && <p className="error">{errors.cvv}</p>}
                  </div>

                  <div>
                    <label>Amount:</label>
                    <input
                      type="text"
                      name="amount"
                      placeholder="Rs"
                      value={cardDetails.amount}
                      disabled // Disable the amount field
                    />
                    {errors.amount && <p className="error">{errors.amount}</p>}
                  </div>
                  <br/>
                  <button 
                    type="submit"
                    disabled={!isAmountValid(cardDetails.amount)}
                  >
                    Pay
                  </button>
                </form>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="upi-payment active">
                <h3>UPI Payment</h3>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>UPI ID:</label>
                    <input
                      type="text"
                      name="upiId"
                      placeholder="example@upi"
                      value={upiDetails.upiId}
                      onChange={handleUpiDetailsChange}
                    />
                    {errors.upiId && <p className="error">{errors.upiId}</p>}
                  </div>

                  <div>
                    <label>Amount:</label>
                    <input
                      type="text"
                      name="amount"
                      placeholder="Rs"
                      value={cardDetails.amount}
                      disabled // Disable the amount field
                    />
                    {errors.amount && <p className="error">{errors.amount}</p>}
                  </div>
                  <br/>
                  <button 
                    type="submit"
                    disabled={!isAmountValid(cardDetails.amount)}
                  >
                    Pay
                  </button>
                </form>
              </div>
            )}
          </>
        )}

        {step === 'otp' && (
          <OtpPage processPayment={processPayment} isProcessing={isProcessing} />
        )}

        {step === 'pin' && (
          <PinPage processPayment={processPayment} isProcessing={isProcessing} />
        )}
      </div>
    </div>
  );
}

export default PaymentPage;




