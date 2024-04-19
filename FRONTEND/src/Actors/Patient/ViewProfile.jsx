import React ,{useEffect,useState}from 'react';
import { Box} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CustomButton from '../../Components/Button';
import Navbar from '../../Components/Navbar';
import Profile from '../../Images/icon1.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export default function ViewProfile() {
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState([]);
  const navigate = useNavigate();
 /* useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:9191/api/v1/admin/findUser/ByEmail', {
          email: "ketki@gmail.com" // Provide the email you want to search for
        });
    
        // Check if response data is not null or undefined before setting state
        if (response.data) {
          setUserData(response.data);
          setError(null);
          console.log(response.data);
         
        } else {
          // Handle case where response data is null or undefined
          setError('User data not found');
          setUserData(null);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
        // Handle error, show a message to the user maybe
      }
    };
  
    fetchData();
  }, []);


  const handleDeleteUser = async () => {
    // Delete user logic here
    try {
      const response = await axios.put('http://localhost:9191/api/v1/admin/delete-user', {
        email: "ketki@gmail.com" // Provide the email of the doctor to be deleted
      });
      navigate('/admin');
      // Handle successful response, maybe update UI or show a success message
      console.log(response.data);
    } catch (error) {
      console.error('Error disabling doctor:', error);
      // Handle error, show a message to the user maybe
    }
   
  };*/

  return (
    <div>
        <Navbar userRole ="patient"/>
    
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
                        {userData && userData.doctors && userData.doctors.length > 0 ? userData.doctors[0].dname: 'N/A'}
                        
                    </Box>
                    </div>                
                <Box bgcolor="white" sx={{ marginBottom:'7vh',marginTop:'2vh',height: '40vh', width: '90%', borderRadius: '1vw',fontFamily: 'Quicksand, sans-serif',
                      fontSize: '1.3vw'}}>
                <div style={{ textAlign: 'left',marginLeft:'3vw',marginBottom:'3vh',marginTop:'3vh' }}>
                <p> <ChevronRightIcon /> User Id : {userData && userData.patients && userData.patients.length > 0 ? userData.patients[0].name: 'N/A'}</p>
                <p><ChevronRightIcon />  Patient Name : {userData && userData.patients && userData.patients.length > 0 ? userData.doctors[0].dtype : 'N/A'}</p>
            <p><ChevronRightIcon /> Age : {userData && userData.patients && userData.patients.length > 0 ? userData.doctors[0].dtype : 'N/A'}</p>
            <p><ChevronRightIcon /> Gender: {userData && userData.patients && userData.patients.length > 0 ? userData.doctors[0].qualification : 'N/A'}</p>
            <p><ChevronRightIcon /> Contact: {userData && userData.patients && userData.patients.length > 0 ? userData.doctors[0].contact : 'N/A'}</p>
            <p><ChevronRightIcon /> Date Of Birth: {userData && userData.patients && userData.patients.length > 0 ? userData.patients[0].dateOfBirth : 'N/A'}</p>
            <p><ChevronRightIcon /> Email Id: {userData && userData.email}</p>
            <p><ChevronRightIcon /> Registration Date : {userData && userData.patients && userData.patients.length > 0 ? userData.patients[0].dateOfRegistration : 'N/A'}</p>
            
          </div>
                </Box>
            </Box>

            
    </div>
    </div>
  )
}