import { Button } from '@mui/material'
import React from 'react'

const EmailOtpPage = () => {
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
          <form>
            <div className="mb-3">
              <label htmlFor="otpInput" className="form-label text-lg">Enter OTP</label>
              <input
                type="text"
                className="form-control"
                id="otpInput"
                maxLength="6"
                placeholder="Enter 6-digit OTP"
              />
            </div>
            <div className="d-grid gap-2">
              <Button variant="contained">Verify OTP</Button>
            </div>
          </form>
          <div className="mt-3 text-center">
            <small>Didn't receive the code? <a href="#">Resend OTP</a></small>
          </div>
        </div>
      </div>
    </div>

  )
}

export default EmailOtpPage