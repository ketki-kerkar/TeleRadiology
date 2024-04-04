import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import Navbar from '../Navbar';
import Avatar from '@mui/material/Avatar';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';

export default function ChangePassword({ userRole }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    // Implement logic for changing password
    console.log('Changing password...');
    // Reset form fields
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
  };

  return (
    <div>
      <Navbar userRole={userRole} />
      <Grid container justifyContent="center" style={{ height: '100vh', marginTop:'60px'}}>
        <Grid item xs={6}>
          <Paper style={{ padding: 20 }}>
          <Avatar sx={{ bgcolor: '#1976D2',  margin: 'auto' , marginBottom:'10px'}}>
         <EnhancedEncryptionIcon/>
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
                sx={{backgroundColor: '#fff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',  '& .MuiInputLabel-root': {color: '#000'},
                '& .MuiOutlinedInput-root': {'& fieldset': { borderColor: '#000', borderRadius: '4px', },'&:hover fieldset': { borderColor: '#000',},
                  '&.Mui-focused fieldset': {borderColor: '#000', },},}}
              />
              <TextField
                label="New Password"
                type="password"
                fullWidth
                margin="normal"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoFocus
                sx={{backgroundColor: '#fff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',  '& .MuiInputLabel-root': {color: '#000'},
                '& .MuiOutlinedInput-root': {'& fieldset': { borderColor: '#000', borderRadius: '4px', },'&:hover fieldset': { borderColor: '#000',},
                  '&.Mui-focused fieldset': {borderColor: '#000', },},}}
              />
              <TextField
                label="Confirm New Password"
                type="password"
                fullWidth
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoFocus
                sx={{backgroundColor: '#fff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',  '& .MuiInputLabel-root': {color: '#000'},
                '& .MuiOutlinedInput-root': {'& fieldset': { borderColor: '#000', borderRadius: '4px', },'&:hover fieldset': { borderColor: '#000',},
                  '&.Mui-focused fieldset': {borderColor: '#000', },},}}
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
