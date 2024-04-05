import React,{useEffect,useState}  from 'react';
import { Box } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CustomButton from '../../Components/Button';
import Navbar from '../../Components/Navbar';
import Profile from '../../Images/icon1.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ViewHospital() {
  const [hospitalData, setHospitalData] = useState([]);
  const [error, setError] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchHospitalData();
  }, []);

  const fetchHospitalData = async () => {
    try {
      const response = await axios.post('http://localhost:9191/api/v1/admin/findUser/ByEmail', {
        email: 'godeanuja5@gmail.com' // Provide the email you want to search for
      });
      setHospitalData(response.data);
      console.log(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching hospital data:', error);
      setError('Failed to fetch hospital data');
      setHospitalData(null);
    }
  };

  const handleDeleteUser = async () => {
    // Delete user logic here
    try {
      const response = await axios.put('http://localhost:9191/api/v1/admin/delete-user', {
        email: "godeanuja5@gmail.com" // Provide the email of the doctor to be deleted
      });
      navigate('/admin');
      // Handle successful response, maybe update UI or show a success message
      console.log(response.data);
    } catch (error) {
      console.error('Error disabling doctor:', error);
      // Handle error, show a message to the user maybe
    }
   
  };





  return (
    <div>
        <Navbar userRole ="admin"/>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

               <Box color="black"
                borderColor='#9ACEFF' bgcolor="#F0F7F9" p={1} sx={{display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                  height: '70vh', width: '37%', borderRadius: '16px',
                  border: '0.2vw solid #9ACEFF',
                  }} >
                  <div style={{ display: 'flex', flexDirection: 'row',justifyContent: 'center',alignItems: 'center', width: '100%', marginTop:'2vh',marginBottom:'2vh'}}>
                    <Box  bgcolor="#f0f0e7" sx={{height:'19vh',width:'8.8vw',borderRadius:'50%', border: '0.01vw solid black',marginRight:'1vw'}}>
                    </Box>

                    <Box alignSelf='center' color='black' bgcolor='#D1EEF2' sx={{marginLeft:'1vw',display: 'flex',justifyContent: 'center', alignItems: 'center', height:'9vh',width:'15vw',borderRadius:'1vw', border: '0.1vw solid #6CC4BF',fontFamily: 'Quicksand, sans-serif',
                       fontSize: '1.3vw',}}>
                        <img src={Profile} style={{ marginRight: '10px', width: '24px', height: '24px' }} alt='Profile'/>
                        {hospitalData && hospitalData.hospitalHandles && hospitalData.hospitalHandles.length > 0 ? hospitalData.hospitalHandles[0].hospitalName : 'N/A'}
                    </Box>
                    </div>                
                <Box bgcolor="white" sx={{ marginBottom:'7vh',marginTop:'2vh',height: '40vh', width: '90%', borderRadius: '1vw',fontFamily: 'Quicksand, sans-serif',
                      fontSize: '1.3vw'}}>
                <div style={{ textAlign: 'left',marginLeft:'3vw',marginBottom:'3vh',marginTop:'3vh' }}>
            <p> <ChevronRightIcon /> Id: 454748bfjeejd9</p>
            <p><ChevronRightIcon /> Hospital name:  {hospitalData && hospitalData.hospitalHandles && hospitalData.hospitalHandles.length > 0 ? hospitalData.hospitalHandles[0].hospitalName : 'N/A'}</p>
            <p><ChevronRightIcon /> Email Id: {hospitalData && hospitalData.email}</p>
            
          </div>
                </Box>
            </Box>
            <CustomButton onClick={handleDeleteUser}/>
    </div>
    </div>
    
  )
}