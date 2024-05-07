import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, CssBaseline } from '@mui/material';
import Navbar from '../Navbar';
import Avatar from '@mui/material/Avatar';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import axios from 'axios';
import { useContext } from 'react';
import { LoggedInUserContext } from '../../Context/LoggedInUserContext';

export default function ChangePassword({ userRole }) {
  const { loggedinUser } = useContext(LoggedInUserContext);
  const authToken = loggedinUser.token;
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form data
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    
    try {
      // Make a POST request to your API endpoint
      const response = await axios.post('http://localhost:9191/api/v1/autheticate/changePass', {
        oldPassword,
        newPassword,
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }});
      
      console.log('Password successfully changed:', response.data);
      // Reset form fields and error state
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setError('Password successfully changed.');
    } catch (error) {
      // Handle errors
      console.error('Error changing password:', error);
      setError('An error occurred while changing password.');
    }
  };

  return (
    <div>
      <Navbar userRole={userRole} />
      <CssBaseline />
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
                label="Old Password"
                type="password"
                fullWidth
                margin="normal"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                autoFocus
                sx={inputStyles}
              />
              <TextField
                label="New Password"
                type="password"
                fullWidth
                margin="normal"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                sx={inputStyles}
              />
              <TextField
                label="Confirm New Password"
                type="password"
                fullWidth
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={inputStyles}
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

// Common input styles
const inputStyles = {
  backgroundColor: '#fff',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  '& .MuiInputLabel-root': { color: '#000' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: '#000', borderRadius: '4px' },
    '&:hover fieldset': { borderColor: '#000' },
    '&.Mui-focused fieldset': { borderColor: '#000' },
  },
};
