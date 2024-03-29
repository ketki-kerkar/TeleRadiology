import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { FaUserDoctor } from "react-icons/fa6";
import { TbReportSearch } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import DraftsIcon from '@mui/icons-material/Drafts';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { BsPeopleFill } from "react-icons/bs";
import { PiNotebookBold } from "react-icons/pi";

export const SidebarData = {
  admin: [
    {
      title: 'Home',
      path: '/admin',
      icon: <HomeIcon />,
      cName: 'nav-text'
    },
    {
      title: 'Doctor',
      path: '/admin/listDoctor', 
      icon: <FaUserDoctor style={{ color: 'black' }} />,
      cName: 'nav-text'
    },
    {
      title: 'Receptionist',
      path: '/admin/listReceptionist',
      icon: <HowToRegIcon />,
      cName: 'nav-text'
    },
    {
      title: 'Lab',
      path: '/admin/listLab',
      icon: <TbReportSearch style={{ color: 'black' }} />,
      cName: 'nav-text'
    },
    {
      title: 'User Requests',
      path: '/',
      icon: <FaRegUser style={{ color: 'black' }} />,
      cName: 'nav-text'
    },
  ],
  doctor: [
    {
      title: 'Home',
      path: '/',
      icon: <HomeIcon />,
      cName: 'nav-text'
    },
    {
      title: 'Patients',
      path: '/doctor', // Corrected path
      icon: <PersonAddAltIcon style={{ color: 'black' }} />,
      cName: 'nav-text'
    },
    {
      title: 'Doctors',
      path: '/',
      icon: <FaUserDoctor style={{ color: 'black' }} />,
      cName: 'nav-text'
    },
    {
      title: 'Reports',
      path: '/',
      icon: <TbReportSearch />,
      cName: 'nav-text'
    },
    {
      title: 'View Invitations',
      path: '/',
      icon: <DraftsIcon style={{ color: 'black' }} />,
      cName: 'nav-text'
    },
  ],
  lab: [
    {
      title: 'Home',
      path: '/',
      icon: <HomeIcon />,
      cName: 'nav-text'
    },
    {
      title: 'Reports',
      path: '/',
      icon: <TbReportSearch />,
      cName: 'nav-text'
    },

  ],
  receptionist: [
    {
      title: 'Home',
      path: '/',
      icon: <HomeIcon />,
      cName: 'nav-text'
    },
    {
      title: 'Register Patient',
      path: '/receptionist/addPatient',
      icon: <BsPeopleFill/>,
      cName: 'nav-text'
    },
    {
      title: 'New Case',
      path: '/',
      icon: <PiNotebookBold />,
      cName: 'nav-text'
    },


  ],
  radiologist:[
    {
      title: 'Home',
      path: '/',
      icon: <HomeIcon />,
      cName: 'nav-text'
    },
    

  ]
};