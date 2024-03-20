import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const CustomButton = () => {
  return (
    <Button
      variant="contained"
      style={{ borderRadius:'0.5vw',position: 'fixed',height:'5.8vh',width:'15vw', bottom: '16vh',right:'10vw',backgroundColor:'#7FDEFF',color:'black',fontFamily: 'Quicksand, sans-serif',
      fontSize: '1vw' }}
    >
      Delete User?
    </Button>
  );
};

export default CustomButton;