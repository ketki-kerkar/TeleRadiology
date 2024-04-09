// NewPassAfterOtp.jsx
import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useLocation } from 'react-router-dom';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import axios from 'axios'; // Import Axios for making HTTP requests

function NewPassAfterOtp() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Extract email and OTP from query parameters using useLocation hook
  const location = useLocation();
  const { email, otp } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form data
    if (newPassword !== confirmNewPassword) {
      setError("Passwords don't match");
      return;
    }
    // Make API call to change password
    try {
      const response = await axios.post('http://localhost:9191/api/v1/reset-password', {
        email: email,
        otp: otp,
        newPassword: newPassword,
        confirmNewPassword: confirmNewPassword
      });
      // Handle successful response
      console.log('Password changed successfully:', response.data);
      // Optionally, redirect user to a success page or display a success message
    } catch (error) {
      // Handle error
      console.error('Error changing password:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <Grid container justifyContent="center" style={{ height: '100vh', marginTop: '60px' }}>
        <Grid item xs={6}>
          <Paper style={{ padding: 20 }}>
            <Avatar sx={{ bgcolor: '#1976D2', margin: 'auto', marginBottom: '10px' }}>
              <EnhancedEncryptionIcon />
            </Avatar>
            <Typography variant="h5" gutterBottom>
              Change Password
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="New Password"
                type="password"
                fullWidth
                margin="normal"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoFocus
              />
              <TextField
                label="Confirm New Password"
                type="password"
                fullWidth
                margin="normal"
                value={confirmNewPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {error && <Typography variant="body2" color="error">{error}</Typography>}
              <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: 20 }}>
                Change Password
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default NewPassAfterOtp;

