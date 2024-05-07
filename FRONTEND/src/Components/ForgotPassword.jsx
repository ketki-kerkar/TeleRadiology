import React, { useState } from 'react';
import { Typography, TextField, Button, Container, Grid, Paper, CssBaseline } from '@mui/material';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import LockResetIcon from '@mui/icons-material/LockReset';

function ForgotPassword() {
  const authToken = localStorage.getItem('authToken');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Here you can send a reset password request to your server
      const response = await axios.post('http://localhost:9191/api/v1/forgot-password', { email },  {
        headers: {
          Authorization: `Bearer ${authToken}`
        }});
      setMessage(response.data.message);
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
      console.error('Reset password error:', error);
    }
  };

  return (
    <Container maxWidth="sm">
    <CssBaseline/>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '150px' }}>
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', width: '100%' }}>
        <Avatar sx={{ bgcolor: '#1976D2',  margin: 'auto' , marginBottom:'10px'}}>
         <LockResetIcon />
        </Avatar>
          <Typography variant="h6" gutterBottom>Forgot Password</Typography>
          {message && <Typography variant="body1" gutterBottom>{message}</Typography>}
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
                <Button type="submit" variant="contained" color="primary">
                  Reset Password
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>
    </Container>
  );
}

export default ForgotPassword;
