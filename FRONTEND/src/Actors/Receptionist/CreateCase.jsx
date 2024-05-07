import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';
import axios from 'axios';
import { CssBaseline, Grid, TextField, Autocomplete, Container, Typography, Button, Paper, FormControl, MenuItem, Select, InputLabel, Snackbar, Alert } from '@mui/material';
import Navbar from '../../Components/Navbar';
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
  width: "55vw",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: 'white',
  marginTop: theme.spacing(2),
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  borderRadius: '4px', // Adjust border radius for a smoother look
  border: '1px solid black', // Add black border
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#000',
      borderRadius: '8px',
    },
  },
}));

export default function CreateCase() {
  const { loggedinUser } = useContext(LoggedInUserContext);
  const authToken = loggedinUser.token;
  const [patientEmail, setPatientEmail] = useState('');
  const [suggestedPatientEmails, setSuggestedPatientEmails] = useState([]);
  const [patientData, setPatientData] = useState(null);
  const [doctor, setDoctor] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [openAlert, setOpenAlert] = useState(false);;
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:9191/api/v1/receptionist/viewList/ofPatients', {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(response => {
        const patientEmails = response.data.map(patient => patient.email);
        setSuggestedPatientEmails(patientEmails);
      })
      .catch(error => {
        console.error('Error fetching suggested patient emails:', error);
      });

    axios.get('http://localhost:9191/api/v1/receptionist/list-doctors', {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(response => {
        const doctors = response.data.map(doctor => doctor.email);
        setDoctor(doctors);
      })
      .catch(error => {
        console.error('Error fetching list of doctors:', error);
      });
  }, [authToken]);

  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:9191/api/v1/receptionist/findUser/ByEmail', { email: patientEmail }, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      const patient = response.data.patients[0]; 
      setPatientData(patient);
      console.log(patientData);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  useEffect(() => {
    if (patientEmail) {
      fetchData();
    }
  }, [authToken, patientEmail]);

  const handleDoctorChange = (event) => {
    setSelectedDoctor(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!patientEmail || !selectedDoctor) {
      setFormError('Please select a patient and a doctor.');
      return;
    }
    setFormError(null);
    setSubmitting(true);
    const formData = {
      patientEmail: patientEmail,
      doctorEmail: selectedDoctor,
    };
    axios.post('http://localhost:9191/api/v1/receptionist/cases', formData, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(response => {
        setSubmitting(false);
        setOpenAlert(true);
      })
      .catch(error => {
        console.error('Error:', error);
        setSubmitting(false);
      })
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar userRole='receptionist' />
      <CssBaseline />
      <StyledContainer>
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ display: 'flex', alignItems: 'baseline', margin: '10px 0px' }}>Select the patient Id for new case:</Typography>
          <Autocomplete
            id="patient-email-autocomplete"
            options={suggestedPatientEmails}
            value={patientEmail}
            onChange={(event, newValue) => setPatientEmail(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Patient Email"
                variant="outlined"
                sx={{
                  margin: '10px 0px',
                  backgroundColor: '#fff',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  '& .MuiInputLabel-root': { color: '#000' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#000', borderRadius: '4px' },
                    '&:hover fieldset': { borderColor: '#000' },
                    '&.Mui-focused fieldset': { borderColor: '#000' },
                  },
                }}
              />
            )}
          />
          {patientData && (
            <StyledPaper sx={{ padding: 2, bgcolor: 'white', marginTop: '25px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#000', borderRadius: '8px', } } }}>
              <Grid container spacing={2} sx={{ alignItems: 'left' }}>
                <Grid item xs={12}>
                  <Typography variant="h5" sx={{ display: 'flex', alignItems: 'baseline' }}>Patient Details</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'baseline' }}>Name: {patientData.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'baseline' }}>Age: {patientData.age}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'baseline' }}>Gender: {patientData.gender}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'baseline' }}>Contact: {patientData.contact}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'baseline' }}>Email ID: {patientData.email}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'baseline' }}>Address: {patientData.address}</Typography>
                </Grid>
              </Grid>
            </StyledPaper>
          )}
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'baseline', marginTop: '20px' }}>Select the Doctor to this patient:</Typography>
            <FormControl fullWidth variant="outlined" sx={{ margin: '10px 0px', textAlign: 'left', backgroundColor: '#fff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', '& .MuiInputLabel-root': { color: '#000' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#000', borderRadius: '4px', }, '&:hover fieldset': { borderColor: '#000', }, '&.Mui-focused fieldset': { borderColor: '#000', }, }, }}>
              <InputLabel id="hospital">Doctor</InputLabel>
              <Select
                required
                labelId="doctor"
                id="doctor"
                value={selectedDoctor}
                onChange={handleDoctorChange}
                label="Hospital"
              >
                <MenuItem disabled>Select</MenuItem>
                {doctor.map((doctorEmail, index) => (
                  <MenuItem key={index} value={doctorEmail}>
                    {doctorEmail}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
        </Grid>
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
            Form submitted successfully!
          </Alert>
        </Snackbar>
      </StyledContainer>
    </ThemeProvider>
  );
}
