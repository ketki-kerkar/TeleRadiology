import React from 'react';
import './App.css';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import LoginComponent from './Components/LoginComponent/LoginComponent';
import AdminHome from './Actors/Admin/AdminHome';
import DoctorHome from './Actors/Doctor/DoctorHome'
import AddDoctor from './Actors/Admin/AddDoctor';
import ListDoctor from './Actors/Admin/ListDoctor';
import AddLab from './Actors/Admin/AddLab';
import AddReceptionist from './Actors/Admin/AddReceptionist'
import AddPatient from './Actors/Receptionist/AddPatient';
import ViewDoctor from './Actors/Admin/ViewDoctor';
import ViewHospital from './Actors/Admin/ViewHospital';
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

import PatientHome from './Actors/Patient/PatientHome';
import ViewCase from './Actors/Patient/ViewCase';
import ViewProfile from './Actors/Patient/ViewProfile';
import ViewPolicy from './Actors/Patient/ViewPolicy';
import LaunchComplaint from './Actors/Patient/LaunchComplaint';
import ForgetPassword from './Components/ForgetPassword';
import CreateCase from './Actors/Receptionist/CreateCase';
import OTPgen from './Components/OTPgen';
import NewPassAfterOtp from './Components/NewPassAfterOtp';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
      <Route exact path='/' element={<LoginComponent/>} />
      <Route exact path='/admin' element={<AdminHome/>} />
      <Route path='/doctor' element={<DoctorHome/>} />
      <Route path='/lab' element={<LabHome/>}/>
      <Route path='/receptionist' element={<ReceptionistHome/>}/>
      <Route path='/radiologist' element={<RadiologistHome/>}/>
      <Route path='/admin/listDoctor/addDoctor' element={<AddDoctor/>} />
      <Route path='/admin/listDoctor' element={<ListDoctor/>} />
      <Route path='/admin/listLab' element = {<ListLab/>}/>
      <Route path='/admin/listReceptionist' element = {<ListReceptionist/>}/>
      <Route path='/admin/listLab/addLab' element={<AddLab/>}/>
      <Route path='/admin/listReceptionist/addReceptionist' element={<AddReceptionist/>}/>
      <Route path='/receptionist/addpatient' element={<AddPatient/>}/>
      <Route path='/admin/viewDoctor' element={<ViewDoctor/>} />
      <Route path='/admin/viewHospital' element={<ViewHospital/>} />
      <Route path='/admin/viewLab' element={<ViewLab/>} />
      <Route path='/lab/changePassword' element={<ChangePassword userRole="lab"/>}/>
      <Route path='/admin/changePassword' element={<ChangePassword userRole="admin"/>}/>
      <Route path='/doctor/changePassword' element={<ChangePassword userRole="doctor"/>}/>
      <Route path='/radiologist/changePassword' element={<ChangePassword userRole="radiologist"/>}/>
      <Route path='/receptionist/changePassword' element={<ChangePassword userRole="receptionist"/>}/>
      <Route path='/lab/upload' element={<Upload/>}/>
      <Route path='/doctor/ViewPatient' element={<PatientDetails/>}/>
      <Route path='/receptionist/newCase' element={<CreateCase/>}/>
      
      <Route path='/patient' element={<PatientHome/>}/>
      <Route path='/patient/viewCase' element={<ViewCase/>}/>
      <Route path='/patient/viewProfile' element={<ViewProfile/>}/>
      <Route path='/patient/viewPolicy' element={<ViewPolicy/>}/> 
      <Route path='/patient/launchComplaint' element={<LaunchComplaint/>}/>
      <Route path='/otpGen' element={<OTPgen/>}/>
      <Route path='/newPass' element={<NewPassAfterOtp/>}/>
      
      </Routes>
      </Router>
    </div>
  );
}
export default App;
