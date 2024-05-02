import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Navbar from '../../Components/Navbar';
import axios from 'axios';

const cardStyle = {
  marginTop: '20px',
  width: '56vw', // Set card width
  height: '30vh', // Set card height
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

const buttonStyle = {
  textAlign: 'center',
  margin: '1vw',
  backgroundColor: '#E1FCEF',
  fontFamily: '"Quicksand", sans-serif',
  width: '8vw',
  fontSize: '0.9vw',
  color: '#037847',
  borderColor: '#037847',
  padding: '1vh'
};

const viewButtonStyle = {
  textAlign: 'center',
  margin: '1vw',
  backgroundColor: '#3f51b5', // Changed to blue color
  fontFamily: '"Quicksand", sans-serif',
  width: '8vw',
  fontSize: '0.9vw',
  color: '#fff', // Changed text color to white
  borderColor: '#3f51b5', // Matching border color with background color
  padding: '1vh'
};

const rejectButtonStyle = {
  textAlign: 'center',
  margin: '1vw',
  backgroundColor: '#FFD9E1',
  fontFamily: '"Quicksand", sans-serif',
  width: '8vw',
  fontSize: '0.9vw',
  color: '#D1204D',
  borderColor: '#D1204D',
  padding: '1vh'
};

const Invitations = () => {
  const [invitations, setInvitations] = useState([
    { id: 1, senderName: "Dr. Hermione Granger", caseSummary: "A 55-year-old male, presents with persistent lower back pain...", caseId: 123 },
    { id: 2, senderName: "Dr. Lord Voldemort", caseSummary: "A 42-year-old female, presents with persistent abdominal pain...", caseId: 456 },
  ]);

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const response = await axios.post('/list', { email: 'example@example.com' });
        setInvitations(response.data);
      } catch (error) {
        console.error('Error fetching invitations:', error);
      }
    };

    fetchInvitations();
  }, []);

  const handleAcceptClick = async (invitationId, index) => {
    try {
      // Make an API call to accept the invitation
      await axios.post('/accept', { email: 'example@example.com', choice: 'Accepted', caseId: invitationId });
      
      // Update the invitation status locally (assuming you have an invitation status field)
      const updatedInvitations = [...invitations];
      updatedInvitations[index].status = 'Accepted';
      setInvitations(updatedInvitations);
      
      console.log('Invitation accepted successfully!');
    } catch (error) {
      console.error('Error accepting invitation:', error);
    }
  };

  const handleRejectClick = async (invitationId) => {
    try {
      // Make an API call to reject the invitation
      await axios.post('/reject', { email: 'example@example.com', choice: 'Rejected', caseId: invitationId });
      
      // If the backend responds with success, remove the rejected invitation from the local state
      const updatedInvitations = invitations.filter(invitation => invitation.id !== invitationId);
      setInvitations(updatedInvitations);
      
      console.log('Invitation rejected successfully!');
    } catch (error) {
      console.error('Error rejecting invitation:', error);
    }
  };

  const handleViewClick = async (invitationId) => {
    try {
      // Make an API call to view the case details
      await axios.post('/view-case', { caseId: invitationId });
      
      console.log('Viewing case details...');
    } catch (error) {
      console.error('Error viewing case details:', error);
    }
  };

  return (
    <div>
      <Navbar userRole="radiologist" />
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', background: 'white' }}>
        <Grid container spacing={3}>
          {invitations.map((invitation, index) => (
            <Grid item xs={12} key={invitation.id} style={{ display: 'flex', justifyContent: 'center' }}>
              <Card style={cardStyle}>
                <CardContent>
                  <Typography variant="h6" component="div" style={senderTextStyle}>
                    {invitation.doctorName} has invited you
                  </Typography>
                  <Typography variant="body2" component="p" style={contentStyle}>
                    Case Summary: {invitation.caseSummary}
                  </Typography>
                </CardContent>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                  {invitation.status !== 'Accepted' ? (
                    <Button 
                      variant="outlined" 
                      style={buttonStyle} 
                      onClick={() => handleAcceptClick(invitation.id, index)}
                    >
                      Accept
                    </Button>
                  ) : (
                    <Button 
                      variant="outlined" 
                      style={viewButtonStyle} 
                      onClick={() => handleViewClick(invitation.id)}
                    >
                      View
                    </Button>
                  )}
                  <Button 
                    variant="outlined" 
                    style={rejectButtonStyle} 
                    onClick={() => handleRejectClick(invitation.id)}
                  >
                    Reject
                  </Button>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Invitations;
