import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import { Box, Container, Grid, Typography } from '@mui/material';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { useContext } from 'react';
import { LoggedInUserContext } from '../../Context/LoggedInUserContext';

export default function ViewCase() {
    const { loggedinUser } = useContext(LoggedInUserContext);
    const authToken = loggedinUser.token;
    const [cases, setCases] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
   // console.log(email);
    console.log(authToken);

    const handleSearch = async () => {
        try {
            if (!authToken) {
                throw new Error('Authentication token not found');
            }
            const response = await axios.get('http://localhost:9191/api/v1/patient/viewList/ofCases', {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`
                }
            });
            setCases(response.data);
        } catch (error) {
            console.error('Error fetching cases:', error);
            setError(error.message || 'An error occurred while fetching cases');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleNavigateToUnitCases = (caseId) => {
        navigate(`/patient/viewCase/unitCases`, { state: { caseId } });
    };

    useEffect(() => {
        handleSearch();
    }, []); // Execute handleSearch only on component mount

    return (
        <div>
            <Navbar userRole="patient" />
            <CssBaseline />
            <Container maxWidth="xl">
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={12} md={20} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <div style={{ marginTop: '80px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                {cases.map((caseItem) => (
                                    <div key={caseItem.caseId} style={{ marginBottom: '20px', marginRight: '100px' }}>
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
                                                width: '350px',
                                                height: '210px',
                                            }}
                                            className="case-details"
                                            onClick={() => handleNavigateToUnitCases(caseItem.caseId)}
                                        >
                                            <Typography variant="body1"><b>Case ID: {caseItem.caseId}</b></Typography>
                                            <Typography variant="body1">Doctor Name: {caseItem.dname}</Typography>
                                            <Typography variant="body1">Hospital Name: {caseItem.hospitalName}</Typography>
                                            <Typography variant="body1">Case Registration Date: {formatDate(caseItem.caseRegistrationDate)}</Typography>
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



































