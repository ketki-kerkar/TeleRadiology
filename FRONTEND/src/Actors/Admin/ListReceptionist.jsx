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

export default function ListReceptionist() {
  const { loggedinUser } = useContext(LoggedInUserContext);
  const authToken = loggedinUser.token;
  const [receptionists, setReceptionists] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9191/api/v1/admin/viewList/ofHospitals',{
          headers: {
            Authorization: `Bearer ${authToken}`
          }});
        setReceptionists(response.data); // Assuming the response data is an array of receptionists
      } catch (error) {
        console.error('Error fetching receptionists:', error);
      }
    };

    fetchData();
  }, [authToken]);

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
            style={{ height:'40px', width: '300px', marginRight: '10px',borderRadius:'3px' }} 
          />
          <Button variant="contained" onClick={handleSearch} style={{ Width: '25px', height: '40px', backgroundColor: '#1976d2', color: '#fff' ,borderRadius:'3px' }}>
            <SearchIcon />
          </Button>
        </div>
        <Link to="./addreceptionist" style={{ textDecoration: 'none', height:'40px'}}>
          <Button variant="contained" style={{ backgroundColor: '#1976d2', color: '#fff'}}>
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
                <StyledTableCell align="left">HOSPITAL NAME</StyledTableCell>
                <StyledTableCell align="left">EMAIL</StyledTableCell>
                <StyledTableCell align="left">ACTIONS</StyledTableCell> 
              </TableRow>
            </TableHead>
            <TableBody>
              {receptionists.map((receptionist, index) => (
                <StyledTableRow key={receptionist.email}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="left">{receptionist.hospitalName}</StyledTableCell>
                  <StyledTableCell align="left">{receptionist.email}</StyledTableCell>
                  <StyledTableCell align="left">
                  <Link to={{ pathname:'/admin/listReceptionist/viewReceptionist', search: `?email=${receptionist.email}` }} style={{ textDecoration: 'none', color: '#fff' }}>
                      <Button variant="contained" style={{ backgroundColor: '#1976d2' }}>
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
