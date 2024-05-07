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
import { useContext } from 'react';
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

export default function ListComplaint() {
  const { loggedinUser } = useContext(LoggedInUserContext);
  const authToken = loggedinUser.token;
  const [complaints, setComplaints] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredComplaints, setFilteredComplaints] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/listComplaints',{
          headers: {
            Authorization: `Bearer ${authToken}`
          }});
        setComplaints(response.data); // Assuming the response data is an array of complaints
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchData();
  }, [authToken]);
  
  useEffect(() => {
    setFilteredComplaints(complaints.filter(complaint => complaint.id.includes(searchQuery)));
  }, [searchQuery, complaints]);

  const handleViewDetails = (complaintId) => {
    // Handle viewing details of the complaint here
    console.log("Viewing details of complaint with ID:", complaintId);
  };
  const handleSearch = () => {
    setFilteredComplaints(complaints.filter(complaint => complaint.id.includes(searchQuery)));
  };

  return (
    <div className='this-div'>
      <Navbar userRole="admin" />
      <CssBaseline />
      <div style={{ display: 'flex', alignItems: 'center', margin: '10px 310px' }}>
        <input 
          type="text" 
          placeholder="Search by Complaint ID" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          style={{ height: '40px', width: '300px', marginRight: '10px',borderRadius:'3px' }} 
        />
        <Button variant="contained" onClick={handleSearch} style={{ minWidth: '25px' ,height: '40px',backgroundColor: '#7FDEFF',color: '#000000',borderRadius:'3px' }}>
          <SearchIcon />
        </Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 10px' }}>
        <TableContainer component={Paper} style={{ maxWidth: 'calc(100% - 80px)', width: '1300px' }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>S.No.</StyledTableCell>
                <StyledTableCell align="right">COMPLAINT ID</StyledTableCell>
                <StyledTableCell align="right">COMPLAINT TYPE</StyledTableCell>
                <StyledTableCell align="right">DOCTOR ID</StyledTableCell>
                <StyledTableCell align="right">DATE</StyledTableCell>
                <StyledTableCell align="right">STATUS</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredComplaints.map((complaint, index) => (
                <StyledTableRow key={complaint.id}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="right">{complaint.id}</StyledTableCell>
                  <StyledTableCell align="right">{complaint.type}</StyledTableCell>
                  <StyledTableCell align="right">{complaint.doctorId}</StyledTableCell>
                  <StyledTableCell align="right">{complaint.date}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button variant="contained" color="primary" onClick={() => handleViewDetails(complaint.id)}>
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
