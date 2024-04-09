import React, { useState, useEffect } from 'react';
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
import { CssBaseline } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#D7F5F2',
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
      }
    };

    fetchData();
  }, []);

  const handleViewDetails = (doctorId) => {
    console.log("Viewing details of doctor with ID:", doctorId);
    // Add your logic for viewing details of the doctor here
  };

  const handleSearch = () => {
    const filteredDoctors = doctors.filter(doctor => doctor.id.includes(searchQuery));
    setDoctors(filteredDoctors);
  };

  return (
    <div className='this-div'>
      <Navbar userRole="doctor" />
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
          <Button variant="contained" onClick={handleSearch} style={{ minWidth: '30px', height: '40px', backgroundColor: '#7FDEFF', color: '#000000' }}>
            <SearchIcon />
          </Button>
        </div>
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
                <StyledTableCell align="right">ACTIONS</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors.map((doctor, index) => (
                <StyledTableRow key={doctor.id}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="right">{doctor.docotrId}</StyledTableCell>
                  <StyledTableCell align="right">{doctor.dName}</StyledTableCell>
                  <StyledTableCell align="right">{doctor.gender}</StyledTableCell>
                  <StyledTableCell align="right">{doctor.specialization}</StyledTableCell>
                  <StyledTableCell align="right">{doctor.email}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Link to={{ pathname: `/a`, state: { doctor }}} style={{ textDecoration: 'none' }}>
                      <Button variant="contained" color="primary">
                        View
                      </Button>
                    </Link>
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
