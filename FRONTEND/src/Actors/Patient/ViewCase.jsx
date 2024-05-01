import React, { useState , useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios'; // Import axios for API calls
import { useNavigate } from 'react-router-dom';

export default function ViewCase() {
    const [searchQuery, setSearchQuery] = useState('');
    const [cases, setCases] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 
    // const authToken = localStorage.getItem('authToken');

    // useEffect(() => {
    //     handleSearch();
    // });

    const handleSearch = async () => {
        try {
            console.log("Inside HandleSearch");
            const authToken = localStorage.getItem('authToken');
            console.log("AuthToken:",authToken);
            if (!authToken) {
                throw new Error('Authentication token not found');
            }
            const response = await axios.get('http://localhost:9191/api/v1/patient/viewList/ofCases', {
                headers: {
                    "Content-Type": "application/json" ,
                    Authorization: `Bearer ${authToken}`
                }
            });
            console.log('Fetched cases:', response.data);
            setCases(response.data);
        } catch (error) {
            console.error('Error fetching cases:', error);
            setError(error.message || 'An error occurred while fetching cases');
        }
    };

    const handleNavigateToUnitCases = (caseId) => {
        navigate(`/patient/viewCase/unitCases`, { state: { caseId } });
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
                                {/* Render case-details dynamically */}
                                {cases.map((caseItem, index) => (
                                    <div key={index} style={{ marginBottom: '20px', marginRight: '100px' }}>
                                        <Box
                                            sx={{
                                                backgroundColor: '#fff',
                                                color: '#000',
                                                padding: '30px',
                                                borderRadius: '20px',
                                                cursor: 'pointer',
                                                border: '1px solid #ccc',
                                                position: 'relative',
                                                transition: 'transform 0.3s',
                                                '&:hover': {
                                                    transform: 'scale(1.1)',
                                                    zIndex: 1,
                                                    borderColor: '#000',
                                                    borderWidth: '2px',
                                                },
                                                width: '200px',
                                                height: '150px',
                                            }}
                                            className="case-details"
                                            onClick={() => handleNavigateToUnitCases(caseItem.caseId)} // Pass caseId to handleNavigateToUnitCases
                                        >
                                            <Typography variant="body2">Case ID: {caseItem.caseId}</Typography>
                                            <Typography variant="subtitle1">{caseItem.dName}</Typography>
                                            <Typography variant="body1">{caseItem.hospitalName}</Typography>
                                            <Typography variant="body2">{caseItem.caseRegistrationDate}</Typography>
                                            <Typography variant="body2">{caseItem.caseStatus}</Typography>
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




















































