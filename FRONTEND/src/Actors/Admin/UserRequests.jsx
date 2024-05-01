import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { CssBaseline, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import StatusIndicator from '../../Components/caseStausIndicator';
const theme = createTheme({
  palette: {
    secondary: {
      main: '#F7FBFF',
    },
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#D7F5F2',
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
      const response = await axios.get('http://localhost:9191/api/v1/admin/view-complaints', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching user requests:', error);
      // Handle error, show a message to the user maybe
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:9191/api/v1/admin/findUser/ByEmail', { email: searchQuery }, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      setRequests([response.data]);
    } catch (error) {
      console.error('Error fetching user request by email:', error);
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
            style={{ height: '40px', width: '300px', marginRight: '10px', borderRadius: '3px' }}
          />
          <Button variant="contained" onClick={handleSearch} style={{ minWidth: '30px', height: '40px', backgroundColor: '#1976d2', color: '#fff', borderRadius: '3px' }}>
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
                <StyledTableCell align="left">Patient Email</StyledTableCell>
                <StyledTableCell align="left">Request Type</StyledTableCell>
                <StyledTableCell align="left">Request Date</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
                <StyledTableCell align="left">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {requests.map((request, index) => (
              <TableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="left">{request.patientEmail}</StyledTableCell>
                <StyledTableCell align="left">{request.requestType}</StyledTableCell>
                <StyledTableCell align="left">{request.requestDate}</StyledTableCell>
                <StyledTableCell align="left"><StatusIndicator active={request.requestStatus} /></StyledTableCell>
                <StyledTableCell align="left">
                  {request.requestType === 'Technical Issue' ? (
                    <Button variant="contained" style={{ backgroundColor: '#1976d2', marginRight: '10px' }}>
                      View Details
                    </Button>
                  ) : null}
                  {request.requestType === 'Delete Account' ? (
                    <Link to={{ pathname: "./viewrequestDel", search: `?email=${request.patientEmail}` }} style={{ textDecoration: 'none' }}>
                      <Button variant="contained" style={{ backgroundColor: '#1976d2' }}>
                        Take Action
                      </Button>
                    </Link>
                  ) : null}
                </StyledTableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </ThemeProvider>
  );
}
