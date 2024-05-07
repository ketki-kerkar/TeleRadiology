import React, { useState } from "react";
import { styled } from '@mui/system';
import { FormControlLabel, InputLabel, Button, CssBaseline, TextField, FormControl, RadioGroup, Radio, Grid, Typography, Container, Select, MenuItem, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
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

export default function AddPatient() {
  const { loggedinUser } = useContext(LoggedInUserContext);
  const authToken = loggedinUser.token;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [dob, setDOB] = useState("");
  const [bloodGroup, setbloodGroup] = useState("");
  const [address, setaddress] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const handlefNameChange = (event) => {
    const value = event.target.value;
    setFirstName(value);
    setNameError(value.length < 3);
  };

  const handlelNameChange = (event) => {
    const value = event.target.value;
    setLastName(value);
    setNameError(value.length < 3);
  };

  const handleContactChange = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "");
    value = value.slice(0, 10);
    setContact(value);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setEmailError(!validateEmail(value));
  };

  const handleDOBChange = (event) => {
    setDOB(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handlebloodGroupChange = (event) => {
    setbloodGroup(event.target.value);
  };

  const handleAddressChange = (event) => {
    setaddress(event.target.value);
  };

  const [labelClicked, setLabelClicked] = useState(false);

  const handleLabelClick = () => {
    setLabelClicked(true);
  };

  const handleSubmit = () => {
    setSubmitting(true);
    const formData = {
      name: `${firstName} ${lastName}`,
      dateOfBirth: dob,
      gender: gender,
      bloodGroup: bloodGroup,
      contact: contact,
      address: address,
      email: email,
    };
    axios.post('http://localhost:9191/api/v1/receptionist/add-patient', formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
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
    navigate('/receptionist');
  };
  return (
    <ThemeProvider theme={theme}>
  
    <Navbar userRole="receptionist"/>
    <StyledContainer component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Patient Registration
        </Typography>
        <StyledForm noValidate>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={firstName}
                helperText={nameError ? "Enter a valid First Name" : ""}
                onChange={handlefNameChange}
                autoFocus
                sx={{backgroundColor: '#fff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',  '& .MuiInputLabel-root': {color: '#000'},
                '& .MuiOutlinedInput-root': {'& fieldset': { borderColor: '#000', borderRadius: '4px', },'&:hover fieldset': { borderColor: '#000',},
                  '&.Mui-focused fieldset': {borderColor: '#000', },},}}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastName}
                helperText={nameError ? "Enter a valid Last Name" : ""}
                onChange={handlelNameChange}
                sx={{backgroundColor: '#fff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',  '& .MuiInputLabel-root': {color: '#000'},
                '& .MuiOutlinedInput-root': {'& fieldset': { borderColor: '#000', borderRadius: '4px', },'&:hover fieldset': { borderColor: '#000',},
                  '&.Mui-focused fieldset': {borderColor: '#000', },},}}
              />
            </Grid>
            <Grid item xs={12}>
                <RadioGroup
                row
                aria-label="gender"
                name="gender"
                value={gender}
                onChange={handleGenderChange}
                label="Gender"
                >
                <FormControlLabel value="Male" control={<Radio /> }  label="Male"/>
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                </RadioGroup>
            </Grid>
            <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    name="contact"
                    label="Contact Number"
                    type="text"
                    autoComplete="contact"
                    id="contact"
                    value={contact}
                    onChange={handleContactChange}
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
                helperText={emailError ? "Enter a valid email" : ""}
                onChange={handleEmailChange}
                value ={email}
                sx={{backgroundColor: '#fff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',  '& .MuiInputLabel-root': {color: '#000'},
                '& .MuiOutlinedInput-root': {'& fieldset': { borderColor: '#000', borderRadius: '4px', },'&:hover fieldset': { borderColor: '#000',},
                  '&.Mui-focused fieldset': {borderColor: '#000', },},}}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                fullWidth
                required
                name="dob"
                type="date"
                id="dob"
                value={dob}
                helperText="Enter Date Of Birth"
                onChange={handleDOBChange}
                InputLabelProps={{
                    shrink: labelClicked || Boolean(dob), // Shrink the label if it's clicked or if there's a value in the input field
                    onClick: handleLabelClick, // Handle click event on the label to set the state
                }}
                sx={{
                    backgroundColor: '#fff',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    '& .MuiInputLabel-root': { color: '#000', fontSize: '14px' },
                    '& .MuiInputBase-input[type="date"]': { height: '1.8rem' },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#000', borderRadius: '4px' },
                        '&:hover fieldset': { borderColor: '#000' },
                        '&.Mui-focused fieldset': { borderColor: '#000' },
                    },
                }}
            />
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" sx={{backgroundColor: '#fff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',  '& .MuiInputLabel-root': {color: '#000'},
                '& .MuiOutlinedInput-root': {'& fieldset': { borderColor: '#000', borderRadius: '4px', },'&:hover fieldset': { borderColor: '#000',},
                  '&.Mui-focused fieldset': {borderColor: '#000', },},}}>
                <InputLabel id="bloodGroup">Blood Group *</InputLabel>
                <Select
                    required
                    labelId="bloodGroup"
                    id="bloodGroup"
                    value={bloodGroup}
                    onChange={handlebloodGroupChange}
                    label = "Blood Group"
                >
                    <MenuItem disabled>Select</MenuItem>
                    <MenuItem value="A+">A+</MenuItem>
                    <MenuItem value="A-">A-</MenuItem>
                    <MenuItem value="B+">B+</MenuItem>
                    <MenuItem value="B-">B-</MenuItem>
                    <MenuItem value ="AB+">AB+</MenuItem>
                    <MenuItem value="AB-">AB-</MenuItem>
                    <MenuItem value="O+">O+</MenuItem>
                    <MenuItem value="O-">O-</MenuItem>
                </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    multiline
                    rows={4} // Adjust the number of rows based on your preference
                    value={address}
                    onChange={handleAddressChange}
                    sx={{
                        backgroundColor: '#fff',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                        '& .MuiInputLabel-root': { color: '#000' },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: '#000', borderRadius: '4px' },
                            '&:hover fieldset': { borderColor: '#000' },
                            '&.Mui-focused fieldset': { borderColor: '#000' },
                        },
                        width: '100%',
                    }}
                />
            </Grid>
            <Grid item xs={12}>
            <FormControlLabel
                required
                control={<Checkbox value="remember" color="primary" />}
                label="By checking this box, I indicate my acceptance of these terms and conditions and consent to the use of this healthcare app in accordance with its policies."
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
