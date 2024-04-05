import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { CssBaseline, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import  { tableCellClasses } from '@mui/material/TableCell';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';


const theme = createTheme({
  palette: {
    secondary: {
      main: '#F7FBFF',
    },
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#D7F5F2', // Change the background color here
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


export default function ViewDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9191/api/v1/admin/viewList/ofDoctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        // Handle error, show a message to the user maybe
      }
    };
  
    fetchData();
  }, []);

  const handleViewDetails = (doctorId) => {
    console.log("Viewing details of doctor with ID:", doctorId);
    // Implement logic to view details
  };

  const handleSearch = () => {
    const filteredDoctors = doctors.filter(doctor => doctor.doctorId.includes(searchQuery));
    setDoctors(filteredDoctors);
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar userRole="admin" />
      <CssBaseline />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 310px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Search by Doctor ID" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            style={{ height:'40px', width: '300px', marginRight: '10px', borderRadius:'3px'}} 
          />
          <Button variant="contained" onClick={handleSearch} style={{ minWidth: '30px', height: '40px', backgroundColor: '#1976d2', color: '#fff',borderRadius:'3px' }}>
          <SearchIcon />
          </Button>
        </div>
        <Link to="./adddoctor" style={{ textDecoration: 'none' }}>
          <Button variant="contained" style={{ backgroundColor: '#1976d2',color: '#fff',height:'40px' }}>
            Add Doctor
          </Button>
        </Link>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '5px 5px' }}>
        <TableContainer component={Paper} style={{ maxWidth: 'calc(100% - 80px)', width: '1300px' }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>S.No.</StyledTableCell>
                
                <StyledTableCell align="left">DOCTOR NAME</StyledTableCell>
                <StyledTableCell align="left">HOSPITAL NAME</StyledTableCell>
                <StyledTableCell align="left">EMAIL</StyledTableCell>
                <StyledTableCell align="left">ACTIONS</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors.map((doctor, index) => (
                <TableRow key={doctor.doctorId}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="left">{doctor.dname}</TableCell>
                  <TableCell align="left">{doctor.hospitalName}</TableCell>
                  <TableCell align="left">{doctor.email}</TableCell>
                  <TableCell align="left">
                    <Link to={`/doctor-details/${doctor.doctorId}`} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" style={{ backgroundColor: '#1976d2' }} onClick={() => handleViewDetails(doctor.doctorId)}>
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      </ThemeProvider>
  );
}
