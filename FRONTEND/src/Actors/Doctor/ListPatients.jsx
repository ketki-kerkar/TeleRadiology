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

export default function ListPatients() {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/listPatients');
        setPatients(response.data); // Assuming the response data is an array of patients
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchData();
  }, []);

  const handleViewDetails = (patientId) => {
    // Handle viewing details of the patient here
    console.log("Viewing details of patient with ID:", patientId);
  };

  const handleSearch = () => {
    // Filter patients based on searchQuery
    const filteredPatients = patients.filter(patient => patient.id.includes(searchQuery));
    setPatients(filteredPatients);
  };

  return (
    <div className='this-div'>
      <Navbar userRole="doctor" />
      <CssBaseline />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 310px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Search by Patient ID" 
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
                <StyledTableCell align="right">PATIENT ID</StyledTableCell>
                <StyledTableCell align="right">PATIENT NAME</StyledTableCell>
                <StyledTableCell align="right">AGE</StyledTableCell>
                <StyledTableCell align="right">GENDER</StyledTableCell>
                <StyledTableCell align="right">CASE-ID</StyledTableCell>
                <StyledTableCell align="right">CASE STATUS</StyledTableCell>
                <StyledTableCell align="right">VIEW</StyledTableCell> {/* New column for actions */}
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient, index) => (
                <StyledTableRow key={patient.id}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="right">{patient.id}</StyledTableCell>
                  <StyledTableCell align="right">{patient.name}</StyledTableCell>
                  <StyledTableCell align="right">{patient.age}</StyledTableCell>
                  <StyledTableCell align="right">{patient.gender}</StyledTableCell>
                  <StyledTableCell align="right">{patient.caseId}</StyledTableCell>
                  <StyledTableCell align="right">{patient.caseStatus}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button variant="contained" color="primary" onClick={() => handleViewDetails(patient.id)}>
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
