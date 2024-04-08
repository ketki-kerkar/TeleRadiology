import React, { useState, useRef, useEffect } from 'react';
import { Typography, Button, Container, Grid, Paper } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import LockResetIcon from '@mui/icons-material/LockReset';

function OTPgen() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [message, setMessage] = useState('');
  const [isOtpComplete, setIsOtpComplete] = useState(false);

  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  useEffect(() => {
    // Check if all OTP digits are filled
    setIsOtpComplete(otp.every(digit => digit !== ''));
  }, [otp]);

  const handleChange = (index, value) => {
    // Allow only numeric input
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input field if available
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
            <Link to="/newPass" style={{ textDecoration: 'none' }}>
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px', fontSize: '1.2rem' }} disabled={!isOtpComplete}>
              Verify OTP
            </Button>
            </Link>
          </form>
        </Paper>
      </div>
    </Container>
  );
}

export default OTPgen;

