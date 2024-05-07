import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Navbar from '../../Components/Navbar';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import { useLocation , Link} from 'react-router-dom';
import { useContext } from 'react';
import { LoggedInUserContext } from '../../Context/LoggedInUserContext';

const cardStyle = {
  marginTop: '20px',
  width: '56vw',
  height: '30vh',
  textAlign: 'left',
  fontFamily: '"Quicksand", sans-serif',
  background: '#F0F7F9',
  boxShadow: 'none',
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
  backgroundColor: '#3f51b5',
  fontFamily: '"Quicksand", sans-serif',
  width: '8vw',
  fontSize: '0.9vw',
  color: '#fff',
  borderColor: '#3f51b5',
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
  const location = useLocation();
  const { loggedinUser } = useContext(LoggedInUserContext);
  const authToken = loggedinUser.token;
  const queryParams = new URLSearchParams(location.search);
  const LoggedInEmail = loggedinUser.email;
  const [invitations, setInvitations] = useState([]);
  const caseId = queryParams.get('caseId');

  useEffect(() => {
    const fetchInvitations = async () => {
      console.log(LoggedInEmail)
      try {
        const response = await axios.post(
          'http://localhost:9191/api/v1/radiologist/list',
          { email: LoggedInEmail },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setInvitations(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching invitations:', error);
      }
    };

    fetchInvitations();
  }, [authToken, LoggedInEmail]);

  const handleAcceptClick = async (invitationId, caseId) => {
    try {
      await axios.post(
        'http://localhost:9191/api/v1/radiologist/accept-invitation',
        { email: LoggedInEmail, choice: 'Accepted', caseId: caseId },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const updatedInvitations = [...invitations];
      const invitationIndex = updatedInvitations.findIndex(invitation => invitation.invitationId === invitationId);
      updatedInvitations[invitationIndex].invitation_status = 'Accepted';
      setInvitations(updatedInvitations);
    } catch (error) {
      console.error('Error accepting invitation:', error);
    }
  };
  
  const handleRejectClick = async (invitationId, caseId) => {
    try {
      await axios.post(
        'http://localhost:9191/api/v1/radiologist/accept-invitation',
        { email: LoggedInEmail, choice: 'Rejected', caseId: caseId },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error('Error rejecting invitation:', error);
    }
  };  

  // const handleViewClick = async (caseId) => {
  //   try {
  //     navigate(`/radiologist/ohif/${caseId}`); // Redirect to /radiologist/ohif/:caseId
  //   } catch (error) {
  //     console.error('Error viewing case details:', error);
  //   }
  // };

  return (
    <div>
      <Navbar userRole="radiologist" />
      <CssBaseline/>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', background: 'white' }}>
        <Grid container spacing={3}>
          {invitations.map((invitation) => (
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
                  {invitation.invitation_status !== 'Accepted' ? (
                    <>
                      <Button 
                        variant="outlined" 
                        style={buttonStyle} 
                        onClick={() => handleAcceptClick(invitation.invitationId, invitation.caseId)}
                      >
                        Accept
                      </Button>
                      <Button 
                        variant="outlined" 
                        style={rejectButtonStyle} 
                        onClick={() => handleRejectClick(invitation.invitationId, invitation.caseId)}
                      >
                        Reject
                      </Button>
                    </>
                  ) : (
                    <Link to={{ 
                      pathname: '/radiologist/ohifRadilogist', 
                      search: `?caseId=${invitation.caseId}&doctorEmail=${LoggedInEmail}`
                    }} 
                    style={{textDecoration:'none'}}

                  >
                    <Button 
                      variant="outlined" 
                      style={viewButtonStyle}
                    >
                      View
                    </Button>
                    </Link>
                  )}
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