import React, { useRef, useState } from 'react';
import { Box, Typography, Checkbox, RadioGroup, FormControlLabel, Radio, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Navbar from '../../Components/Navbar';
import { Link } from 'react-router-dom';

export default function LaunchComplaint() {
    const boxRef = useRef(null);
    const [complaintType, setComplaintType] = useState('');
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsCheckboxChecked(event.target.checked);
    };
    const handleComplaintTypeChange = (event) => {
        setComplaintType(event.target.value);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleButtonClick = () => {
        setDialogOpen(true);
    };

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar userRole="patient" />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <div style={{ width: '80vw', maxWidth: '800px', position: 'relative' }}>
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
                            width: '100%',
                        }}
                    >
                        <Typography variant="h4" style={{ fontFamily: 'Quicksand', color: '#333', marginBottom: '2vh' }}>
                            Select Complaint Type !
                        </Typography>
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="flex-start"
                            bgcolor="white"
                            p={2}
                            borderRadius="16px"
                            border="0.1vw solid #ccc"
                            sx={{ overflowY: 'auto', maxHeight: '60vh', maxWidth: '100%', width: '94%' }}
                            ref={boxRef}
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
                            justifyContent="space-between"
                            width="100%"
                            mt={2}
                        >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Checkbox
                                    checked={isCheckboxChecked}
                                    onChange={handleCheckboxChange}
                                />
                                <Typography variant="body1" style={{ marginLeft: '0.5rem' }}>Are you Sure you want to forward your request to the Admin ?  </Typography>
                            </div>
                            <Button onClick={handleButtonClick} disabled={!isCheckboxChecked} style={{ width: '160px', backgroundColor: isCheckboxChecked ? '#1976D2' : '#ccc', color: '#fff', border: 'none', padding: '1rem 1rem', borderRadius: '0.5rem', cursor: 'pointer' }}>Yes!</Button>
                        </Box>
                    </Box>
                </div>
            </div>
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Your Complaint has been registered</DialogTitle>
                <DialogContent>
                    <Typography>Thank you for choosing us!</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
