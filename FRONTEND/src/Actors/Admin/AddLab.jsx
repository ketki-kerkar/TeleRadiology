import {React, useState} from "react";
import { styled } from '@mui/system';
import { Button, CssBaseline, TextField,  Grid, Typography, Container} from '@mui/material';
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

export default function AddLab() {
  const [contact, setContact] = useState("");

  const [labName, setlabName] = useState("");
  const [nameError, setNameError] = useState(false);
  
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [registrationSuccess, setRegistrationSuccess] = useState(false);


  const navigate = useNavigate();

  const handleContactChange = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "");
    value = value.slice(0, 10);
    setContact(value);
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    setlabName(value);
    setNameError(value.length < 3); // Set error if name is less than or equal to 3 characters
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setEmailError(!validateEmail(value)); // Set error if email is invalid
  };

  const validateEmail = (email) => {
    // Regular expression for validating email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = () => {
    // Create an object with the form data
    const formData = {
      labName: labName,
      email: email,
      contact: contact
    };

    // Send the form data to the backend using Axios
    axios.post('http://localhost:9191/api/v1/admin/add-lab', formData)
     .then(response => {
      console.log(response.data);
      // Set registrationSuccess to true
      setRegistrationSuccess(true);
      // Redirect to homepage after 2 seconds
      setTimeout(() => {
        navigate('/admin/listLab'); // Replace '/' with the URL of your homepage
      }, 2000);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <body style={{backgroundColor: '#F7FBFF', margin: 0, padding: 0}}>
        <Navbar userRole="admin"/>
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
                    value = {labName}
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
                <Grid item xs={12}>
                  <TextField
                    fullWidth
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
              </Grid>
              {registrationSuccess && (
              <Typography variant="body1" color="primary" align="center">
                Registration successful! Redirecting to homepage...
              </Typography>
              )}
              <Button onClick={handleSubmit}
                variant="contained"
                style={{
                  borderRadius:'5px', position: 'fixed', height:'5.8vh', width:'15vw',
                  marginTop:'15px', right:'17.5vw', backgroundColor: '#7fdeff', color:'#000',
                  fontFamily: 'Quicksand, sans-serif', fontSize: '1vw',
                }}
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
