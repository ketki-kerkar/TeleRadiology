import React, { useState } from 'react';
import { Typography, TextField, Button, Container, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import LockResetIcon from '@mui/icons-material/LockReset';

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      // Call the backend API to check if the email exists
      console.log('Email entered:', email); // Log the email entered
      const response = await axios.post( 'http://localhost:9191/api/v1/forgot-password', { email });
      console.log(response);     
      
      if (response.status === 200) {
        // If email exists, navigate to the OTP generation page and pass the email as state
        setMessage('');
        navigate('/otpGen', { state: { email: email } }); // Corrected navigation path
  
      } else {
        setMessage('Enter a valid email address.'); // Show error message
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
      console.error('Reset password error:', error);
    }
  };
  

  return (
    <Container maxWidth="sm">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '150px' }}>
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', width: '100%' }}>
          <Avatar sx={{ bgcolor: '#1976D2', margin: 'auto', marginBottom: '10px' }}>
            <LockResetIcon />
          </Avatar>
          <Typography variant="h6" gutterBottom>Forgot Password</Typography>
          {message && <Typography variant="body1" gutterBottom>{message}</Typography>}
          <div style={{ width: '100%' }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  sx={{
                    backgroundColor: '#fff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', '& .MuiInputLabel-root': { color: '#000' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#000', borderRadius: '4px' }, '&:hover fieldset': { borderColor: '#000' },
                      '&.Mui-focused fieldset': { borderColor: '#000' },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                {/* Pass email as state to the OTPgen page */}
                {/* <Link to={{ pathname: "/otpGen",{state : {email}}}} style={{ textDecoration: 'none' }}> */}
                  <Button variant="contained" color="primary" onClick={() => handleResetPassword()}>
                    Reset Password
                  </Button>
                {/* </Link> */}
              </Grid>
            </Grid>
          </div>
        </Paper>
      </div>
    </Container>
  );
}

export default ForgetPassword;
