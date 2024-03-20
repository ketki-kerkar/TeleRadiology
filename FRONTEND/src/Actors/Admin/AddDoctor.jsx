import {useState, React, useEffect} from "react";
import { styled } from '@mui/system';
import { FormControlLabel, InputLabel, Button, CssBaseline, TextField, FormControl, RadioGroup, Radio, Grid, Typography, Container, Select, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from "../../Components/Navbar";
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';



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
  width: "65vw",
  marginTop: theme.spacing(3)
}));

export default function AddDoctor() {
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
  const [registrationSuccess, setRegistrationSuccess] = useState(false);


  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:9191/api/v1/admin/viewList/ofHospitals')
    .then(response => {
        // Extracting only the hospital names from the response data
        const hospitalNames = response.data.map(hospital => hospital.hospitalName);
        console.log(hospitalNames); // Log the extracted hospital names
        setHospital(hospitalNames); // Set the hospital state with only the names
    })
    .catch(error => {
        console.error('Error:', error); // Handle error
    });
}, []);
  const handlefNameChange = (event) => {
    const value = event.target.value;
    setFirstName(value);
    setNameError(value.length < 3); // Set error if name is less than or equal to 3 characters
  };

  const handlelNameChange = (event) => {
    const value = event.target.value;
    setLastName(value);
    setNameError(value.length < 3); // Set error if name is less than or equal to 3 characters
  };

  const validateEmail = (email) => {
    // Regular expression for validating email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setEmailError(!validateEmail(value)); // Set error if email is invalid
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
    event.preventDefault(); // Prevent default form submission
    const formData = {
      doctorName: `${firstName} ${lastName}`,
      gender: gender,
      email: email,
      role: speciality,
      qualification: qualification,
      department: department,
      hospitalName: selectedHospital
    };
    axios.post('http://localhost:9191/api/v1/admin/add-doctor', formData)
      .then(response => {
        console.log(response.data);
        // Set registrationSuccess to true
        setRegistrationSuccess(true);
        // Redirect to homepage after 2 seconds
        setTimeout(() => {
          navigate('/admin/listDoctor'); // Replace '/' with the URL of your homepage
        }, 2000);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  return (
    <ThemeProvider theme={theme}>
      <body style={{backgroundColor: '#F7FBFF', margin: 0, padding: 0}}>
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
          {registrationSuccess && (
          <Typography variant="body1" color="primary" align="center">
            Registration successful! Redirecting to homepage...
          </Typography>
          )}
          <Button onClick={handleSubmit}
            variant="contained"
            style={{ borderRadius:'5px',position: 'fixed',height:'5.8vh',width:'15vw',marginTop:'15px',right:'17.5vw',backgroundColor: '#7fdeff',color:'#000',fontFamily: 'Quicksand, sans-serif',
            fontSize: '1vw' }}
          >
            Submit
          </Button>
  
        </StyledForm>
      </div>
    </StyledContainer>
    </body>
    </ThemeProvider>
  );
}
