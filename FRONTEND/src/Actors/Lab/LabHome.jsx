import React from 'react';
import Navbar from '../../Components/Navbar';
import logo from '../../Images/labs.jpg';
import logo2 from '../../Images/lab2.jpg';
import { Container, Grid, Typography } from '@mui/material';
import './LabHome.css';

export default function LabHome() {
  return (
    <div className='lab-home-container'>
      <Navbar userRole="lab"/>
      <Container maxWidth="xl">
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={12}>
            <div className='text-section' style={{marginTop:'20px'}}>
              <Typography variant="h1">WELCOME LAB!</Typography>
              <Typography variant="body1">“Radiology: A window into the invisible world."</Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className='image-section'>
              <img src={logo} alt='Lab Home' className='lab-image' />
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className='image-section'>
              <img src={logo2} alt='Lab Home' className='lab-image' />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
