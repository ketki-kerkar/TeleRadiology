import React from 'react';
import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import LoginComponent from './Components/LoginComponent/LoginComponent';
import AdminHome from './Actors/Admin/AdminHome';
import DoctorHome from './Actors/Doctor/DoctorHome'
import AddDoctor from './Actors/Admin/AddDoctor';
import ListDoctor from './Actors/Admin/ListDoctor';
import AddLab from './Actors/Admin/AddLab';
import AddReceptionist from './Actors/Admin/AddReceptionist'
import AddPatient from './Actors/Receptionist/AddPatient';
import ViewDoctor from './Actors/Admin/ViewDoctor';
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
import Unauthorized from './Components/Unauthorized';
import { useState, useEffect } from "react";
import { LoggedInUserContext } from './Context/LoggedInUserContext';
import ViewProfile from './Actors/Patient/ViewProfile';
import ViewCase from './Actors/Patient/ViewCase';
import PatientHome from './Actors/Patient/PatientHome';
import LaunchComplaint from './Actors/Patient/LaunchComplaint';
import ViewPolicy from './Actors/Patient/ViewPolicy';
import Consent from './Actors/Patient/Consent';
import OTPgen from './Components/OTPgen';
import NewPassAfterOtp from './Components/NewPassAfterOtp';
import Invitations from './Actors/Radiologist/Invitations';
import OHIFRadiologist from './Actors/Radiologist/OHIFRadiologist';
import UnitCases from './Actors/Patient/UnitCases';
import OHIF from './Actors/Doctor/OHIF';
import Notifications from './Actors/Doctor/Notification';
import DiagnosisForm from './Actors/Doctor/DiagnosisForm';
import InviteDoctorsList from './Actors/Doctor/InviteDoctorsList';

