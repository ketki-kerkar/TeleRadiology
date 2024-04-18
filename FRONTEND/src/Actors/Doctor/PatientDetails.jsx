import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';
import { CssBaseline, Card, CardContent, Typography, Divider, Avatar, Grid, Paper , Form } from '@mui/material';
import Navbar from '../../Components/Navbar';
import axios from 'axios';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#F7FBFF'
    },
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3), 
  backgroundColor: 'white',
  marginTop: theme.spacing(2),
  marginLeft: theme.spacing(2), 
  marginRight: theme.spacing(2), 
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  borderRadius: '4px',
  display: 'flex', 
  flexDirection: 'column', 
  border: '1px solid black', 
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#000',
      borderRadius: '8px',
    },
  },
  textAlign: 'left', 
  height: '87vh',// Align items to the left
}));

const StyledForm = styled('form')(({ theme }) => ({
  marginTop: theme.spacing(2)
}));
function PatientCard() {
  const authToken = localStorage.getItem('authToken')
  const [patientDetails, setPatientDetails] = useState({});
  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9191/api/v1/doctor/viewList/ofPatients',  {
          headers: {
            Authorization: `Bearer ${authToken}`
          }}); // Replace with your API endpoint
        setPatientDetails(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setFetchingData(false);
      }
    };

    fetchData();
  }, [authToken]);

  return (
    <ThemeProvider theme={theme}>
      <Navbar userRole='doctor'/>
    <CssBaseline/>
    <Grid container spacing = {2}>
      <Grid item xs={3}>
          <StyledPaper>
          <Avatar 
              sx={{ 
              width: 150, 
              height: 150,  
              margin:'20px 100px',
           }}
>
                {patientDetails.initials || 'EM'}
              </Avatar>
              <Typography variant="h4" component="h2"  gutterBottom sx={{ textAlign:'center', marginBottom:'10px'}}>
                {patientDetails.name || 'Eleanor Medina'}
              </Typography>
              <Typography variant="h6" gutterBottom>Patient ID: 
                 90ELEA90
              </Typography>
              <Typography variant="h6" gutterBottom>Age: 
                {patientDetails.age || '22'}
              </Typography>
              <Typography variant="h6"  gutterBottom>
                Gender: {patientDetails.gender || 'Female'}
              </Typography>
              <Divider />
              <Typography variant="h6"  gutterBottom>
                Date Of Birth: {patientDetails.dob || '22/02/24'}
              </Typography>
              <Typography variant="h6"  gutterBottom>
                Blood Group: {patientDetails.bloodGroup || 'O+ve'}
              </Typography>
              <Typography variant="h6"  gutterBottom>
                Last Visit: 14/12/2023
              </Typography>
              <Typography variant="h6"  gutterBottom>
                Contact: 9878987777
              </Typography>
              <Typography variant="h6" gutterBottom>
                Email: eleanor.medina@gmail.com
              </Typography>
              <Typography variant="h6"  gutterBottom>
                Address: 42053 Agripina Extension, Lake Charleneview, CA 29920-3189
              </Typography>
            </StyledPaper>
          </Grid>
          <Grid item xs={9}>
            <StyledForm>

              </StyledForm>
           
          </Grid>
        </Grid>
     
      </ThemeProvider>
  );
}

export default PatientCard;
