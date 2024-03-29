import * as React from 'react';
import { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import StyledTableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { CssBaseline } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#D7F5F2', // Change the background color here
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function ListDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/listDoctors');
        setDoctors(response.data); // Assuming the response data is an array of doctors
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchData();
  }, []);

  const handleViewDetails = (doctorId) => {
    // Handle viewing details of the doctor here
    console.log("Viewing details of doctor with ID:", doctorId);
  };

  const handleSearch = () => {
    // Filter doctors based on searchQuery
    const filteredDoctors = doctors.filter(doctor => doctor.id.includes(searchQuery));
    setDoctors(filteredDoctors);
  };

  return (
    <div className='this-div'>
      <Navbar userRole="admin" />
      <CssBaseline />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 310px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Search by Doctor ID" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            style={{ height:'40px', width: '300px', marginRight: '10px' }} 
          />
          <Button variant="contained" onClick={handleSearch} style={{ Width: '25px', height: '40px', backgroundColor: '#7FDEFF', color: '#000000' }}>
            <SearchIcon />
          </Button>
        </div>
        <Link to="./adddoctor" style={{ textDecoration: 'none' , height:'40px'}}>
          <Button variant="contained" style={{ backgroundColor: '#7FDEFF', color: '#000000' }}>
            Add Doctor
          </Button>
        </Link>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 10px' }}>
        <TableContainer component={Paper} style={{ maxWidth: 'calc(100% - 80px)', width: '1300px' }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>S.No.</StyledTableCell>
                <StyledTableCell align="right">DOCTOR ID</StyledTableCell>
                <StyledTableCell align="right">DOCTOR NAME</StyledTableCell>
                <StyledTableCell align="right">GENDER</StyledTableCell>
                <StyledTableCell align="right">SPECIALIZATION</StyledTableCell>
                <StyledTableCell align="right">EMAIL</StyledTableCell>
                <StyledTableCell align="right">ACTIONS</StyledTableCell> {/* New column for actions */}
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors.map((doctor, index) => (
                <StyledTableRow key={doctor.id}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="right">{doctor.id}</StyledTableCell>
                  <StyledTableCell align="right">{doctor.name}</StyledTableCell>
                  <StyledTableCell align="right">{doctor.gender}</StyledTableCell>
                  <StyledTableCell align="right">{doctor.specialization}</StyledTableCell>
                  <StyledTableCell align="right">{doctor.email}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button variant="contained" color="primary" onClick={() => handleViewDetails(doctor.id)}>
                      View
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
