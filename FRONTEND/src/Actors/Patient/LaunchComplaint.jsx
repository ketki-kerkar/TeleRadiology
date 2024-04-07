import React, { useRef, useState } from 'react';
import { Box, Typography , Checkbox, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Navbar from '../../Components/Navbar';
import { Link } from 'react-router-dom';

export default function LaunchComplaint() {
    const boxRef = useRef(null);
    const [complaintType, setComplaintType] = useState('');
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  
    const handleCheckboxChange = (event) => {
        setIsCheckboxChecked(event.target.checked);
      };
      const handleComplaintTypeChange = (event) => {
        setComplaintType(event.target.value);
      };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar userRole="patient" />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '20vh', marginLeft: '20vw', width: '80vw' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '100%', position: 'relative', marginLeft: '5vw' }}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              bgcolor="#F0F7F9"
              p={2}
              borderRadius="16px"
              border="0.2vw solid #9ACEFF"
              sx={{ 
                overflowY: 'auto', 
                position: 'relative', 
                scrollbarWidth: 'thin', 
                scrollbarColor: '#9ACEFF #F0F7F9', 
                maxWidth: '100%',
                width: '80%', // Adjusted width
                marginLeft: 'auto', // Centering adjustment
                marginRight: 'auto', // Centering adjustment
            }}
            >
              <Typography variant="h4" style={{ fontFamily: 'Quicksand', color: '#333', marginBottom: '2vh' }}>
               Select Complaint Type ! 
              </Typography> 
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                bgcolor="white" // Inner box color white
                p={2}
                borderRadius="16px"
                border="0.1vw solid #ccc" // Border color grey
                sx={{ overflowY: 'auto', maxHeight: '60vh', maxWidth: '100%', width: '94%' }}
                ref={boxRef} // Reference for scrolling
              >
                <Typography variant="body1" style={{ textAlign: 'left' }}>
                  <RadioGroup
                    aria-label="complaint-type"
                    name="complaint-type"
                    value={complaintType}
                    onChange={handleComplaintTypeChange}
                  >
                    <FormControlLabel value="Introduction" control={<Radio />} label="Technical Issue " />
                    <FormControlLabel value="Privacy" control={<Radio />} label="Delete Account" />
                  </RadioGroup>
                </Typography>
              </Box>
              <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-start" // Align elements to start
              width="100%" // Make the box take full width
              mt={2}
            >
              <Checkbox
                checked={isCheckboxChecked}
                onChange={handleCheckboxChange}
              />
              <Typography variant="body1" style={{ marginLeft: '0.5rem' }}>Are you Sure you want to forward your request to the Admin ?  </Typography>
              <Link to="/patient" style={{ textDecoration: 'none' }}>
                <button disabled={!isCheckboxChecked} style={{ width: '160px', backgroundColor: isCheckboxChecked ? '#1976D2' : '#ccc', color: '#fff', border: 'none', padding: '1rem 1rem', borderRadius: '0.5rem', cursor: 'pointer' }}>Yes! , Continue ..</button>
              </Link>
            </Box>
            </Box>
            
          </div>
        </div>
      </div>
    </div>
  );
}
