import React, { useState, useRef, useContext } from 'react';
import Navbar from '../../Components/Navbar';
import axios from 'axios';
import { CssBaseline, Grid, TextField, Container, Typography } from '@mui/material';
import { LoggedInUserContext } from '../../Context/LoggedInUserContext';

function UploadReports() {
  const { loggedinUser } = useContext(LoggedInUserContext);
  const authToken = loggedinUser.token;
  const [dicomFile, setDicomFile] = useState(null);
  const [jsonFile, setJsonFile] = useState(null);
  const [prescriptionId, setPrescriptionId] = useState('');

  const dicomInputRef = useRef(null);
  const jsonInputRef = useRef(null);

  const handleDicomFileChange = (e) => {
    const newDicomFile = e.target.files[0];
    setDicomFile(newDicomFile);
  };

  const handleJsonFileChange = (e) => {
    const newJsonFile = e.target.files[0];
    setJsonFile(newJsonFile);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('dicomFile', dicomFile);
    formData.append('jsonFile', jsonFile);
    formData.append('prescriptionId', prescriptionId);

    if (!dicomFile || !jsonFile || !prescriptionId) {
      console.error('Please fill all required fields.');
      return;
    }

    axios.post('http://localhost:9191/api/v1/lab/uploadFile', formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then(response => {
        console.log('Upload successful:', response.data);
        // Handle success (e.g., show a success message)
      })
      .catch(error => {
        console.error('Upload failed:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
        }
        // Handle error (e.g., show an error message)
      });
  };

  return (
    <div>
      <Navbar userRole="lab" />
      <CssBaseline />
      <Container maxWidth="xl" style={{ width: '75vh' }}>
        <Grid container spacing={2} alignItems="flex-start" justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h4" style={{ marginTop: '60px', textAlign: 'left' }}>
              Upload Files
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Prescription ID"
              variant="outlined"
              fullWidth
              value={prescriptionId}
              onChange={(e) => setPrescriptionId(e.target.value)}
              style={{ marginBottom: '20px', backgroundColor: 'white' }}
            />
          </Grid>
          <Grid item xs={6}>
            <button
              onClick={() => dicomInputRef.current.click()}
              style={{
                display: 'block',
                width: '100%',
                backgroundColor: 'white',
                color: '#1976d2',
                borderRadius: '4px',
                padding: '12px',
                cursor: 'pointer',
                border: '1px solid #1976d2',
                boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.05)',
                height: '60px',
              }}
            >
              Choose DICOM
            </button>
            <input
              type="file"
              accept=".dcm"
              ref={dicomInputRef}
              style={{ display: 'none' }}
              onChange={handleDicomFileChange}
            />
          </Grid>
          <Grid item xs={6}>
            <button
              onClick={() => jsonInputRef.current.click()}
              style={{
                display: 'block',
                width: '100%',
                backgroundColor: 'white',
                color: '#1976d2',
                borderRadius: '4px',
                padding: '12px',
                cursor: 'pointer',
                border: '1px solid #1976d2',
                boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.05)',
                height: '60px',
              }}
            >
              Choose JSON
            </button>
            <input
              type="file"
              accept=".json"
              ref={jsonInputRef}
              style={{ display: 'none' }}
              onChange={handleJsonFileChange}
            />
          </Grid>
          <Grid item xs={12}>
            <button
              type="button"
              onClick={handleUpload}
              style={{
                display: 'block',
                width: '100%',
                backgroundColor: '#1976d2',
                color: '#fff',
                borderRadius: '4px',
                padding: '12px',
                cursor: 'pointer',
              }}
            >
              Upload Files
            </button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default UploadReports;
