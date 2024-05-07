import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import { Grid, Typography, Avatar, Paper, Divider, Button ,CssBaseline} from '@mui/material'; // Import necessary components from Material-UI
import { EmailOutlined, SchoolOutlined, LocationOnOutlined, WorkOutline, MedicalServicesOutlined } from '@mui/icons-material'; // Import icons for decoration
import axios from 'axios'; 
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { LoggedInUserContext } from '../../Context/LoggedInUserContext';

export default function ViewDoctor() {
  const { loggedinUser } = useContext(LoggedInUserContext);
  const authToken = loggedinUser.token;
  const [userData, setUserData] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:9191/api/v1/admin/findUser/ByEmail',{email:email}, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };

    fetchData();
  }, [authToken, email]);

  const handleDeleteUser = async () => {
    try {
      const response = await axios.put('http://localhost:9191/api/v1/admin/delete-user', {
      });
      console.log(response.data);
      // Handle successful response, maybe update UI or show a success message
    } catch (error) {
      console.error('Error disabling doctor:', error);
      // Handle error, show a message to the user maybe
    }
  };

  return (
    <div className='container'>
      <Navbar userRole="admin"/>
      <CssBaseline />
      <Grid container justifyContent="center" spacing={2} sx={{ marginTop: '90px' }}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: '20px', backgroundColor: '#fafafa', borderRadius: '12px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3} margin='auto'>
                <Avatar
                  alt={userData && userData.doctors && userData.doctors.length > 0 ? userData.doctors[0].dname: 'N/A'}
                  src={userData && userData.doctors && userData.doctors.length > 0 ? userData.doctors[0].photo: 'N/A' || "/default-photo.jpg"}
                  sx={{ width: 200, height: 200 }}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="h4">Dr. {userData && userData.doctors && userData.doctors.length > 0 ? userData.doctors[0].dname: 'N/A'}</Typography>
                <Divider sx={{ my: 2 }} />
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item><EmailOutlined /></Grid>
                      <Grid item><Typography variant="body1">Email:</Typography></Grid>
                      <Grid item><Typography variant="body1">{userData && userData.email}</Typography></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item><SchoolOutlined /></Grid>
                      <Grid item><Typography variant="body1">Qualification:</Typography></Grid>
                      <Grid item><Typography variant="body1">{userData && userData.doctors && userData.doctors.length > 0 ? userData.doctors[0].qualification : 'N/A'}</Typography></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item><LocationOnOutlined /></Grid>
                      <Grid item><Typography variant="body1">Department:</Typography></Grid>
                      <Grid item><Typography variant="body1">{userData && userData.doctors && userData.doctors.length > 0 ? userData.doctors[0].department : 'N/A'}</Typography></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item><WorkOutline /></Grid>
                      <Grid item><Typography variant="body1">Doctor Type:</Typography></Grid>
                      <Grid item><Typography variant="body1">{userData && userData.doctors && userData.doctors.length > 0 ? userData.doctors[0].dtype : 'N/A'}</Typography></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>< MedicalServicesOutlined /></Grid>
                      <Grid item><Typography variant="body1">Hospital Name:</Typography></Grid>
                      <Grid item><Typography variant="body1">{userData && userData.doctors && userData.doctors.length > 0 ? userData.doctors[0].hospitalName : 'N/A'}</Typography></Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <div className='flex'>
                <Button variant="contained" color="primary" onClick={handleDeleteUser} sx={{ marginTop: '20px', justifyContent:'flex-end'}}>Delete Doctor</Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}