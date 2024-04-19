import React from 'react';
import './App.css';
import { BrowserRouter as Router,Route, Routes, Navigate} from 'react-router-dom';
import LoginComponent from './Components/LoginComponent/LoginComponent';
import AdminHome from './Actors/Admin/AdminHome';
import DoctorHome from './Actors/Doctor/DoctorHome'
import AddDoctor from './Actors/Admin/AddDoctor';
import ListDoctor from './Actors/Admin/ListDoctor';
import AddLab from './Actors/Admin/AddLab';
import AddReceptionist from './Actors/Admin/AddReceptionist'
import AddPatient from './Actors/Receptionist/AddPatient';
import ViewDoctor from './Actors/Admin/ViewDoctor';
import ViewHospital from './Actors/Admin/ViewReceptionist';
import ViewLab from './Actors/Admin/ViewLab';
import LabHome from './Actors/Lab/LabHome';
import ListLab from './Actors/Admin/ListLab';
import ListReceptionist from './Actors/Admin/ListReceptionist';
import Upload from './Actors/Lab/UploadReports';
import ReceptionistHome from './Actors/Receptionist/ReceptionistHome';
import RadiologistHome from './Actors/Radiologist/RadiologistHome';
import PatientDetails from './Actors/Doctor/PatientDetails'
import ChangePassword from './Components/LoginComponent/ChangePassword';
import CreateCase from './Actors/Receptionist/CreateCase';
import ListPatients from './Actors/Doctor/ListPatients';
import ListDoctors from './Actors/Doctor/ListDoctors';
import ForgotPassword from './Components/ForgotPassword';
import UserRequests from './Actors/Admin/UserRequests';
import ViewReceptionist from './Actors/Admin/ViewReceptionist';
import { useState, useEffect } from 'react';
import { isAuthenticated } from './Utils/Auth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const loggedIn = isAuthenticated();
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      const loggedInUser = JSON.parse(window.sessionStorage.getItem('loggedInUser'));
      setUserRole(loggedInUser.role);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Redirect to login if not logged in */}
          {!isLoggedIn && <Route path="*" element={<Navigate to="/" />} />}

          {/* Login Route */}
          <Route exact path="/" element={<LoginComponent />} />

          {/* Admin Routes */}
          {isLoggedIn && (userRole === 'admin' || userRole === 'superadmin') && (
            <>
              <Route exact path="/admin" element={<AdminHome />} />
               <Route path='/admin/listDoctor/addDoctor' element={<AddDoctor/>} />
      	       <Route path='/admin/listDoctor' element={<ListDoctor/>} />
      	       <Route path='/admin/listLab' element = {<ListLab/>}/>
               <Route path='/admin/listReceptionist' element = {<ListReceptionist/>}/>
               <Route path='/admin/listReceptionist/viewReceptionist' element = {<ViewReceptionist/>}/>
               <Route path='/admin/listLab/addLab' element={<AddLab/>}/>
               <Route path='/admin/listReceptionist/addReceptionist' element={<AddReceptionist/>}/>
               <Route path='/admin/listDoctor/viewDoctor' element={<ViewDoctor/>} />
               <Route path='/admin/viewHospital' element={<ViewHospital/>} />
               <Route path='/admin/listLab/viewLab' element={<ViewLab/>} />
               <Route path='/admin/changePassword' element={<ChangePassword userRole="admin"/>}/>
               <Route path='/admin/userRequests' element={<UserRequests/>}/>
              
            </>
          )}

          {/* Doctor Routes */}
          {isLoggedIn && userRole === 'doctor' && (
            <>
              <Route exact path="/doctor" element={<DoctorHome />} />
              <Route path='/doctor/changePassword' element={<ChangePassword userRole="doctor"/>}/>
              <Route path='/doctor/ViewPatient' element={<PatientDetails/>}/>
              <Route path='/doctor/listPatients' element={<ListPatients/>} />
              <Route path='/doctor/listPatients/patientdetails' element={<PatientDetails/>} />
              <Route path='/doctor/listDoctors' element={<ListDoctors/>} />
              
            </>
          )}

          {/* Lab Routes */}
          {isLoggedIn && userRole === 'lab' && (
            <>
              <Route exact path="/lab" element={<LabHome />} />
              <Route path='/lab/changePassword' element={<ChangePassword userRole="lab"/>}/>
              <Route path='/lab/upload' element={<Upload/>}/>
              
            </>
          )}

          {/* Receptionist Routes */}
          {isLoggedIn && userRole === 'receptionist' && (
            <>
              <Route exact path="/receptionist" element={<ReceptionistHome />} />
              <Route path='/receptionist/addpatient' element={<AddPatient/>}/>
              <Route path='/receptionist/changePassword' element={<ChangePassword userRole="receptionist"/>}/>
              <Route path='/receptionist/newCase' element={<CreateCase/>}/>
              
            </>
          )}

          {/* Radiologist Routes */}
          {isLoggedIn && userRole === 'radiologist' && (
            <>
              <Route exact path="/radiologist" element={<RadiologistHome />} />
              <Route path='/radiologist/changePassword' element={<ChangePassword userRole="radiologist"/>}/>
              
            </>
          )}

        </Routes>
      </Router>
    </div>
  );
}

export default App;
