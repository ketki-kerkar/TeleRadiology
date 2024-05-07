import React, { useState } from 'react';
import Navbar from '../../Components/Navbar';
import logo from '../../Images/reception.jpg';
import { Link } from 'react-router-dom';
import { Container, Grid, Typography, Box } from '@mui/material';
import TableViewIcon from '@mui/icons-material/TableView';
import InsightsIcon from '@mui/icons-material/Insights';
import AddchartIcon from '@mui/icons-material/Addchart';
import WavingHandRoundedIcon from '@mui/icons-material/WavingHandRounded';
import CssBaseline from '@mui/material/CssBaseline';

export default function PatientHome() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleButtonClick = (buttonNumber) => {
        console.log(`Button ${buttonNumber} clicked`);
    };

    return (
        <div>
      <Navbar userRole="patient"/>
      <CssBaseline />
        <div style={{ backgroundColor: '#fff' }}>
            <Container maxWidth="xl">
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={12}>
                        <div style={{ marginTop: '20px', padding: '20px', paddingRight: '10px', textAlign: 'center' }}>
                            <Typography variant="h3" style={{ fontFamily: 'Comic Sans MS' }}>
                                WELCOME USER ! <WavingHandRoundedIcon style={{ fontSize: 'inherit', color: '#FFD700' }} />
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={20} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <img src={logo} alt='Lab Home' style={{ maxWidth: '100%', height: 'auto', borderRadius: '2px', marginBottom: '60px' }} />
                
                            <Box display="flex" justifyContent="center">
                                <Link to="/patient/viewCase" style={{ textDecoration: 'none' }}>
                                    <div 
                                        onClick={() => handleButtonClick(3)} 
                                        style={{ 
                                            margin: '0 20px', 
                                            cursor: 'pointer', 
                                            backgroundColor: '#87CEEB', 
                                            color: '#000', 
                                            padding: '10px 20px', 
                                            borderRadius: '5px', 
                                            display: 'flex', 
                                            flexDirection: 'column', 
                                            alignItems: 'center',
                                            transition: 'all 0.3s ease-in-out',
                                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
                                        }}
                                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                    >
                                        <TableViewIcon style={{ marginBottom: '10px' }} /> View Cases 
                                    </div>
                                </Link>

                                <Link to="/viewLabReports" style={{ textDecoration: 'none' }}>
                                    <div 
                                        onClick={() => handleButtonClick(4)} 
                                        style={{ 
                                            margin: '0 20px', 
                                            cursor: 'pointer', 
                                            backgroundColor: '#87CEEB', 
                                            color: '#000', 
                                            padding: '10px 20px', 
                                            borderRadius: '5px', 
                                            display: 'flex', 
                                            flexDirection: 'column', 
                                            alignItems: 'center',
                                            transition: 'all 0.3s ease-in-out',
                                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
                                        }}
                                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                    >
                                        <AddchartIcon style={{ marginBottom: '10px' }} /> View Lab Reports 
                                    </div>
                                </Link>

                                <Link to="/viewFinalReports" style={{ textDecoration: 'none' }}>
                                    <div 
                                        onClick={() => handleButtonClick(5)} 
                                        style={{ 
                                            margin: '0 20px', 
                                            cursor: 'pointer', 
                                            backgroundColor: '#87CEEB', 
                                            color: '#000', 
                                            padding: '10px 20px', 
                                            borderRadius: '5px', 
                                            display: 'flex', 
                                            flexDirection: 'column', 
                                            alignItems: 'center',
                                            transition: 'all 0.3s ease-in-out',
                                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
                                        }}
                                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                    >
                                        <InsightsIcon style={{ marginBottom: '10px' }} /> View Final Reports 
                                    </div>
                                </Link>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
        </div>
    );
}


