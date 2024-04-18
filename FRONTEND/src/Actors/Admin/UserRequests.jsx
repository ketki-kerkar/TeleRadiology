import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { CssBaseline, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
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

export default function UserRequests() {
  const authToken = localStorage.getItem('authToken');

  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:9191/api/v1/admin/viewList/ofUserRequests', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }}) ;
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching user requests:', error);
      // Handle error, show a message to the user maybe
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:9191/api/v1/userRequest/findUser/ByEmail', { email: searchQuery },{
        headers: {
          Authorization: `Bearer ${authToken}`
        }});
      setRequests([response.data]);
    } catch (error) {
      console.error('Error fetching user request by email:', error);
      // Handle error, show a message to the user maybe
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar userRole="admin" />
      <CssBaseline />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 310px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Search by User Email" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            style={{ height:'40px', width: '300px', marginRight: '10px', borderRadius:'3px'}} 
          />
          <Button variant="contained" onClick={handleSearch} style={{ minWidth: '30px', height: '40px', backgroundColor: '#1976d2', color: '#fff',borderRadius:'3px' }}>
            <SearchIcon />
          </Button>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '5px 5px' }}>
        <TableContainer component={Paper} style={{ maxWidth: 'calc(100% - 80px)', width: '1300px' }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>S.No.</StyledTableCell>
                <StyledTableCell align="left">Patient ID</StyledTableCell>
                <StyledTableCell align="left">Request ID</StyledTableCell>
                <StyledTableCell align="left">Request Type</StyledTableCell>
                <StyledTableCell align="left">Launch Date</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
                <StyledTableCell align="left">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {requests.map((request, index) => (
                  <TableRow key={request.requestId}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="left">{request.patientId}</TableCell>
                    <TableCell align="left">{request.requestId}</TableCell>
                    <TableCell align="left">{request.requestType}</TableCell>
                    <TableCell align="left">{request.launchDate}</TableCell>
                    <TableCell align="left">{request.status}</TableCell>
                    <TableCell align="left">
                      <Link to={{ pathname: "./viewuserrequest", search: `?email=${request.email}` }} style={{ textDecoration: 'none', color: '#fff' }}>
                        <Button variant="contained" style={{ backgroundColor: '#1976d2' }}>
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
