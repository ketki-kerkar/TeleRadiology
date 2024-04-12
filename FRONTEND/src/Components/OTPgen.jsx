import React, { useState, useEffect, useRef } from 'react';
import { Typography, Button, Container, Grid, Paper } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LockResetIcon from '@mui/icons-material/LockReset';
import axios from 'axios';

function OTPgen() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otptopass, setOtptoPass] = useState('')
  const [message, setMessage] = useState('');
  const [isOtpComplete, setIsOtpComplete] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location?.state;
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  useEffect(() => {
    console.log("emailotp page", email);
    console.log("otptopass",otptopass)
  }, []);

  useEffect(() => {
    setIsOtpComplete(otp.every(digit => digit !== ''));
  }, [otp]);

  const handleChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      console.log("hihihiihih", newOtp);
      if (value !== '' && index < 5) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOTP = otp.join('');
    console.log("enteredOTP",enteredOTP)
    // setOtptoPass(enteredOTP);
    // console.log("otp",otp)

    if (enteredOTP.length === 6) {
      try {
        const response = await axios.post('http://localhost:9191/api/v1/verify-otp', { email, otp: enteredOTP });

        console.log(response);

        if (response.status === 200) {
          setMessage('OTP verified successfully.');
          navigate("/newPass",{state:{email:email,otp:enteredOTP}})
          console.log('Email received:', email); // Log received email
        } else {
          setMessage('Invalid OTP or email.');
        }
      } catch (error) {
        console.error('Error verifying OTP:', error);
        if (error.response && error.response.status === 400) {
          setMessage('Invalid OTP. Please enter a valid OTP.');
        } else {
          setMessage('An error occurred. Please try again later.');
        }
      }
    } else {
      setMessage('Please enter a 6-digit OTP.');
    }
  };


  return (
    <Container maxWidth="sm">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '150px' }}>
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', width: '100%' }}>
          <Avatar sx={{ bgcolor: '#1976D2', margin: 'auto', marginBottom: '10px' }}>
            <LockResetIcon />
          </Avatar>
          <Typography variant="h6" gutterBottom style={{ fontFamily: 'Quicksand', color: '#808080' }}>Enter the OTP sent to your registered Email Id !</Typography>
          {message && <Typography variant="body1" gutterBottom style={{ fontFamily: 'Quicksand' }}>{message}</Typography>}
          <form onSubmit={(e) => handleSubmit(e)} style={{ width: '100%' }}>
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
            {/* Add Link to NewPassAfterOtp component */}
            
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
