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
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GradingIcon from '@mui/icons-material/Grading';
import FeedbackIcon from '@mui/icons-material/Feedback';
import LockResetIcon from '@mui/icons-material/LockReset';
import './Navbar.css';
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
      title: 'Change Password',
      path: '/doctor/changePassword',
      icon: <LockOpenIcon/>,
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
  ],
  patient: [
    {
      title: 'Home',
      path: '/patient',
      icon: <HomeIcon className="icon-hover"/>,
      cName: 'nav-text'
    },
    {
      title: 'Profile',
      path: '/patient/viewProfile',
      icon: <AccountCircleIcon/>,
      cName: 'nav-text'
    },
    {
      title: 'View Policy',
      path: '/patient/viewPolicy',
      icon: <GradingIcon/>,
      cName: 'nav-text'
    },
    {
      title: 'Launch Complaint',
      path: '/patient/launchComplaint',
      icon: < FeedbackIcon/>,
      cName: 'nav-text'
    },
    {
      title: 'Change Password',
      path: '/patient/changePassword',
      icon: < LockResetIcon/>,
      cName: 'nav-text'
    },
  ],
};