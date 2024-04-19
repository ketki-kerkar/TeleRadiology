import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'; // For centering and layout
import { Circle, CheckCircleOutlined, HighlightOff } from '@mui/icons-material'; // Import icons
import Navbar from '../../Components/Navbar';
import Button from '@mui/material/Button'; // Import Button component
const notifications = [
  'Dr. Sarah Johnson has requested access for annotated image.',
  'Dr. John Doe has requested access for consultation.',
];

const NotificationList = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}> 
      <Navbar userRole="doctor" /> {/* Render Navbar at the top */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexGrow: 1 }}> 
        <Box sx={{ width: '60%', display: 'flex', flexDirection: 'column', height: '45vh' }}> 
          {notifications.map((notification) => (
            <Card key={notification} sx={{ mb: 2, display: 'flex', alignItems: 'center',marginTop:'1vh',marginBottom:'0.2vh',justifyContent: 'space-between' }}> {/* Inline styling for spacing and alignment */}
             <Box sx={{ display: 'flex', alignItems: 'center',marginTop:'1vh',marginBottom:'0.2vh',justifyContent: 'flex-start' }}>
             <Circle sx={{ paddingLeft: '3vw', mr: 1, width: '12px', height: '12px', color: '#33CCFF' }} /> 
              <CardContent>
                <Typography variant="body2" sx={{ fontFamily: 'Quicksand, sans-serif' }}>
                  {notification}
                </Typography>
              </CardContent>
             </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between',marginRight:'1vw' }}> 
                <CheckCircleOutlined sx={{ color: '#009E04', fontSize: '2.3vw' }} /> 
                <HighlightOff sx={{ color: '#FF4141', fontSize: '2.3vw', ml: '1vw' }} />
              </Box>
            </Card>
          ))}
          <Box sx={{display:'flex',justifyContent:'center',marginTop:'1.5vh'}}>
          <Button
  variant="contained" // For a raised button with background color
  sx={{ 
    width:'12vw',
    height:'8vh',
    alignItems:'center',
    justifyContent:'center',
    fontSize:'1vw',
    backgroundColor: '#7FDEFF', // Set background color
    color: '#576AD0', // Set text color
    borderColor: '#3f51b5', // Set border color (same as background for this example)
    '&:hover': { // Styles on hover
      backgroundColor: '#303f9f', // Change background on hover
    },
  }}
>
  Load More
</Button>
          </Box>
     

        </Box>
        
      </Box>
     
    </Box>
  );
};

export default NotificationList;
