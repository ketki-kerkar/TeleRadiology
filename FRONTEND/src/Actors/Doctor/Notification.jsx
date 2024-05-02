import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Navbar from '../../Components/Navbar';
import axios from 'axios'; // Import Axios for making HTTP requests

const cardStyle = {
  marginTop: '20px',
  width: '56vw', // Set card width
  height: '20vh', // Set card height
  textAlign: 'left',
  fontFamily: '"Quicksand", sans-serif', // Add the font family here
  background: '#F0F7F9',
  boxShadow: 'none', // remove shadows
  justifyContent: 'center',
};

const senderTextStyle = {
  fontSize: '1.2vw',
  fontFamily: '"Quicksand", sans-serif'
};

const contentStyle = {
  fontSize: '0.9vw',
  fontFamily: '"Quicksand", sans-serif'
};

const Notification = () => {
  const [invitations, setInvitations] = useState([
    { id: 1, senderName: "Dr. Hermione Granger", caseSummary: "A 55-year-old male, presents with persistent lower back pain...", caseId: 123 },
    { id: 2, senderName: "Dr. Lord Voldemort", caseSummary: "A 42-year-old female, presents with persistent abdominal pain...", caseId: 456 },
  ]);

  useEffect(() => {
    // Define a function to fetch notifications from the backend
    const fetchNotifications = async () => {
      try {
        const response = await axios.post('/list-notifications', { email: 'example@example.com' }); // Replace 'example@example.com' with the actual email
        setInvitations(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications(); // Call the function to fetch notifications when the component mounts
  }, []); // Empty dependency array to ensure this effect runs only once on component mount

  return (
    <div>
      <Navbar userRole="radiologist" />
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', background: 'white' }}>
        <Grid container spacing={3}>
          {invitations.map((invitation) => (
            <Grid item xs={12} key={invitation.id} style={{ display: 'flex', justifyContent: 'center' }}>
              <Card style={cardStyle}>
                <CardContent>
                  <Typography variant="h6" component="div" style={senderTextStyle}>
                    {invitation.senderName} has invited you
                  </Typography>
                  <Typography variant="body2" component="p" style={contentStyle}>
                    Case Summary: {invitation.caseSummary}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Notification;
