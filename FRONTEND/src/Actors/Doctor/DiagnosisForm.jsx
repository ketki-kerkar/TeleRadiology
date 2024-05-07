import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Snackbar } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
const DiagnosisForm = () => {
  const [formData, setFormData] = useState({
    caseId: '',
    findings: '',
    impression: '',
    part: '',
    techniques: ''
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const authToken = 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJzaGF0YWtzaGkxMTRAZ21haWwuY29tIiwiaWF0IjoxNzE0ODE1MDE4LCJleHAiOjE3MTQ4NTEwMTh9.QeEjBRkL3ZxYLiuHYcr8uLSYI1LrHxdC6qsaELFUy7V-u9E8AGM6Fi16PGec4142'; // Replace 'your-auth-token' with your actual auth token
  const location = useLocation();
  const { caseId } = location.state || {};
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    axios.post('http://localhost:9191/api/v1/doctor/diagnosis', formData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(response => {
      console.log('Response:', response);
      if (response.status === 200) {
        console.log('Diagnosis added successfully');
        setSubmitSuccess(true);
        setFormData({
          caseId: '',
          findings: '',
          impression: '',
          part: '',
          techniques: ''
        });
      } else {
        console.error('Failed to add diagnosis');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle other errors
    });
  };

  const handleCloseSnackbar = () => {
    setSubmitSuccess(false);
  };

  return (
    <div>
      <Navbar userRole="doctor"/>
   
    <Grid container spacing={2} style={{ maxWidth: '500px', margin: 'auto' }}>
      <Grid item xs={12}>
        <Typography variant="h5" style={{ marginBottom: '20px' }}>Diagnosis Form</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="caseId"
          label="Case ID"
          variant="outlined"
          fullWidth
          value={formData.caseId}
          onChange={handleChange}
          style={{ marginBottom: '20px' }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="findings"
          label="Findings"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={formData.findings}
          onChange={handleChange}
          style={{ marginBottom: '20px' }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="impression"
          label="Impression"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={formData.impression}
          onChange={handleChange}
          style={{ marginBottom: '20px' }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="part"
          label="Part"
          variant="outlined"
          fullWidth
          value={formData.part}
          onChange={handleChange}
          style={{ marginBottom: '20px' }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="techniques"
          label="Techniques"
          variant="outlined"
          fullWidth
          value={formData.techniques}
          onChange={handleChange}
          style={{ marginBottom: '20px' }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
      <Snackbar
        open={submitSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Form submitted successfully!"
      />
    </Grid>
    </div>
  );
};

export default DiagnosisForm;
