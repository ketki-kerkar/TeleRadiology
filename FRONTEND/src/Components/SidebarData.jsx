import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import DraftsIcon from '@mui/icons-material/Drafts';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PeopleIcon from '@mui/icons-material/People';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LogoutIcon from '@mui/icons-material/Logout';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import './Navbar.css';


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
      icon: <LocalHospitalIcon/>,
      cName: 'nav-text'
    },
    {
      title: 'Receptionist',
      path: '/admin/listReceptionist',
      icon: <PersonalVideoIcon/>,
      cName: 'nav-text'
    },
    {
      title: 'Lab',
      path: '/admin/listLab',
      icon: <ReceiptIcon/>,
      cName: 'nav-text'
    },
    {
      title: 'User Requests',
      path: '/admin/userRequests',
      icon: <PersonPinIcon/>,
      cName: 'nav-text'
    },
    {
      title: 'Change Password',
      path: '/admin/changePassword',
      icon: <LockOpenIcon/>,
      cName: 'nav-text'
    },
    {
      title: 'Logout',
      path: '/',
      icon: <LogoutIcon className="icon-hover"/>,
      cName: 'nav-text'
    },
  ],
  doctor: [
    {
      title: 'Home',
      path: '/doctor',
      icon: <HomeIcon className="icon-hover"/>,
      cName: 'nav-text'
    },
    {
      title: 'Patients',
      path: '/doctor/listPatients', 
      icon: <PersonAddAltIcon className="icon-hover"/>,
      cName: 'nav-text'
    },
    {
      title: 'Doctors',
      path: '/doctor/listDoctors',
      icon: <LocalHospitalIcon/>,
      cName: 'nav-text'
    },
    {
      title: 'Reports',
      path: '/doctor/',
      icon: <ReceiptIcon/>,
      cName: 'nav-text'
    },
    {
      title: 'View Invitations',
      path: '/doctor/viewInvitations',
      icon: <DraftsIcon className="icon-hover" />,
      cName: 'nav-text'
    },
    {
      title: 'Change Password',
      path: '/doctor/changePassword',
      icon: <LockOpenIcon/>,
      cName: 'nav-text'
    },
    {
      title: 'Logout',
      path: '/',
      icon: <LogoutIcon className="icon-hover" />,
      cName: 'nav-text'
    },
  ],
  lab: [
    {
      title: 'Home',
      path: '/lab',
      icon: <HomeIcon className="icon-hover"/>,
      cName: 'nav-text'
    },
    {
      title: 'Reports',
      path: '/lab/upload',
      icon: <ReceiptIcon/>,
      cName: 'nav-text'
    },
    {
      title: 'Change Password',
      path: '/admin/changePassword',
      icon: <LockOpenIcon/>,
      cName: 'nav-text'
    },
    {
      title: 'Logout',
      path: '/',
      icon: <LogoutIcon className="icon-hover" />,
      cName: 'nav-text'
    },
  ],
  receptionist: [
    {
      title: 'Home',
      path: '/receptionist',
      icon: <HomeIcon className="icon-hover"/>,
      cName: 'nav-text'
    },
    {
      title: 'Register Patient',
      path: '/receptionist/addPatient',
      icon: <PeopleIcon/>,
      cName: 'nav-text'
    },
    {
      title: 'Change Password',
      path: '/receptionist/changePassword',
      icon: <LockOpenIcon/>,
      cName: 'nav-text'
    },
    {
      title: 'New Case',
      path: '/receptionist/newCase',
      icon: <  ContentCopyIcon/>,
      cName: 'nav-text'
    },
  ],
  radiologist:[
    {
      title: 'Home',
      path: '/radiologist',
      icon: <HomeIcon className="icon-hover"/>,
      cName: 'nav-text'
    },
    {
      title: 'View Invitations',
      path: '/radiologist/viewInvitations',
      icon: <DraftsIcon className="icon-hover" />,
      cName: 'nav-text'
    },
    {
      title: 'Active Cases',
      path: '/radiologist/viewCases',
      icon: <ReceiptIcon/>,
      cName: 'nav-text'
    },
    {
      title: 'Change Password',
      path: '/radiologist/changePassword',
      icon: <LockOpenIcon/>,
      cName: 'nav-text'
    },
    {
      title: 'Logout',
      path: '/',
      icon: <LogoutIcon className="icon-hover" />,
      cName: 'nav-text'
    },
  ]
};

