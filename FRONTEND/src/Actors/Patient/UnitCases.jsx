import React, { useState, useEffect } from 'react';
import { Box, Button, styled } from '@mui/material'; // Import styled from @mui/material
import './UnitCases.css'; // Import your CSS file for styling
import Navbar from '../../Components/Navbar';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { useContext } from 'react';
import { LoggedInUserContext } from '../../Context/LoggedInUserContext';

// Style the Button component using the styled function
const StyledButton = styled(Button)(({ theme }) => ({
  // Define default styles for the button
  backgroundColor: '#87CEEB',
  '&:hover': {
    backgroundColor: theme.palette.primary.main, // Change color to primary when hovered
  },
}));

function UnitCases() {
  const { loggedinUser } = useContext(LoggedInUserContext);
  const authToken = loggedinUser.token;
  const [userData, setUserData] = useState(null); // Initialize userData state with null
  const [error, setError] = useState(null); // Initialize error state with null
  const [isLoading, setIsLoading] = useState(true);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const location = useLocation(); // Get location object from useLocation

  // Extract caseId from location state
  const caseId = location.state?.caseId || ''; // Use optional chaining to avoid null or undefined

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`http://localhost:9191/api/v1/patient/viewCase`, {
          caseId: caseId // sending caseId in the body of the request
        }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`
          }
        });
        if (response.data) {
          // Format the date here
          response.data.caseRegistrationDate = formatDate(response.data.caseRegistrationDate);
          setUserData(response.data);
          setError(null);
        } else {
          setError('Unit cases data not found');
          setUserData(null);
        }
      } catch (error) {
        console.error('Error fetching unit cases:', error);
        setError('An error occurred while fetching unit cases');
        setUserData(null);
      } finally {
        setIsLoading(false); // Set isLoading to false after fetching data
      }
    };

    fetchData();
  }, [caseId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-GB'); // Format as dd-mm-yyyy
    return formattedDate;
  };

  const handleViewPrescription = async () => {
    console.log("View button clicked"); // Add this line
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.get(`http://localhost:9191/api/v1/patient/get-prescription?caseId=${caseId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        }
      });
      if (response.data) {
        setAdditionalInfo(response.data);
        console.log("Additional info:", response.data); // Add this line
      } else {
        setError('Prescription data not found');
        setAdditionalInfo('');
      }
    } catch (error) {
      console.error('Error fetching prescription:', error);
      setError('An error occurred while fetching prescription');
      setAdditionalInfo('');
    }
  };

  return (
    <div>
      <Navbar userRole="patient" />
      <CssBaseline/>
      <div className="content">
        <Box
          display="flex"
          justifyContent="space-between"
          bgcolor="white"
          boxShadow={8} // Add a grey shadow to the box
          borderRadius={10}
          p={3}
          className="white-box"
        >
          {/* Left side content */}
          <div className="left-half">
            {/* Display static unit cases data */}
            {userData && (
              <ul className="individual-case-container">
                <li>
                  <h2> Case ID: {userData.caseId}</h2>
                  <p>Date: {userData.caseRegistrationDate}</p>
                  <p>Doctor Name: {userData.dname}</p>
                  <p>Hospital Name: {userData.hospitalName}</p>
                  <div
                    style={{
                    border: '1px solid #ccc',
                    padding: '1rem',
                    marginTop: '1rem',
                    minHeight: '100px',
                    overflowY: 'auto',
                    }}
                  >
                    {additionalInfo !== '' ? (
                      <pre>
                        {additionalInfo.split(',').map((item, index) => (
                          <div key={index}>
                            <span>{index + 1})</span> {item.trim()}
                          </div>
                        ))}
                      </pre>
                    ) : (
                      <p><h4>PRESCRIPTION</h4></p>
                    )}
                  </div>
                </li>
              </ul>
            )}
          </div>

          {/* Vertical dividing line */}
          <div className="vertical-line"></div>
          {/* Right side content */}
          <div className="right-half">
            <div className="prescription-box">
              <h2>Prescription</h2>
              <div className="button-container">
                <StyledButton variant="contained" onClick={handleViewPrescription}>View</StyledButton>
                
              </div>
            </div>
            <hr className="horizontal-line" /> {/* Horizontal grey line */}
            <div className="lab-box">
              <h2>Lab Reports</h2>
              <div className="button-container">
                <StyledButton variant="contained">View</StyledButton>
                <StyledButton variant="contained">Download</StyledButton>
              </div>
            </div>
            <hr className="horizontal-line" /> {/* Horizontal grey line */}
            <div className="report-box">
              <h2>Final Reports</h2>
              <div className="button-container">
                <StyledButton variant="contained">View</StyledButton>
                <StyledButton variant="contained">Download</StyledButton>
              </div>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default UnitCases;