import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';
import axios from 'axios';
import { CssBaseline, Grid, TextField, Autocomplete, Container, CircularProgress, Typography, Button, Paper} from '@mui/material';
import Navbar from '../../Components/Navbar';

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
  width: "55vw",
}));


function CreateCase() {
  const [patientId, setPatientId] = useState('');
  const [suggestedPatientIds, setSuggestedPatientIds] = useState([]);
  const [patientData, setPatientData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:9191/api/v1/receptionist/viewPatients')
      .then(response => {
        setSuggestedPatientIds(response.data);
      })
      .catch(error => {
        console.error('Error fetching suggested patient IDs:', error);
      });
  }, []);
  

  const handlePatientSelect = (event, newValue) => {
    setPatientId(newValue);
    if (newValue) {
      setIsLoading(true);
      setError(null); // Clear previous errors
      const selectedPatient = suggestedPatientIds.find(patient => patient.patientId === newValue);
      if (selectedPatient) {
        setPatientData(selectedPatient);
      } else {
        setError(new Error('Patient data not found for selected ID'));
      }
      setIsLoading(false);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      
    };
    axios.post('http://localhost:9191/api/v1/receptionist/new-case', formData)
      .then(response => {
        
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <ThemeProvider theme={theme}>
      <Navbar userRole='receptionist' />
      <CssBaseline />
      <StyledContainer>
      <Grid item xs={12}>
          <Typography variant="body1" sx={{ display: 'flex', alignItems: 'baseline' , margin: '10px 0px'}}>Select the patient Id for new case:</Typography>
          <Autocomplete
            id="patient-id-autocomplete"
            options={suggestedPatientIds.map(patient => patient.patientId)} // Update options to include only patient IDs
            value={patientId}
            onChange={handlePatientSelect}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Patient ID"
                variant="outlined"
                sx={{ backgroundColor: '#fff' }}
              />
            )}
          />
          {isLoading && <CircularProgress sx={{ mt: 2 }} />}
          {error && <p style={{ color: 'red' }}>{error.message}</p>}
          {patientData && (
            <>
            <Paper sx={{ padding: 2, bgcolor: 'white' , marginTop: '25px'}}>
              <h2>Patient Details</h2>
              <Grid container spacing={2} sx={{alignItems:'left'}}>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'baseline' }}>Name: {patientData.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1"sx={{ display: 'flex', alignItems: 'baseline' }}>Age: {patientData.age}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'baseline' }}>Gender: {patientData.gender}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'baseline' }}>Contact: {patientData.contact}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'baseline' }}>Email ID: {patientData.emailId}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'baseline' }}>Address: {patientData.address}</Typography>
                </Grid>
                
              </Grid>
              </Paper>
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

            </>
          )}
        </Grid>
      </StyledContainer>
    </ThemeProvider>
  );
}

export default CreateCase;
