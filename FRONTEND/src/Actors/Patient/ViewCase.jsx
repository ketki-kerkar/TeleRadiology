import React, { useState } from 'react';
import Navbar from '../../Components/Navbar';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios'; // Import axios for API calls

export default function ViewCase() {
    const [searchQuery, setSearchQuery] = useState('');
    const [cases, setCases] = useState([
        { id: 1, doctor: 'Dr. Smith', date: '2024-04-07' },
        { id: 2, doctor: 'Dr. Johnson', date: '2024-04-08' },
        { id: 3, doctor: 'Dr. Williams', date: '2024-04-09' }
    ]); // Static data for testing

    const handleSearch = async () => {
        try {
            // Make API call to fetch cases based on search query (email ID)
            const response = await axios.get(`http://your-api-endpoint/fetchCases?email=${searchQuery}`);
            console.log('Fetched cases:', response.data);

            // Update the cases state with the fetched list
            setCases(response.data);
        } catch (error) {
            console.error('Error fetching cases:', error);
        }
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
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '120px' }}>
                                <input
                                    type="text"
                                    placeholder="Search by Email ID"
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
                            <div style={{ marginTop: '80px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                {/* Render case-buttons dynamically based on the fetched cases */}
                                {cases.map((caseItem, index) => (
                                    <div key={index} style={{ marginBottom: '20px', marginRight: '100px' }}>
                                        <Box
                                            onClick={handleNavigateToIndividualCase}
                                            sx={{
                                                backgroundColor: '#fff',
                                                color: '#000',
                                                padding: '30px', // Reduce padding for Box 1
                                                borderRadius: '20px',
                                                cursor: 'pointer',
                                                border: '1px solid #ccc',
                                                position: 'relative', // Add position relative
                                                transition: 'transform 0.3s', // Add transition for hover effect
                                                '&:hover': {
                                                    transform: 'scale(1.1)', // Increase size on hover
                                                    zIndex: 1, // Bring to front on hover
                                                    borderColor: '#000', // Change border color to black
                                                    borderWidth: '2px', // Increase border width
                                                },
                                                width: '200px', // Fixed width for all case-buttons
                                                height: '150px', // Fixed height for all case-buttons
                                            }}
                                            className="case-button"
                                        >
                                            {/* Outermost box (Box 1) */}
                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    textAlign: 'left',
                                                }}
                                            >
                                                {/* Grey-colored box inside the button (Box 2) */}
                                                <Box
                                                    sx={{
                                                        backgroundColor: '#ccc', // Grey background color
                                                        color: '#000',
                                                        padding: '10px', // Same size as the outer box
                                                        borderRadius: '10px',
                                                        width: '90%', // Adjust width for Box 2
                                                        height: '100%',
                                                        marginTop: '-5px', // Adjust height for Box 2
                                                    }}
                                                >
                                                    <Typography variant="body2">Case ID: {caseItem.id}</Typography> {/* Case ID */}
                                                </Box>
                                                {/* Box for Doctor Name and Date (Box 3) */}
                                                <Box
                                                    sx={{
                                                        marginTop: '30px',
                                                        padding: '20px',
                                                        width: '100%', // Adjust width for Box 3
                                                        height: 'fit-content', // Adjust height for Box 3
                                                    }}
                                                >
                                                    <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>{caseItem.doctor}</Typography> {/* Doctor's name */}
                                                    <Typography variant="body1" style={{ color: '#888' }}>{caseItem.date}</Typography> {/* Date */}
                                                </Box>
                                            </Box>
                                        </Box>
                                    </div>
                                ))}
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}














