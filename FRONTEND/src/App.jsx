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

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
      <Route exact path='/' element={<LoginComponent/>} />
      <Route exact path='/admin' element={<AdminHome/>} />
      <Route path='/doctor' element={<DoctorHome/>} />
      <Route path='lab' element={<LabHome/>}/>
      <Route path='/admin/listDoctor/addDoctor' element={<AddDoctor/>} />
      <Route path='/admin/listDoctor' element={<ListDoctor/>} />
      <Route path='/admin/listLab' element = {<ListLab/>}/>
      <Route path='admin/listReceptionist' element = {<ListReceptionist/>}/>
      <Route path='/admin/listLab/addLab' element={<AddLab/>}/>
      <Route path='/admin/listReceptionist/addReceptionist' element={<AddReceptionist/>}/>
      <Route path='/receptionist/addpatient' element={<AddPatient/>}/>
      <Route path='/admin/viewDoctor' element={<ViewDoctor/>} />
      <Route path='/admin/viewHospital' element={<ViewHospital/>} />
      <Route path='/admin/viewLab' element={<ViewLab/>} />
      <Route path='/lab/upload' element={<Upload/>}/>
      </Routes>
      </Router>
    </div>
  );
}
export default App;