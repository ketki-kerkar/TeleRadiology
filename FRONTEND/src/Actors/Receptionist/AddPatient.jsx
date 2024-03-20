import {useState, React} from "react";
import { styled } from '@mui/system';
import { FormControlLabel, InputLabel, Button, CssBaseline, TextField, FormControl, RadioGroup, Radio, Grid, Typography, Container, Select, MenuItem, Checkbox } from '@mui/material';
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

export default function AddPatient() {
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");const [nameError, setNameError] = useState(false);
    const [gender, setGender] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");const [emailError, setEmailError] = useState(false);
    const [dob, setDOB] = useState("");
    const [bloodGroup, setbloodGroup] = useState("");
    const [address, setaddress] = useState("");
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const navigate = useNavigate();

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
    const handleContactChange = (event) => {
        let value = event.target.value;
        value = value.replace(/\D/g, "");
        value = value.slice(0, 10);
        setContact(value);
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

    const handleDOBChange = (event) => {
        setDOB(event.target.value);
    };
    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };
    
    const handlebloodGroupChange = (event) =>{
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
        const formData = {
        firstName: firstName,
        lastName: lastName,
        gender:gender,
        email: email,
        DOB: dob,
        };
        axios.post('http://localhost:9191/api/v1/receptionist/add-patient', formData)
      .then(response => {
        console.log(response.data);
        // Set registrationSuccess to true
        setRegistrationSuccess(true);
        // Redirect to homepage after 2 seconds
        setTimeout(() => {
          navigate('/admin'); // Replace '/' with the URL of your homepage
        }, 2000);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  
  return (
    <ThemeProvider theme={theme}>
      <body style={{backgroundColor: '#F7FBFF', margin: 0, padding: 0}}>
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
                <FormControlLabel value="male" control={<Radio /> }  label="Male"/>
                <FormControlLabel value="female" control={<Radio />} label="Female" />
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
            <Grid xs={12}>
            <FormControlLabel
                required
                control={<Checkbox value="remember" color="primary" />}
                label="By checking this box, I indicate my acceptance of these terms and conditions and consent to the use of this healthcare app in accordance with its policies."
              />
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
