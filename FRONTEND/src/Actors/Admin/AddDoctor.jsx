import React, { useState, useEffect } from "react";
import { styled } from '@mui/system';
import { FormControlLabel, InputLabel, Button, CssBaseline, TextField, FormControl, RadioGroup, Radio, Grid, Typography, Container, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
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

export default function AddDoctor() {
  const { loggedinUser } = useContext(LoggedInUserContext);
  const authToken = loggedinUser.token;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [speciality, setSpeciality] = useState("");
  const [qualification, setQualification] = useState("");
  const [department, setDepartment] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("");
  const [hospital, setHospital] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:9191/api/v1/admin/viewList/ofHospitals', {
      headers: {
        Authorization: `Bearer ${authToken}`
      }})
      .then(response => {
        const hospitalNames = response.data.map(hospital => hospital.hospitalName);
        setHospital(hospitalNames);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [authToken]);

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

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setEmailError(!validateEmail(value));
  };

  const handleQualificationChange = (event) => {
    setQualification(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleSpecialityChange = (event) => {
    setSpeciality(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleHospitalChange = (event) => {
    setSelectedHospital(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);
    const formData = {
      email: email,
      role: speciality,
      doctorName: `${firstName} ${lastName}`,
      gender: gender,
      qualification: qualification,
      department: department,
      hospitalName: selectedHospital
    };
    axios.post('http://localhost:9191/api/v1/admin/add-doctor', formData,  {
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
    navigate('/admin/listDoctor');
  };

  return (
    <ThemeProvider theme={theme}>
    <Navbar userRole="admin"/>
    <StyledContainer component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Doctor Registration
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
                <FormControlLabel value="male" control={<Radio /> }  label="Male"/>
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                </RadioGroup>
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
            <Grid item xs ={12}>
                <TextField fullWidth
                required
                name="speciality"
                label="Speciality"
                type ="text"
                autoComplete="speciality"
                id="speciality"
                value ={speciality}
                onChange={handleSpecialityChange}
                sx={{backgroundColor: '#fff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',  '& .MuiInputLabel-root': {color: '#000'},
                '& .MuiOutlinedInput-root': {'& fieldset': { borderColor: '#000', borderRadius: '4px', },'&:hover fieldset': { borderColor: '#000',},
                  '&.Mui-focused fieldset': {borderColor: '#000', },},}}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" sx={{backgroundColor: '#fff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',  '& .MuiInputLabel-root': {color: '#000'},
                '& .MuiOutlinedInput-root': {'& fieldset': { borderColor: '#000', borderRadius: '4px', },'&:hover fieldset': { borderColor: '#000',},
                  '&.Mui-focused fieldset': {borderColor: '#000', },},}}>
                <InputLabel id="Qualification">Qualification</InputLabel>
                <Select
                    labelId="qualification"
                    id="qualification"
                    value={qualification}
                    onChange={handleQualificationChange}
                    label="Qualification"
                >
                    <MenuItem disabled>Select</MenuItem>
                    <MenuItem value="DM">Doctorate of Medicine (D.M)</MenuItem>
                    <MenuItem value="MD">Doctor of Medicine (M.D)</MenuItem>
                    <MenuItem value="DO">Doctor of Osteopathic Medicine (D.O)</MenuItem>
                    <MenuItem value="DNB">Diplomate of National Board (D.N.B)</MenuItem>
                    <MenuItem value ="MS">Doctor of Medicine (M.S)</MenuItem>
                    <MenuItem value="MBBS">Bachelor of Medicine, Bachelor of Surger(M.B.B.S)</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" sx={{backgroundColor: '#fff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',  '& .MuiInputLabel-root': {color: '#000'},
                '& .MuiOutlinedInput-root': {'& fieldset': { borderColor: '#000', borderRadius: '4px', },'&:hover fieldset': { borderColor: '#000',},
                  '&.Mui-focused fieldset': {borderColor: '#000', },},}}>
                <InputLabel id="department">Department</InputLabel>
                <Select
                    labelId="department"
                    id="department"
                    value={department}
                    onChange={handleDepartmentChange}
                    label="Department"
                >
                    <MenuItem disabled>Select</MenuItem>
                    <MenuItem value="orthopaedics">Orthopaedics</MenuItem>
                    <MenuItem value="radiology">Radiology</MenuItem>
                    
                </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" sx={{backgroundColor: '#fff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',  '& .MuiInputLabel-root': {color: '#000'},
                '& .MuiOutlinedInput-root': {'& fieldset': { borderColor: '#000', borderRadius: '4px', },'&:hover fieldset': { borderColor: '#000',},
                  '&.Mui-focused fieldset': {borderColor: '#000', },},}}>
                    <InputLabel id="hospital">Hospital</InputLabel>
                    <Select
                    required
                    labelId="hospital"
                    id="hospital"
                    value={selectedHospital}
                    onChange={handleHospitalChange}
                    label="Hospital"
                    >
                    <MenuItem disabled>Select</MenuItem>
                    {hospital.map((hospital) => (
                        <MenuItem key={hospital} value={hospital}>
                        {hospital}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
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

        