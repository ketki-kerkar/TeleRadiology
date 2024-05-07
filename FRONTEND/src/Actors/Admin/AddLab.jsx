import React, { useState } from "react";
import { styled } from '@mui/system';
import { Button, CssBaseline, TextField, Grid, Typography, Container , Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from "../../Components/Navbar";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { LoggedInUserContext } from '../../Context/LoggedInUserContext';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#F7FBFF',
    },
  },
});

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: "55vw",
  marginTop: theme.spacing(3)
}));

export default function AddLab() {
  const { loggedinUser } = useContext(LoggedInUserContext);
  const authToken = loggedinUser.token;

  const [labName, setlabName] = useState("");
  const [nameError, setNameError] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  
  const [submitting, setSubmitting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);


  const navigate = useNavigate();

  const handleNameChange = (event) => {
    const value = event.target.value;
    setlabName(value);
    setNameError(value.length < 3);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setEmailError(!validateEmail(value));
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = () => {
    setSubmitting(true);
    const formData = {
      labName: labName,
      email: email,
    };

    axios.post('http://localhost:9191/api/v1/admin/add-lab', formData,  {
      headers: {
        Authorization: `Bearer ${authToken}`
      }})
      .then(response => {
        setSubmitting(false);
        setOpenDialog(true);
      })
      .catch(error => {
        console.error('Error:', error);
        setSubmitting(false);
      });
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate('/admin/listLab');
  };

  return (
    <ThemeProvider theme={theme}>
      <body style={{ backgroundColor: '#F7FBFF', margin: 0, padding: 0 }}>
        <Navbar userRole="admin" />
        <StyledContainer component="main" maxWidth="xs">
          <CssBaseline />
          <div>
            <Typography component="h1" variant="h5">
              Lab Registration
            </Typography>
            <StyledForm noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <TextField
                    autoComplete="labname"
                    name="labName"
                    variant="outlined"
                    required
                    fullWidth
                    id="labName"
                    label="Lab Name"
                    autoFocus
                    value={labName}
                    helperText={nameError ? "Enter a valid Name" : ""}
                    onChange={handleNameChange}
                    sx={{
                      backgroundColor: '#fff',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                      '& .MuiInputLabel-root': {color: '#000'},
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#000', borderRadius: '4px' },
                        '&:hover fieldset': { borderColor: '#000' },
                        '&.Mui-focused fieldset': { borderColor: '#000' },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={email}
                    helperText={emailError ? "Enter a valid email" : ""}
                    onChange={handleEmailChange}
                    sx={{
                      backgroundColor: '#fff',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                      '& .MuiInputLabel-root': {color: '#000'},
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#000', borderRadius: '4px' },
                        '&:hover fieldset': { borderColor: '#000' },
                        '&.Mui-focused fieldset': { borderColor: '#000' },
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ marginTop: '20px', backgroundColor: '#1976d2', color: '#fff', borderRadius: '5px' }}
              disabled={submitting}
              onClick={handleSubmit}
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </Button>
            </StyledForm>
          </div>
        </StyledContainer>
      </body>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Registration Successful</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your registration has been successful. Redirecting to homepage...
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}