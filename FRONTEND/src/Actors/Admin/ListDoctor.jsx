import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CssBaseline, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

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
          <Button variant="contained" onClick={handleSearch} style={{ minWidth: '30px', height: '40px', backgroundColor: '#7FDEFF', color: '#000000' }}>
            Search
          </Button>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 10px' }}>
        <TableContainer component={Paper} style={{ maxWidth: 'calc(100% - 80px)', width: '1300px' }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>S.No.</TableCell>
                
                <TableCell align="left">DOCTOR NAME</TableCell>
                <TableCell align="left">HOSPITAL NAME</TableCell>
                <TableCell align="left">GENDER</TableCell>
                <TableCell align='left'>QUALIFICATION</TableCell>
                <TableCell align="left">SPECIALIZATION</TableCell>
                <TableCell align="left">EMAIL</TableCell>
                <TableCell align="left">ACTIONS</TableCell>
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
                  <TableCell align="left">{doctor.gender}</TableCell>
                  <TableCell align='left'>{doctor.qualification}</TableCell>
                  <TableCell align="left">{doctor.dtype}</TableCell>
                  <TableCell align="left">{doctor.email}</TableCell>
                  <TableCell align="left">
                    <Link to={`/doctor-details/${doctor.doctorId}`} style={{ textDecoration: 'none' }}>
                      <Button variant="contained" color="primary" onClick={() => handleViewDetails(doctor.doctorId)}>
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
    </div>
  );
}

