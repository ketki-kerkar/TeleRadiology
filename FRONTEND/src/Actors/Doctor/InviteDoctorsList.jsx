import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../../Components/Navbar';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper, Button, CssBaseline, Checkbox , Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation } from 'react-router-dom';
import Popover from '@mui/material/Popover';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { LoggedInUserContext } from '../../Context/LoggedInUserContext';

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
  const { loggedinUser } = useContext(LoggedInUserContext);
  const authToken = loggedinUser.token;
  const loggedInDoctorEmail = localStorage.getItem('userEmail');
  const [doctors, setDoctors] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctorTypes, setSelectedDoctorTypes] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDtype, setSelectedDType] = useState('All');
  const [openDialog, setOpenDialog] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const caseId = queryParams.get('caseId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9191/api/v1/doctor/viewList/ofDoctors', {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        const filteredDoctors = response.data.filter(doctor => doctor.email !== loggedInDoctorEmail);
        setAllDoctors(filteredDoctors);
        setDoctors(filteredDoctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchData();
  }, [authToken, loggedInDoctorEmail]);

  const handleSearch = () => {
    const filteredDoctors = doctors.filter(doctor =>
      doctor.dname.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDoctors(filteredDoctors);
  };

 
  const handleFilter = (doctorType) => {
    setSelectedDType(doctorType);
    setAnchorEl(null); // Close popover after selecting a doctor type

    let filteredDoctors = [];

    if (doctorType === 'All') {
      
      filteredDoctors = allDoctors;
    } else {
      
      filteredDoctors = allDoctors.filter(doctor =>
        doctor.dtype && doctor.dtype.toLowerCase() === doctorType.toLowerCase()
      );
    }

    setDoctors(filteredDoctors);
  };
    

  const handleDoctorTypeChange = (event) => {
    const selectedDoctorType = event.target.name;
    const isChecked = event.target.checked;

    if (isChecked && selectedDoctorTypes.length === 3) {
      setSelectedDoctorTypes((prevSelectedDoctorTypes) => [
        ...prevSelectedDoctorTypes,
        selectedDoctorType,
      ]);
    } else if (!isChecked) {
      setSelectedDoctorTypes((prevSelectedDoctorTypes) =>
        prevSelectedDoctorTypes.filter((type) => type !== selectedDoctorType)
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedDoctors = doctors.filter(doctor => selectedDoctorTypes.includes(doctor.email));
    const selectedDoctorEmails = selectedDoctors.map(doctor => doctor.email);

    const formData = {
      caseId: caseId,
      listOfRadiologistId: selectedDoctorEmails
    };

    axios.post('http://localhost:9191/api/v1/doctor/ask-consent', formData, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
    .then(response => {
      setOpenDialog(true);
    })
    .catch(error => {
      console.error('Error:', error);
      
    });
  };
  const handleCloseDialog = () => {
    alert("error sending invitation!");
    setOpenDialog(false);
    window.history.back();
  };

  return (
    <div className='this-div'>
      <Navbar userRole="doctor" />
      <CssBaseline />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 310px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Search by Doctor Name" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            style={{ height:'40px', width: '300px', marginRight: '10px' }} 
          />
          <Button 
            variant="contained" 
            onClick={handleSearch} 
            style={{ minWidth: '30px', height: '40px', backgroundColor: '#1976D2', color: '#FFF' }}
          >
            <SearchIcon />
          </Button>
        </div>
        <Button 
          variant="contained" 
          onClick={handleSubmit} 
          style={{ backgroundColor: '#1976d2', color: '#fff', borderRadius: '5px', width:'150px' , marginRight:'-36px'}}
        >
          Send Invite
        </Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px 10px' }}>
        <TableContainer component={Paper} style={{ maxWidth: 'calc(100% - 80px)', width: '1300px' }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell align="left">DOCTOR NAME</StyledTableCell>
                <StyledTableCell align="left">HOSPITAL NAME</StyledTableCell>
                <StyledTableCell align="left">EMAIL</StyledTableCell>
                <StyledTableCell align="left">Doctor Type <FilterAltIcon onClick={(e) => setAnchorEl(e.currentTarget)}/> </StyledTableCell>
                <StyledTableCell align="left">QUALIFICATION</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors.map((doctor, index) => (
                <TableRow key={doctor.email}>
                  <TableCell component="th" scope="row">
                    <Checkbox
                      checked={selectedDoctorTypes.includes(doctor.email)}
                      onChange={handleDoctorTypeChange}
                      name={doctor.email}
                    />
                  </TableCell>
                  <TableCell align="left">{doctor.dname}</TableCell>
                  <TableCell align="left">{doctor.hospitalName}</TableCell>
                  <TableCell align="left">{doctor.email}</TableCell>
                  <TableCell align="left">{doctor.dtype}</TableCell>
                  <TableCell align='left'>{doctor.qualification}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <div style={{ padding: '8px' }}>
            <Button onClick={() => handleFilter('All')}>All</Button>
            <Button onClick={() => handleFilter('Doctor')}>Doctor</Button>
            <Button onClick={() => handleFilter('Radiologist')}>Radiologist</Button>
          </div>
        </Popover>
        <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Registration Successful</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Invitation Sent Successfully!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>
  );
}
