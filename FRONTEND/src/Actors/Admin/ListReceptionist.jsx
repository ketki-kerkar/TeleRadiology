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

export default function ListReceptionist() {
  const [receptionists, setReceptionists] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/listReceptionists');
        setReceptionists(response.data); // Assuming the response data is an array of receptionists
      } catch (error) {
        console.error('Error fetching receptionists:', error);
      }
    };

    fetchData();
  }, []);

  const handleViewDetails = (receptionistId) => {
    // Handle viewing details of the receptionist here
    console.log("Viewing details of receptionist with ID:", receptionistId);
  };

  const handleSearch = () => {
    // Filter the receptionists based on the searchQuery
    const filteredReceptionists = receptionists.filter(receptionist => receptionist.id.includes(searchQuery));
    setReceptionists(filteredReceptionists);
  };

  return (
    <div className='this-div'>
      <Navbar userRole="admin" />
      <CssBaseline />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 310px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Search by Receptionist ID" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            style={{ height:'40px', width: '300px', marginRight: '10px' }} 
          />
          <Button variant="contained" onClick={handleSearch} style={{ Width: '25px', height: '40px', backgroundColor: '#7FDEFF', color: '#000000' }}>
            <SearchIcon />
          </Button>
        </div>
        <Link to="./addreceptionist" style={{ textDecoration: 'none', height:'40px'}}>
          <Button variant="contained" style={{ backgroundColor: '#7FDEFF', color: '#000000' }}>
            Add Receptionist
          </Button>
        </Link>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 10px' }}>
        <TableContainer component={Paper} style={{ maxWidth: 'calc(100% - 80px)', width: '1300px' }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>S.No.</StyledTableCell>
                <StyledTableCell align="right">RECEPTIONIST ID</StyledTableCell>
                <StyledTableCell align="right">RECEPTIONIST NAME</StyledTableCell>
                <StyledTableCell align="right">GENDER</StyledTableCell>
                <StyledTableCell align="right">EMAIL</StyledTableCell>
                <StyledTableCell align="right">ACTIONS</StyledTableCell> {/* New column for actions */}
              </TableRow>
            </TableHead>
            <TableBody>
              {receptionists.map((receptionist, index) => (
                <StyledTableRow key={receptionist.id}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="right">{receptionist.id}</StyledTableCell>
                  <StyledTableCell align="right">{receptionist.name}</StyledTableCell>
                  <StyledTableCell align="right">{receptionist.gender}</StyledTableCell>
                  <StyledTableCell align="right">{receptionist.email}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button variant="contained" color="primary" onClick={() => handleViewDetails(receptionist.id)}>
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