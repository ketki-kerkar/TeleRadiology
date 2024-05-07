import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
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
import StatusIndicator from '../../Components/caseStausIndicator';
import { LoggedInUserContext } from '../../Context/LoggedInUserContext';

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
  const { loggedinUser } = useContext(LoggedInUserContext);
  const authToken = loggedinUser.token;
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9191/api/v1/doctor/viewList/ofPatients',  {
          headers: {
            Authorization: `Bearer ${authToken}`
          }});
        setPatients(response.data); 
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchData();
  }, [authToken]);

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
            placeholder="Search by Patient Name" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            style={{ height:'40px', width: '300px', marginRight: '10px' }} 
          />
          <Button variant="contained" onClick={handleSearch} style={{ minWidth: '30px', height: '40px', backgroundColor: '#1976D2', color: '#fff' }}>
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
                <StyledTableCell align="left">PATIENT NAME</StyledTableCell>
                <StyledTableCell align="left">AGE</StyledTableCell>
                <StyledTableCell align="left">GENDER</StyledTableCell>
                <StyledTableCell align="left">CONTACT</StyledTableCell>
                <StyledTableCell align="left">Case Id</StyledTableCell>
                <StyledTableCell align='left'>Case Status</StyledTableCell>
                <StyledTableCell align="left">VIEW</StyledTableCell> 
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient, index) => (
                <StyledTableRow key={patient.caseId}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="left">{patient.name}</StyledTableCell>
                  <StyledTableCell align="left">{patient.age}</StyledTableCell>
                  <StyledTableCell align="left">{patient.gender}</StyledTableCell>
                
                  <StyledTableCell align="left">{patient.contact}</StyledTableCell>
                  <StyledTableCell align="left">{patient.caseId}</StyledTableCell>
                  <StyledTableCell align="left"><StatusIndicator active={patient.caseStatus} /></StyledTableCell>
                  <StyledTableCell align="left">
                  <Link
                      to={{
                        pathname: '/doctor/listPatients/patientdetails',
                        search: `?email=${patient.email}&caseId=${patient.caseId}`
                      }}
                      style={{ textDecoration: 'none', color: '#fff' }}
                    >
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
