import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from 'react-bootstrap/Card';
import doctorImage from '../../Images/doctor.svg';
import LabImage from '../../Images/labs.svg';
import caseImage from '../../Images/cases.svg';
import patient from '../../Images/patient-robe-clothes-svgrepo-com.svg';
import Navbar from '../../Components/Navbar';
import { CssBaseline } from '@mui/material';

const CustomPaper = styled(Paper)(({ theme }) => ({
  margin: '40px',
  marginTop: '40px',
  height: '75px',
  padding: theme.spacing(5),
  textAlign: 'center',
  color: '#000',
  boxShadow: '0px 3px 2px rgba(0, 0, 0, 0.25)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '& img': {
    maxWidth: '40%', // Adjust the width of the image as needed
  },
  '& .card-body': {
    flexGrow: 1, // Allow the text to take the remaining space
    padding: '10px', // Add padding as needed
    textAlign: 'center',
    
  },
}));

export default function Home() {
  const cardData = [
    { title: 'Number Of Doctors', number: '45', image: doctorImage, color:'#F7DFFF' },
    { title: 'Number of Labs', number: '20' , image: LabImage, color: '#EEFF86'},
    { title: 'Number of Patients', number: '300', image: patient, color:'#CDD8FD'},
    { title: 'Number of Cases', number: '856', image:caseImage, color:'#BDFFB2' },
  ];

  return (
    <div className='this-div'>
      <Navbar userRole ="admin"/>
      <CssBaseline/>
      <h1> WELCOME ADMIN!</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {cardData.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <CustomPaper style={{ backgroundColor: 'white'}}>
                <img src={card.image} alt={card.title} />
                <Card.Body>
                  <Card.Title style={{fontSize: '40px', fontWeight:'bold'}}>{card.number}</Card.Title>
                  <Card.Subtitle>{card.title}</Card.Subtitle>
                </Card.Body>
              </CustomPaper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}