function App() {
  const [loggedinUser, setLoggedinUser] = useState({
    token: null,
    user: {},
    role: null,
  });
  
  useEffect(() => {
    
  }, []);


  const role = loggedinUser.role;
  const token =loggedinUser.token;
  console.log(token, role);

  const ProtectedRoute = ({ children, pathRole }) => {
  
    if (!role) {
      return <Navigate to="/login" />;
    } else if (role === pathRole) {
      return children; 
    } else {
      alert("Cannot navigate to this page");
      const to = `/${role}`;
      return <Navigate to={to} />; 
    }
  };

  return (
    <div className="App">
    <LoggedInUserContext.Provider value={{ loggedinUser, setLoggedinUser }}>
      <Routes>
      <Route path = "/" element={<Navigate to='/login' exact /> }/>
      <Route path='/login' element={<LoginComponent/>} />
      <Route path='/forgotpassword' element={<ForgotPassword/>}/>
      <Route path='/unauthorized' element={<Unauthorized/>}/>
      <Route path="/otpGen" element={<OTPgen/>}/>
      <Route path="/newPass" element={<NewPassAfterOtp/>}/>

          {/* Admin Routes */}
             <>
                <Route exact path="/admin" element={ <ProtectedRoute pathRole="admin"> <AdminHome /> </ProtectedRoute> }/>
                <Route path="/admin/listDoctor/addDoctor" element={ <ProtectedRoute pathRole="admin"> <AddDoctor /> </ProtectedRoute> } />
                <Route path="/admin/listDoctor" element={ <ProtectedRoute pathRole="admin"> <ListDoctor /> </ProtectedRoute> } />
                <Route path="/admin/listLab" element={ <ProtectedRoute pathRole="admin"> <ListLab /> </ProtectedRoute> } />
                <Route path="/admin/listReceptionist" element={ <ProtectedRoute pathRole="admin"> <ListReceptionist /> </ProtectedRoute> } />
                <Route path="/admin/listReceptionist/viewReceptionist" element={ <ProtectedRoute pathRole="admin"> <ViewReceptionist /> </ProtectedRoute> } />
                <Route path="/admin/listLab/addLab" element={ <ProtectedRoute pathRole="admin"> <AddLab /> </ProtectedRoute> } />
                <Route path="/admin/listReceptionist/addReceptionist" element={ <ProtectedRoute pathRole="admin"> <AddReceptionist /> </ProtectedRoute> } />
                <Route path="/admin/listDoctor/viewDoctor" element={ <ProtectedRoute pathRole="admin"> <ViewDoctor /> </ProtectedRoute> } />
                <Route path="/admin/listLab/viewLab" element={ <ProtectedRoute pathRole="admin"> <ViewLab /> </ProtectedRoute> } />
                <Route path="/admin/changePassword" element={ <ProtectedRoute pathRole="admin"> <ChangePassword userRole="admin" /> </ProtectedRoute> } />
                <Route path="/admin/userRequests" element={ <ProtectedRoute pathRole="admin"> <UserRequests /> </ProtectedRoute> } />
              </>

            {/* Doctor Routes */}
              <>
                <Route exact path="/doctor" element={ <ProtectedRoute pathRole="doctor"> <DoctorHome /> </ProtectedRoute> } />
                <Route path="/doctor/changePassword" element={ <ProtectedRoute pathRole="doctor"> <ChangePassword userRole="doctor" /> </ProtectedRoute> } />
                <Route path="/doctor/ViewPatient" element={ <ProtectedRoute pathRole="doctor"> <PatientDetails /> </ProtectedRoute> } />
                <Route path="/doctor/listPatients" element={ <ProtectedRoute pathRole="doctor"> <ListPatients /> </ProtectedRoute> } />
                <Route path="/doctor/listPatients/patientdetails" element={ <ProtectedRoute pathRole="doctor"> <PatientDetails /> </ProtectedRoute> } />
                <Route path="/doctor/listDoctors" element={ <ProtectedRoute pathRole="doctor"> <ListDoctors /> </ProtectedRoute> } />
                <Route path="/doctor/listPatients/patientDetails/invite" element={ <ProtectedRoute pathRole="doctor"> <InviteDoctorsList /> </ProtectedRoute> } />
                <Route path="/doctor/notifications" element={ <ProtectedRoute pathRole="doctor"> <Notifications /> </ProtectedRoute> } />
                <Route path="/doctor/listPatients/patientdetails/reports" element={ <ProtectedRoute pathRole="doctor"> <OHIF /> </ProtectedRoute> } />
                <Route path="/doctor/diagnosis" element={ <ProtectedRoute pathRole="doctor"> <DiagnosisForm /> </ProtectedRoute> } />

              </>

            {/* Lab Routes */}
              <>
                <Route exact path="/lab" element={<ProtectedRoute pathRole="lab"><LabHome /></ProtectedRoute>} />
                <Route path="/lab/changePassword" element={<ProtectedRoute pathRole="lab"><ChangePassword userRole="lab" /></ProtectedRoute>} />
                <Route path="/lab/upload" element={<ProtectedRoute pathRole="lab"><Upload /></ProtectedRoute>} />
              </>

            {/* Receptionist Routes */}
              <>
                <Route exact path="/receptionist" element={<ProtectedRoute pathRole="receptionist"><ReceptionistHome /></ProtectedRoute>} />
                <Route path="/receptionist/addpatient" element={<ProtectedRoute pathRole="receptionist"><AddPatient /></ProtectedRoute>} />
                <Route path="/receptionist/changePassword" element={<ProtectedRoute pathRole="receptionist"><ChangePassword userRole="receptionist" /></ProtectedRoute>}/>
                <Route path="/receptionist/newCase" element={<ProtectedRoute pathRole="receptionist"><CreateCase /></ProtectedRoute>} />
              </>

            {/* Radiologist Routes */}
              <>
                <Route exact path="/radiologist" element={<ProtectedRoute pathRole="radiologist"><RadiologistHome /></ProtectedRoute>} />
                <Route path="/radiologist/changePassword" element={<ProtectedRoute pathRole="radiologist"><ChangePassword userRole="radiologist" /></ProtectedRoute>} />
                <Route path="radiologist/ohifRadilogist" element={<ProtectedRoute pathRole="radiologist"><OHIFRadiologist /></ProtectedRoute>} /> 
                <Route path='/radiologist/viewInvitations' element={<ProtectedRoute pathRole="radiologist"><Invitations/></ProtectedRoute>}/>
              </>

            {/* Patient Routes */}
            <>
                  <Route path="/patient" element={<ProtectedRoute pathRole="patient"><PatientHome /></ProtectedRoute>} />
                  <Route path="/patient/viewCase" element={<ProtectedRoute pathRole="patient"><ViewCase/></ProtectedRoute>} />
                  <Route path="/patient/viewCase/unitCases" element={<ProtectedRoute pathRole="patient"><UnitCases /></ProtectedRoute>} />
                  <Route path="/patient/viewProfile" element={<ProtectedRoute pathRole="patient"><ViewProfile/></ProtectedRoute>} />
                  <Route path="/patient/viewPolicy" element={<ProtectedRoute pathRole="patient"><ViewPolicy/></ProtectedRoute>} />
                  <Route path="/patient/launchComplaint" element={<ProtectedRoute pathRole="patient"><LaunchComplaint/></ProtectedRoute>} />
                  <Route path='/patient/changePassword' element={<ProtectedRoute pathRole="patient"><ChangePassword userRole="patient"/></ProtectedRoute>}/>
                  <Route path="/patient/consent" element={<ProtectedRoute pathRole="patient"><Consent/></ProtectedRoute>}/>  
            </>
          </Routes>
          </LoggedInUserContext.Provider>
          </div>
  );
}
export default App; 