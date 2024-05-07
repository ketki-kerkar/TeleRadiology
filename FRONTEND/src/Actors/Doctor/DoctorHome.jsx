import React from 'react';
import Navbar from '../../Components/Navbar';
import logo from '../../Images/doc1.jpg';
import logo2 from '../../Images/doctor1.jpg';
import { Container, Grid, Typography, CssBaseline } from '@mui/material';

export default function RadiologistHome() {

  return (
    <div>
      <Navbar userRole="doctor"/>
      <CssBaseline />
      <Container maxWidth="xl">
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={12}>
            <div style={{ marginTop: '20px', padding: '20px', paddingRight: '10px' }}>
              <Typography variant="h3">WELCOME DOCTOR!</Typography>
              <Typography variant="body1">“Radiology: A window into the invisible world."</Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div style={{ width: '100%' }}>
              <img src={logo} alt='Doctor Home Home' style={{ width: '100%', borderRadius: '2px' }} />
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div style={{ width: '100%' }}>
              <img src={logo2} alt='Lab Home' style={{ width: '100%', borderRadius: '2px' }} />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
