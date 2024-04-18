import React, { useState, useEffect } from 'react';
import { CssBaseline, Card, CardContent, Typography, Divider, Avatar, Grid } from '@mui/material';
import Navbar from '../../Components/Navbar';
import axios from 'axios';

function PatientCard() {
  const [patientDetails, setPatientDetails] = useState({});
  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/patients/90ELEA90'); // Replace with your API endpoint
        setPatientDetails(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setFetchingData(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div><Navbar userRole='doctor'/>
    <CssBaseline/>
    <Card sx={{ maxWidth: '24vw', margin: 'auto', marginTop: '10px', backgroundColor: 'white', padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <div sx={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
              <Avatar sx={{ width: 100, height: 100 }}>
                {patientDetails.initials || 'EM'}
              </Avatar>
            </div>
            <div sx={{ width: '100%' }}>
              <Typography variant="h5" component="h2">
                {patientDetails.name || 'Eleanor Medina'}
              </Typography>
              <Typography variant="body1">
                Patient ID: 90ELEA90
              </Typography>
              <Typography variant="body1">
                Age: {patientDetails.age || '22'}
              </Typography>
              <Typography variant="body1">
                Gender: {patientDetails.gender || 'Female'}
              </Typography>
              <Divider />
              <Typography variant="body1">
                Date Of Birth: 2/2/2002
              </Typography>
              <Typography variant="body1">
                Blood Group: O+ve
              </Typography>
              <Typography variant="body1">
                Last Visit: 14/12/2023
              </Typography>
              <Typography variant="body1">
                Contact: 9878987777
              </Typography>
              <Typography variant="body1">
                Email:<br/> eleanor.medina@gmail.com
              </Typography>
              <Typography variant="body1">
                Address:<br/> 42053 Agripina Extension, Lake Charleneview, CA 29920-3189
              </Typography>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    </div>
  );
}

export default PatientCard;
