import React, { useState, useEffect, useRef } from 'react';
import { Typography, Button, Container, Grid, Paper } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Link, useLocation } from 'react-router-dom';
import LockResetIcon from '@mui/icons-material/LockReset';
import axios from 'axios';

function OTPgen() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [message, setMessage] = useState('');
  const [isOtpComplete, setIsOtpComplete] = useState(false);
  const location = useLocation();
  const email = location.state?.email || '';
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  useEffect(() => {
    setIsOtpComplete(otp.every(digit => digit !== ''));
  }, [otp]);

  const handleChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== '' && index < 5) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOTP = otp.join('');
    if (enteredOTP.length === 6 && /^\d+$/.test(enteredOTP)) {
      setMessage('OTP verified successfully.');
      // Redirect to NewPassAfterOtp component with email and OTP values
      // Using Link component
      return (
        <Link to={{
          pathname: "/newPass",
          state: { email, otp: otp.join('') } // Pass email and OTP
        }} />
      );
    } else {
      setMessage('Invalid OTP. Please enter a 6-digit numeric OTP.');
    }
  };

  return (
    <Container maxWidth="sm">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '150px' }}>
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', width: '100%' }}>
          <Avatar sx={{ bgcolor: '#1976D2',  margin: 'auto' , marginBottom:'10px'}}>
            <LockResetIcon />
          </Avatar>
          <Typography variant="h6" gutterBottom style={{ fontFamily: 'Quicksand' ,color: '#808080'}}>Enter the OTP sent to your registered Email Id !</Typography>
          {message && <Typography variant="body1" gutterBottom style={{ fontFamily: 'Quicksand' }}>{message}</Typography>}
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Grid container spacing={1} justifyContent="center">
              {otp.map((digit, index) => (
                <Grid item key={index}>
                  <input
                    type="text"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    maxLength={1}
                    pattern="[0-9]*"
                    style={{
                      width: '40px',
                      height: '40px',
                      padding: '10px',
                      fontSize: '20px',
                      border: '1px solid #000',
                      borderRadius: '10px',
                      textAlign: 'center'
                    }}
                    ref={inputRefs[index]}
                  />
                </Grid>
              ))}
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: '20px', fontSize: '1.2rem' }}
              disabled={!isOtpComplete}
            >
              Verify OTP
            </Button>
          </form>
        </Paper>
      </div>
    </Container>
  );
}

export default OTPgen;
