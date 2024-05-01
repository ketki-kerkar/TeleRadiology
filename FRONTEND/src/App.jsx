import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginComponent from "./Components/LoginComponent/LoginComponent";
import AdminHome from "./Actors/Admin/AdminHome";
import DoctorHome from "./Actors/Doctor/DoctorHome";
import AddDoctor from "./Actors/Admin/AddDoctor";
import ListDoctor from "./Actors/Admin/ListDoctor";
import AddLab from "./Actors/Admin/AddLab";
import AddReceptionist from "./Actors/Admin/AddReceptionist";
import AddPatient from "./Actors/Receptionist/AddPatient";
import ViewDoctor from "./Actors/Admin/ViewDoctor";
import ViewHospital from "./Actors/Admin/ViewReceptionist";
import ViewLab from "./Actors/Admin/ViewLab";
import ViewRequestDel from "./Actors/Admin/ViewRequestDel";
import LabHome from "./Actors/Lab/LabHome";
import ListLab from "./Actors/Admin/ListLab";
import ListReceptionist from "./Actors/Admin/ListReceptionist";
import Upload from "./Actors/Lab/UploadReports";
import ReceptionistHome from "./Actors/Receptionist/ReceptionistHome";
import RadiologistHome from "./Actors/Radiologist/RadiologistHome";
import PatientDetails from "./Actors/Doctor/PatientDetails";
import ChangePassword from "./Components/LoginComponent/ChangePassword";
import CreateCase from "./Actors/Receptionist/CreateCase";
import ListPatients from "./Actors/Doctor/ListPatients";
import ListDoctors from "./Actors/Doctor/ListDoctors";
import ForgotPassword from "./Components/ForgotPassword";
import UserRequests from "./Actors/Admin/UserRequests";
import ViewReceptionist from "./Actors/Admin/ViewReceptionist";
import { useState, useEffect } from "react";
import { LoggedInUserContext } from "./Context/LoggedInUserContext";

import PatientHome from "./Actors/Patient/PatientHome";
import ViewCase from "./Actors/Patient/ViewCase" ;
import ViewPolicy from "./Actors/Patient/ViewPolicy" ;
import ViewProfile from "./Actors/Patient/ViewProfile" ;
import UnitCases from "./Actors/Patient/UnitCases" ;
import OTPgen from "./Components/OTPgen";
import NewPassAfterOtp from "./Components/NewPassAfterOtp";
import LaunchComplaint from "./Actors/Patient/LaunchComplaint";
import Invitations from "./Actors/Radiologist/Invitations";
import Notifications from "./Actors/Radiologist/Invitations";

function App() {
  const data = JSON.parse(window.sessionStorage.getItem("loggedInUser"));
  const [loggedinUser, setLoggedinUser] = useState({
    token: null,
    user: {},
    role: null,
  });
  
  useEffect(() => {
    
  }, []);

  const role = data?.role;

  const ProtectedRoute = ({ children, pathRole }) => {
    console.log("role", pathRole)
    if (role === null) {
      return <Navigate to="/" />;
    } else if (role === pathRole) {
      return children;
    } else {
      alert("Cannot navigate to this page");
      const to=`/${role}`
      return <Navigate to={to} />;
    }
  };

  return (
    <div className="App">
      <LoggedInUserContext.Provider value={{ loggedinUser, setLoggedinUser }}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<LoginComponent />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/login" element={<LoginComponent/>}/>
            <Route path="/invitations" element={<Invitations/>}/>
            <Route path="/notifications" element={<Notifications/>}/>
            
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
                <Route path="/admin/viewHospital" element={ <ProtectedRoute pathRole="admin"> <ViewHospital /> </ProtectedRoute> } />
                <Route path="/admin/listLab/viewLab" element={ <ProtectedRoute pathRole="admin"> <ViewLab /> </ProtectedRoute> } />
                <Route path="/admin/changePassword" element={ <ProtectedRoute pathRole="admin"> <ChangePassword /> </ProtectedRoute> } />
                <Route path="/admin/userRequests" element={ <ProtectedRoute pathRole="admin"> <UserRequests /> </ProtectedRoute> } />
                <Route path="/admin/userRequests/viewrequestDel" element={<ProtectedRoute pathRole="admin"> <ViewRequestDel/> </ProtectedRoute>} />
              </>

            {/* Doctor Routes */}
              <>
                <Route exact path="/doctor" element={ <ProtectedRoute pathRole="doctor"> <DoctorHome /> </ProtectedRoute> } />
                <Route path="/doctor/changePassword" element={ <ProtectedRoute pathRole="doctor"> <ChangePassword userRole="doctor" /> </ProtectedRoute> } />
                <Route path="/doctor/ViewPatient" element={ <ProtectedRoute pathRole="doctor"> <PatientDetails /> </ProtectedRoute> } />
                <Route path="/doctor/listPatients" element={ <ProtectedRoute pathRole="doctor"> <ListPatients /> </ProtectedRoute> } />
                <Route path="/doctor/listPatients/patientdetails" element={ <ProtectedRoute pathRole="doctor"> <PatientDetails /> </ProtectedRoute> } />
                <Route path="/doctor/listDoctors" element={ <ProtectedRoute pathRole="doctor"> <ListDoctors /> </ProtectedRoute> } />
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
              </>

            {/* Patient Routes */}
            <>
                <Route exact path="/patient" element={<ProtectedRoute pathRole="patient"><PatientHome /></ProtectedRoute>} />
                <Route path="/patient/viewCase" element={<ProtectedRoute pathRole="patient"><ViewCase userRole="patient" /></ProtectedRoute>} />
                <Route path="/patient/viewCase/unitCases" element={<ProtectedRoute pathRole="patient"><UnitCases userRole="patient" /></ProtectedRoute>} />
                <Route path="/patient/viewProfile" element={<ProtectedRoute pathRole="patient"><ViewProfile/></ProtectedRoute>} />
                <Route path="/patient/viewPolicy" element={<ProtectedRoute pathRole="patient"><ViewPolicy/></ProtectedRoute>} />
                <Route path="/patient/launchComplaint" element={<ProtectedRoute pathRole="patient"><LaunchComplaint/></ProtectedRoute>} />
                <Route path="/otpGen" element={<OTPgen/>}/>
                <Route path="/newPass" element={<NewPassAfterOtp/>}/>
                <Route path="/patient/changePassword" element={ <ProtectedRoute pathRole="patient"> <ChangePassword /> </ProtectedRoute> } />
              </>
              
          </Routes>
        </BrowserRouter>
      </LoggedInUserContext.Provider>
    </div>
  );
}

export default App;
