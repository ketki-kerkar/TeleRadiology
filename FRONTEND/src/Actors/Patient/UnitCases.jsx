import React, { useState, useEffect } from 'react';
import { Box, Button, styled } from '@mui/material'; // Import styled from @mui/material
import './UnitCases.css'; // Import your CSS file for styling
import Navbar from '../../Components/Navbar';
import axios from 'axios';

// Style the Button component using the styled function
const StyledButton = styled(Button)(({ theme }) => ({
  // Define default styles for the button
  backgroundColor: '#87CEEB',
  '&:hover': {
    backgroundColor: theme.palette.primary.main, // Change color to primary when hovered
  },
}));

function UnitCases() {
  const [userData, setUserData] = useState(null); // Initialize userData state with null
  const [error, setError] = useState(null); // Initialize error state with null
  const [isLoading, setIsLoading] = useState(true);

  const staticUnitCases = [
    { caseId: '123', date: '2024-04-12', doctorName: 'Dr. John Doe', hospitalName: 'City Hospital' },
    // Add more static unit cases as needed
  ];

  useEffect(() => {
    // Simulate loading delay
    const delay = setTimeout(() => {
      setIsLoading(false); // Set isLoading to false after delay
    }, 2000); // Simulate 2 seconds loading delay

    // Clear the timeout to prevent memory leaks
    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9191/api/v1/unitCases'); // Provide the API endpoint to fetch unit cases
        // Check if response data is not null or undefined before setting state
        if (response.data) {
          setUserData(response.data);
          setError(null);
        } else {
          // Handle case where response data is null or undefined
          setError('Unit cases data not found');
          setUserData(null);
        }
      } catch (error) {
        console.error('Error fetching unit cases:', error);
        // Handle error, set error state
        setError('An error occurred while fetching unit cases');
        setUserData(null);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar userRole="patient" />
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
            {isLoading ? (
              <h2>Loading...</h2>
            ) : (
              <>
                <ul className="individual-case-container">
                  {staticUnitCases.map((unitCase, index) => (
                    <li key={index}>
                      <h2> Case ID: {unitCase.caseId}</h2>
                      <p>Date: {unitCase.date}</p>
                      <p>Doctor Name: {unitCase.doctorName}</p>
                      <p>Hospital Name: {unitCase.hospitalName}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Vertical dividing line */}
          <div className="vertical-line"></div>

          {/* Right side content */}
          <div className="right-half">
            <div className="prescription-box">
              <h2>Prescription</h2>
              <div className="button-container">
                <StyledButton variant="contained">View</StyledButton>
                <StyledButton variant="contained">Download</StyledButton>
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

