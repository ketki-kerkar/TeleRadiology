import React, { useState, useEffect, useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';
import { CssBaseline, Typography, Avatar, Grid, Paper , Snackbar, Alert, TextField, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Navbar from '../../Components/Navbar';
import axios from 'axios';
import { useLocation , Link} from 'react-router-dom'; 
import { LoggedInUserContext } from '../../Context/LoggedInUserContext';



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
  height: '87vh'
}));
const StyledPaper2 = styled(Paper)(({ theme }) => ({
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
  height: '87vh'
}));

const StyledForm = styled('form')(({ theme }) => ({
  marginTop: theme.spacing(2)
}));

function PatientCard() {
  const { loggedinUser } = useContext(LoggedInUserContext);
  const authToken = loggedinUser.token;
  const [patientDetails, setPatientDetails] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submittingCase, setSubmittingCase] = useState(false);
  const [submittingSeverity, setSubmittingSeverity] = useState(false);
  const [prescription, setPrescription] = useState(localStorage.getItem('prescription') || ''); // Retrieve prescription from local storage
  const [caseSummary, setCaseSummary] = useState(localStorage.getItem('caseSummary') || '');
  const [severity, setSeverity] = useState(""); 
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [successAlertCaseOpen, setSuccessAlertCaseOpen] = useState(false);
  const [errorAlertCaseOpen, setErrorAlertCaseOpen] = useState(false);
  const [successAlertSeverityOpen, setSuccessAlertSeverityOpen] = useState(false);
  const [errorAlertSeverityOpen, setErrorAlertSeverityOpen] = useState(false);
  const [prescriptionExists, setPrescriptionExists] = useState(!!localStorage.getItem('prescription')); 
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const patientEmail = queryParams.get('email');
  const caseId = queryParams.get('caseId');
  const doctorEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.post('http://localhost:9191/api/v1/doctor/findUser/ByEmail', { email: patientEmail }, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        const patient = response.data.patients[0];
        setPatientDetails(patient);
        console.log(patientDetails);

        if (patient.patients && patient.patients.length > 0) {
          if (patient.prescriptionTests) {
            
            setPrescription(patient.prescriptionTests);
            setPrescriptionExists(true);
          }
        }
      } catch (error) {
        console.log('Error fetching patient data:', error);
      }
    };

    if (authToken && patientEmail) {
      fetchPatientData();
    }
  }, [authToken, patientEmail]);

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const response = await axios.get(`http://localhost:9191/api/v1/doctor/get-prescription?caseId=${caseId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        const prescriptionTests  = response.data;
        console.log(prescriptionTests);
    
        if (prescriptionTests) {
          setPrescription(prescriptionTests);
          setPrescriptionExists(true); // Enable/disable button based on existence of prescription
        } else {
          setPrescriptionExists(false);
        }
      } catch (error) {
        console.error('Error fetching prescription:', error);
      }
    };
    if (caseId) {
      fetchPrescription();
    }
  }, [authToken, caseId]);

  useEffect(() => {
  const fetchCaseSummary = async () => {
    try {
      const response = await axios.get(`http://localhost:9191/api/v1/doctor/get-case-summary?caseId=${caseId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      const caseSummary  = response.data;
  
      if (caseSummary) {
        setCaseSummary(caseSummary);
      } 
    } catch (error) {
      console.error('Error fetching pCase Summary:', error);
    }
  };
  if (caseId) {
    fetchCaseSummary();
  }
}, [authToken, caseId]);

  const handlePrescriptionChange = (event) => {
    setPrescription(event.target.value);
  };

  const handlePrescriptionSubmit = async () => {
    try {
      const formData = {
        caseId: caseId,
        prescriptionTests: prescription,
      };
      await axios.post('http://localhost:9191/api/v1/doctor/add-prescription', formData, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      console.log('Prescription added successfully!');
    } catch (error) {
      console.error('Error adding prescription:', error);
    }
  }
    

  const handleCaseSummaryChange = (event) => {
    setCaseSummary(event.target.value);
  };

  const handleCaseSummarySubmit = () => {
    setSubmittingCase(true);
    const formData = {
      caseId: caseId,
      caseSummary: caseSummary
    };
    axios.put('http://localhost:9191/api/v1/doctor/add-case-summary', formData, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
    .then(response => {
      setSubmittingCase(false);
      setSuccessAlertCaseOpen(true);
    })
    .catch(error => {
      console.error('Error:', error);
      setSubmittingCase(false);
      setErrorAlertCaseOpen(true);
    });
  }
  
  const handleSeveritySubmit = () => {
    setSubmittingSeverity(true);
   
    axios.post('http://localhost:9191/api/v1/doctor/add-severity', {caseId : severity} , {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
    .then(response => {
      setSubmittingSeverity(false);
      setSuccessAlertSeverityOpen(true);
    })
    .catch(error => {
      console.error('Error:', error);
      setSubmittingSeverity(false);
      setErrorAlertSeverityOpen(true);
    });
  }

  const handleCloseSuccessAlert = () => {
    setSuccessAlertOpen(false);
  };
  
  const handleCloseErrorAlert = () => {
    setErrorAlertOpen(false);
  };

  const handleCloseCaseSuccessAlert = () => {
    setSuccessAlertCaseOpen(false);
  };
  
  const handleCloseCaseErrorAlert = () => {
    setErrorAlertCaseOpen(false);
  };

  const handleCloseSuccessSeverityAlert = () => {
    setSuccessAlertSeverityOpen(false);
  };
  
  const handleCloseErrorSeverityAlert = () => {
    setErrorAlertSeverityOpen(false);
  };

  const handleSeverityChange=(event)=>{
    setSeverity(event.target.value);
  }


  return (
    <ThemeProvider theme={theme}>
    <Navbar userRole='doctor' />
    <CssBaseline/>
    <Grid container spacing={2}>
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
            {patientDetails.name || 'EM'}
          </Typography>
          <Typography variant="h6" gutterBottom>Age: 
              {patientDetails.age || '22'}
            </Typography>
            <Typography variant="h6"  gutterBottom>
              Gender: {patientDetails.gender || 'Female'}
            </Typography>
            <Typography variant="h6"  gutterBottom>
              Blood Group: {patientDetails.bloodGroup || 'O+ve'}
            </Typography>
            <Typography variant="h6"  gutterBottom>
              History: {patientDetails.History || 'No history to display'}
            </Typography>
            <Typography variant="h6"  gutterBottom>
              Date Of Registration: {patientDetails.dateOfRegistration || '22/02/24' }
            </Typography>
            <Typography variant="h6"  gutterBottom>
              Contact: {patientDetails.contact || '9878987777'}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Email: {patientDetails.email ||'eleanor.medina@gmail.com'}
            </Typography>
            <Typography variant="h6"  gutterBottom>
              Address: {patientDetails.address || '42053 Agripina Extension, Lake Charleneview, CA 29920-3189'}
            </Typography>
        </StyledPaper>
      </Grid>
      <Grid item xs={9}>
          <StyledForm>
            <StyledPaper2>
              <Typography variant='h5'>
                Update Case
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="prescription"
                        label="Prescription Of Imaging Tests"
                        name="prescription"
                        multiline
                        rows={5}
                        value={prescription}
                        onChange={handlePrescriptionChange}
                        disabled={prescriptionExists}
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
                    <Grid>
                    <Button
                        variant="contained"
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                          marginTop: '20px',
                          backgroundColor: prescriptionExists ? '#ccc' : '#1976d2',
                          color: '#fff',
                          borderRadius: '5px'
                        }}
                        onClick={handlePrescriptionSubmit}
                        disabled={submitting || prescriptionExists}
                      >

                      {submitting ? 'Saving...' : 'Save Prescription'}
                    </Button>
                  <Snackbar open={successAlertOpen} autoHideDuration={6000} onClose={handleCloseSuccessAlert}>
                    <Alert onClose={handleCloseSuccessAlert} severity="success" sx={{ width: '100%' }}>
                      Prescription added successfully!
                    </Alert>
                  </Snackbar>
                  <Snackbar open={errorAlertOpen} autoHideDuration={6000} onClose={handleCloseErrorAlert}>
                    <Alert onClose={handleCloseErrorAlert} severity="error" sx={{ width: '100%' }}>
                      Prescription could not be added. Please try again later.
                    </Alert>
                  </Snackbar>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="caseSummary"
                    label="Add Case Summary"
                    name="caseSummary"
                    multiline
                    rows={5} 
                    value={caseSummary}
                    onChange={handleCaseSummaryChange}
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
                  <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
                    <Button 
                        type="button" 
                        variant="contained" 
                        style={{ display: 'flex', justifyContent:'flex-start', marginTop: '20px', backgroundColor: '#1976d2', color: '#fff', borderRadius: '5px' }}  
                        onClick={handleCaseSummarySubmit} 
                        disabled={submittingCase}
                      >
                        {submittingCase? 'Saving Case Summary...' : 'Save Case Summary'}
                      </Button>
                      <Link 
                        to={{ 
                          pathname: '/doctor/listPatients/patientdetails/invite', 
                          search: `?caseId=${caseId}&doctorEmail=${doctorEmail}&patientEmail=${patientEmail}`
                        }} 
                        style={{textDecoration:'none'}}
                        
                      >
                        <Button 
                          variant="contained" 
                          style={{ display: 'flex', justifyContent:'flex-start', marginTop: '20px', backgroundColor: '#1976d2', color: '#fff', borderRadius: '5px' ,}}
                        >
                          Invite Doctors
                        </Button>
                      </Link>
                    </Box>
                  <Snackbar open={successAlertCaseOpen} autoHideDuration={6000} onClose={handleCloseCaseSuccessAlert}>
                    <Alert onClose={handleCloseCaseSuccessAlert} severity="success" sx={{ width: '100%' }}>
                      Case Summary added successfully!
                    </Alert>
                  </Snackbar>
                  <Snackbar open={errorAlertCaseOpen} autoHideDuration={6000} onClose={handleCloseCaseErrorAlert}>
                    <Alert onClose={handleCloseCaseErrorAlert} severity="error" sx={{ width: '100%' }}>
                      Case Summary could not be added. Please try again later.
                    </Alert>
                  </Snackbar>
                </Grid>
                <Grid item xs ={12}>
                  <FormControl fullWidth variant="outlined" sx={{
                        textAlign:'left',
                        backgroundColor: '#fff',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                        '& .MuiInputLabel-root': { color: '#000' },
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#000', borderRadius: '4px' },
                          '&:hover fieldset': { borderColor: '#000' },
                          '&.Mui-focused fieldset': { borderColor: '#000' },
                        },
                      }}>
                  <InputLabel id="severity">Mark Case Severity</InputLabel>
                  <Select
                      labelId="severity"
                      id="severity"
                      value={severity}
                      onChange={handleSeverityChange}
                      label="Severity"
                  >
                      <MenuItem disabled>Select</MenuItem>
                      <MenuItem value="1">High(1)</MenuItem>
                      <MenuItem value="2">Medium(2)</MenuItem>
                      <MenuItem value="3">Low(3)</MenuItem>
                  </Select>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}> 
                  <Button 
                      variant="contained" 
                      style={{ marginBottom: '20px', backgroundColor: '#1976d2', color: '#fff', borderRadius: '5px' }}  
                      onClick={handleSeveritySubmit} 
                      disabled={submittingSeverity}
                      
                    >
                      {submittingSeverity ? 'Saving...' : 'Save Severity'}
                    </Button>
                  <Snackbar open={successAlertSeverityOpen} autoHideDuration={6000} onClose={handleCloseSuccessSeverityAlert}>
                    <Alert onClose={handleCloseSuccessSeverityAlert} severity="success" sx={{ width: '100%' }}>
                      Severity Marked successfully!
                    </Alert>
                  </Snackbar>
                  <Snackbar open={errorAlertSeverityOpen} autoHideDuration={6000} onClose={handleCloseErrorSeverityAlert}>
                    <Alert onClose={handleCloseErrorSeverityAlert} severity="error" sx={{ width: '100%' }}>
                      Severity could not be added. Please try again later.
                    </Alert>,marginTop: '20px'
                  </Snackbar>
                </Box>
                  </FormControl>
                  <Typography variant='h6' sx={{textAlign: 'left'}}>Navigate To View Reports and Chats</Typography>
                <Link to={{ 
                          pathname: '/doctor/listPatients/patientdetails/reports', 
                          search: `?caseId=${caseId}&doctorEmail=${doctorEmail}&patientEmail=${patientEmail}`
                        }} 
                        style={{textDecoration:'none'}}

                      >
                        <Button 
                          variant="contained" 
                          style={{ display: 'flex', justifyContent:'flex-start', marginTop: '20px', backgroundColor: '#1976d2', color: '#fff', borderRadius: '5px' ,}}
                        >
                          VIEW REPORT AND CHAT
                        </Button>
                        </Link>
                  
              </Grid>
                
              </Grid>
              </StyledPaper2>
          </StyledForm>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default PatientCard;
