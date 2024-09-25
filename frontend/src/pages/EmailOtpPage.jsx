import { Button } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmailOtpPage = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      alert('Please enter a valid OTP');
      setOtp('');
      return;
    }

    const uniqueId = localStorage.getItem('uniqueId');
    if (!uniqueId) {
      alert('Unique ID not found');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("https://surakshak-apis.onrender.com/api/v1/senior/verify-otp", {
        uniqueId: uniqueId,
        otp: otp
      });

      if (response.status === 200) {
        alert('OTP verified successfully!');
        navigate('/login'); // Redirect to login page
      } else {
        alert('OTP verification failed');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg" style={{ width: '400px' }}>
        <div className="card-header text-center">
          <h5 className="text-lg">Email OTP Verification</h5>
        </div>
        <div className="card-body">
          <p className="card-text text-lg text-center">
            Please enter the OTP sent to your email to verify your account.
          </p>

          <div className="mb-3">
            <label htmlFor="otpInput" className="form-label text-lg">Enter OTP</label>
            <input
              type="text"
              className="form-control text-start"
              id="otpInput"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
            />
          </div>
          <div className="d-grid gap-2">
            <Button variant="contained" disabled={loading} onClick={handleSubmit}>{loading ? 'Verifying...' : 'Verify OTP'}</Button>
          </div>

          <div className="mt-3 text-center">
            <small>Didn't receive the code? <a href="#">Resend OTP</a></small>
          </div>
        </div>
      </div>
    </div>

  )
}

export default EmailOtpPage