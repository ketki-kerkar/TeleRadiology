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
import { CssBaseline } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Navigate, useLocation} from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import ImportExportIcon from '@mui/icons-material/ImportExport';

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
  const authToken = localStorage.getItem('authToken');
  const loggedInDoctorEmail = localStorage.getItem('userEmail');
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctorTypes, setSelectedDoctorTypes] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const patientEmail = queryParams.get('email');
  const caseId = queryParams.get('caseId');
  const doctorEmail = queryParams.get('doctorEmail');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9191/api/v1/doctor/viewList/ofDoctors', {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        const filteredDoctors = response.data.filter(doctor => doctor.email !== loggedInDoctorEmail);
        setDoctors(filteredDoctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchData();
  }, [authToken, loggedInDoctorEmail]);
  

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);

    const selectedDoctors = doctors.filter(doctor => selectedDoctorTypes.includes(doctor.email));
    
    const selectedDoctorEmails = selectedDoctors.map(doctor => doctor.email);
  
    const formData = {
      caseId: caseId,
      doctorEmails: doctorEmail,
      patientEmail: patientEmail,
      listOfRadiologistEmail: selectedDoctorEmails
    };
  
    axios.post('http://localhost:9191/api/v1/doctor/ask-consent', formData, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
    .then(response => {
      setSubmitting(false);
      setOpenDialog(true);
      window.history.back();
    })
    .catch(error => {
      console.error('Error:', error);
      setSubmitting(false);
    });
  }


  const handleSearch = () => {
    // Implement search logic
  };

  const handleDoctorTypeChange = (event) => {
    const selectedDoctorType = event.target.name;
    const isChecked = event.target.checked;
  
    if (isChecked && selectedDoctorTypes.length < 3) {
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

  const handleFilter = () => {
    const filteredDoctors = doctors.filter(doctor => selectedDoctorTypes.includes(doctor.dtype));
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
          placeholder="Search by Doctor Name" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          style={{ height:'40px', width: '300px', marginRight: '10px' }} 
        />
        <Button variant="contained" onClick={handleSearch} style={{ minWidth: '30px', height: '40px', backgroundColor: '#1976D2', color: '#FFF' }}>
          <SearchIcon />
        </Button>
      </div>
        <Button variant="contained" onClick={handleSubmit} style={{ backgroundColor: '#1976d2', color: '#fff', borderRadius: '5px', width:'150px' , marginRight:'-36px'}}>
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
              <StyledTableCell align="left">Doctor Type <ImportExportIcon onClick={handleFilter}/> </StyledTableCell>
              <StyledTableCell align="left"> QUALIFICATION</StyledTableCell>
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
      
    </div>
  </div>
  );
}
