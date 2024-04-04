import React from 'react';
import Navbar from '../../Components/Navbar';
import logo from '../../Images/doc1.jpg';
import logo2 from '../../Images/doctor1.jpg';
import { Container, Grid, Typography } from '@mui/material';

export default function DoctorHome() {
  return (
    <div style={{ backgroundColor: '#fff' }}>
      <Navbar userRole="doctor"/>
      <Container maxWidth="xl">
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={12}>
            <div style={{ marginTop: '20px', padding: '20px', paddingRight: '10px' }}>
              <Typography variant="h3">WELCOME DOCTOR!</Typography>
              <Typography variant="body1">“Radiology: A window into the invisible world."</Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div style={{ width: '100%', height: 'auto' }}>
              <img src={logo} alt='Doctor Home' style={{ width: '100%', height: '100%', borderRadius: '2px' }} />
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div style={{ width: '100%', height: 'auto' }}>
              <img src={logo2} alt='Doctor Home' style={{ width: '100%', height: '100%', borderRadius: '2px' }} />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
