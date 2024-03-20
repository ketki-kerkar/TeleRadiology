import React from 'react';
import './DoctorHome.css';

import Navbar from '../../Components/Navbar';

export default function DoctorHome() {
  return (
    <body className='this-div'>
      <Navbar userRole = "doctor"/>
      <h1>WELCOME DOCTOR!</h1> 
    </body>
  );
}