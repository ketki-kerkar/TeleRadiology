import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChatRoom from '../../Components/ChatRoom';
import Navbar from '../../Components/Navbar';
import { useNavigate } from 'react-router-dom'; 
import { useContext } from 'react';
import { LoggedInUserContext } from '../../Context/LoggedInUserContext';

const OHIF = () => {
  const { loggedinUser } = useContext(LoggedInUserContext);
  const authToken = loggedinUser.token;
  const [jsonUrl, setJsonUrl] = useState('');
  const [caseId, setCaseId] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9191/api/v1/doctor/get-json-aws-url', {
          params: {
            caseId: 1
          },
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        setJsonUrl(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching JSON URL:', error);
      }
    };

    fetchData();
  }, [caseId]);

  const handleAddDiagnosis = () => {
    console.log('Add Diagnosis button clicked!');
    navigate('/doctor/diagnosis', { state: { caseId: caseId } });
  };

  const handleAnotherAction = () => {
    console.log('Another Action button clicked!');
    navigate('/doctor/listPatients/patientDetails/invite', { state: { caseId: caseId } })
  };

  return (
    <div style={{ background: '#FFFFFF', overflow: 'hidden' }}>
      <Navbar userRole="doctor"/>
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', position: 'relative' }}>
        <div style={{ width: '50vw', height: '70%', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '70vh', background: '#FFFFFF', overflow: 'hidden' }}>
            <ChatRoom />
          </div>
          <div style={{ position: 'absolute', bottom: '0px', left: '20px' }}>
            <button 
              style={{ padding: '10px 20px', borderRadius: '5px', background: '#1976d2', marginLeft:'160px',marginRight:'50px',color: '#fff', border: 'none', marginRight: '10px' }}
              onClick={handleAddDiagnosis}
            >
              Add Final Diagnosis
            </button>
            <button 
              style={{ padding: '10px 20px', borderRadius: '5px', background: '#1976d2', color: '#fff', border: 'none' }}
              onClick={handleAnotherAction}
            >
              Add Radiologist
            </button>
          </div>

          
        </div>  
        
        <div style={{ flex: '1', overflow: 'hidden' }}>
          <iframe
            title="OHIF"
            src={jsonUrl}
            style={{ width: '100%', height: '100%', border: 'none', marginRight: '1%', overflow: 'hidden' }}
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default OHIF;
