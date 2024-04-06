import React, { useState } from 'react';
import Navbar from '../../Components/Navbar';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function ViewCase() {
    const [searchQuery, setSearchQuery] = useState('');

  
    const handleSearch = () => {
        // Implement search functionality here
        console.log('Searching for:', searchQuery);
    };

    const handleNavigateToIndividualCase = () => {
        // Navigate to "/individualCase" page
        console.log('Navigating to individual case');
        // You can use the routing library you have installed (e.g., react-router-dom) to navigate to the "/individualCase" page
    };

    return (
        <div style={{ backgroundColor: '#fff' }}>
            <Navbar userRole="patient" style={{ marginBottom: '20px' }} />
            <Container maxWidth="xl">
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={12} md={20} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                                <input
                                    type="text"
                                    placeholder="Search by CaseID"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{ height: '40px', width: '300px', marginRight: '10px', borderRadius: '3px' }}
                                />
                                <Button
                                    variant="contained"
                                    onClick={handleSearch}
                                    style={{ minWidth: '50px', height: '40px', backgroundColor: '#1976d2', color: '#fff', borderRadius: '3px' }}
                                >
                                    <SearchIcon />
                                </Button>
                            </div>
                            <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
                                {/* Box acting as a button */}
                                <Box
                                    onClick={handleNavigateToIndividualCase}
                                    sx={{
                                        backgroundColor: '#fff',
                                        color: '#000',
                                        padding: '50px 150px',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        margin: '0 10px',
                                        border: '1px solid #ccc',
                                        position: 'relative', // Add position relative
                                        transition: 'transform 0.3s', // Add transition for hover effect
                                        '&:hover': {
                                            transform: 'scale(1.1)', // Increase size on hover
                                            zIndex: 1, // Bring to front on hover
                                        },
                                    }}
                                    className="case-button"
                                >
                                    {/* Grey-colored box inside the button */}
                                    <Box
                                        sx={{
                                            backgroundColor: '#ccc', // Grey background color
                                            color: '#fff',
                                            padding: '10px', // Same size as the outer box
                                            borderRadius: '5px',
                                            position: 'absolute',
                                            top: '10px', // Add top margin
                                            left: '5px', // Add left margin
                                            right: '10px', // Add right margin
                                            zIndex: 0, // Ensure it's behind the content
                                        }}
                                    >
                                        <Typography variant="body2" style={{ textAlign: 'left', marginLeft: '10px' }}>Case ID: 12345</Typography> {/* Case ID */}
                                    </Box>
                                    <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginTop: '30px', textAlign: 'left', marginLeft: '5px' }}>Doctor Name</Typography> {/* Doctor's name */}
                                    <Typography variant="body1" style={{ color: '#888', textAlign: 'left', marginLeft: '5px' }}>Date</Typography> {/* Date */}
                                </Box>
                                {/* Add more Box components for additional buttons */}
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}









