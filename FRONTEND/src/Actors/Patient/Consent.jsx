import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Navbar from '../../Components/Navbar';
import Button from '@mui/material/Button';
import axios from 'axios'; // Import Axios for making HTTP requests

const containerStyle = {
  display: 'flex',
  flexDirection: 'row',
  height: '100vh', // Adjust the height as needed
};

const leftStyle = {
  flex: 1,
  padding: '20px',
  overflowY: 'auto'
};

const rightStyle = {
  flex: 1,
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
};

const dividerStyle = {
  width: '2px',
  background: '#ccc',
  margin: '0 20px', // Adjust margin as needed
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '20px',
};

const cardStyle = {
  marginTop: '20px',
  width: '70%',
  textAlign: 'left',
  fontFamily: '"Quicksand", sans-serif',
  background: '#F0F7F9',
  boxShadow: 'none',
};

const senderTextStyle = {
  fontSize: '1.2vw',
  fontFamily: '"Quicksand", sans-serif'
};

const contentStyle = {
  fontSize: '0.9vw',
  fontFamily: '"Quicksand", sans-serif'
};

const radioContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const buttonStyle = {
  marginLeft: '10px', // Adjust spacing between buttons as needed
};

const Consent = () => {
  const [invitations, setInvitations] = useState([
    { id: 1, senderName: "Dr. Hermione Granger", caseSummary: "A 55-year-old male, presents with persistent lower back pain...", caseId: 123 },
    { id: 2, senderName: "Dr. Lord Voldemort", caseSummary: "A 42-year-old female, presents with persistent abdominal pain...", caseId: 456 },
  ]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [consentCards, setConsentCards] = useState([
    { caseId: 1, hospitalName: "Hospital A", caseRegistration: "2024-05-05", caseStatus: "Pending", dname: "Dr. Lovegood" },
    { caseId: 2, hospitalName: "Hospital B", caseRegistration: "2024-05-06", caseStatus: "Pending", dname: "Dr. Good" },
    { caseId: 3, hospitalName: "Hospital C", caseRegistration: "2024-05-07", caseStatus: "Pending", dname: "Dr. Lov" },
  ]);

  const handleNotificationButtonClick = () => {
    // Placeholder function for fetching notifications
    console.log('Fetching notifications...');
  };

  const handleConsentButtonClick = () => {
    // Placeholder function for fetching consent cards
    console.log('Fetching consent cards...');
  };

  const handleSelectButtonClick = () => {
    // Placeholder function for handling card selection
    console.log('Selected card:', selectedCard);
  };

  const handleConsentCardSelect = (id) => {
    setSelectedCard(id);
  };

  return (
    <div>
      <Navbar userRole="patient" />
      <div style={containerStyle}>
        <div style={leftStyle}>
          <div style={buttonContainerStyle}>
            <Button variant="contained" onClick={handleNotificationButtonClick}>Notification</Button>
          </div>
          <Grid container spacing={3}>
            {invitations.map((invitation) => (
              <Grid item xs={12} key={invitation.id}>
                <Card
                  style={cardStyle}
                  onClick={() => setSelectedCard(invitation.id)}
                >
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
        <div style={dividerStyle}></div>
        <div style={rightStyle}>
          <div style={{ ...buttonContainerStyle, marginBottom: '10px' }}>
            <Button variant="contained" onClick={handleConsentButtonClick}>Consent</Button>
            <Button variant="contained" onClick={handleSelectButtonClick} style={buttonStyle}>Select</Button>
          </div>
          {consentCards.map((consentCard, index) => (
            <Card key={index} style={cardStyle}>
              <CardContent>
                <input
                  type="radio"
                  name="consentCard"
                  value={consentCard.id}
                  checked={selectedCard === consentCard.id}
                  onChange={() => handleConsentCardSelect(consentCard.id)}
                />
                <Typography variant="h6" component="div">
                  Case ID: {consentCard.caseId}
                </Typography>
                <Typography variant="body2" component="p">
                  Hospital Name: {consentCard.hospitalName}
                </Typography>
                <Typography variant="body2" component="p">
                  Registration Date: {consentCard.caseRegistration}
                </Typography>
                <Typography variant="body2" component="p">
                  Status: {consentCard.caseStatus}
                </Typography>
                <Typography variant="body2" component="p">
                  Doctor Name: {consentCard.dname}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Consent;


