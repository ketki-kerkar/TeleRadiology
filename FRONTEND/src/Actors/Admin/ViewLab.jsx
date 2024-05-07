import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import { Grid, Typography, Paper, Divider, Button, CssBaseline, Avatar } from '@mui/material';
import { EmailOutlined, MedicalServicesOutlined} from '@mui/icons-material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { LoggedInUserContext } from '../../Context/LoggedInUserContext';

export default function ViewLab() {
  const { loggedinUser } = useContext(LoggedInUserContext);
  const authToken = loggedinUser.token;
  const [labData, setLabData] = useState({});
  const [labEmail, setLabEmail] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:9191/api/v1/admin/findUser/ByEmail', { email }, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });

        setLabData(response.data);
        setLabEmail(response.data.email);
      } catch (error) {
        console.error('Error fetching lab data:', error);
      }
    };

    fetchData();
  }, [authToken, email]);

  const handleDeleteLab = async () => {
    try {
      const response = await axios.put('http://localhost:9191/api/v1/admin/delete-lab', {
        // Pass any necessary data for deleting the lab
      });
      console.log(response.data);
      // Handle successful response, maybe update UI or show a success message
    } catch (error) {
      console.error('Error deleting lab:', error);
      // Handle error, show a message to the user maybe
    }
  };

  return (
    <div className='container'>
      <Navbar userRole="admin" />
      <CssBaseline />
      <Grid container justifyContent="center" spacing={2} sx={{ marginTop: '90px' }}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: '20px', backgroundColor: '#fafafa', borderRadius: '12px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={3} margin='auto'>
                <Avatar
                  src={labData && labData.doctors && labData.doctors.length > 0 ? labData.doctors[0].photo : 'N/A' || "/default-photo.jpg"}
                  sx={{ width: 200, height: 200 }}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="h4">{labData && labData.labs && labData.labs.length > 0 ? labData.labs[0].labName : 'N/A'}</Typography>
                <Divider sx={{ my: 2 }} />
                <Grid container spacing={1} alignItems="center">
                  <Grid item><EmailOutlined /></Grid>
                  <Grid item><Typography variant="body1">Email:</Typography></Grid>
                  <Grid item><Typography variant="body1">{labEmail}</Typography></Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item><MedicalServicesOutlined /></Grid>
                  <Grid item><Typography variant="body1">Lab Name:</Typography></Grid>
                  <Grid item><Typography variant="body1">{labData && labData.labs && labData.labs.length > 0 ? labData.labs[0].labName : 'N/A'}</Typography></Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <div className='flex'>
            <Button variant="contained" color="primary" onClick={handleDeleteLab} sx={{ marginTop: '20px', justifyContent: 'flex-end' }}>Delete Lab</Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
