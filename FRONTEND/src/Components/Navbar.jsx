import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { Box, IconButton, ListItem } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { SidebarData } from './SidebarData';
import logo from '../Images/Logo.jpeg'; // Import the logo
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';
import { useContext } from 'react';
import { LoggedInUserContext } from '../Context/LoggedInUserContext';

function Navbar({ userRole }) {
  const navigate= useNavigate();
  const { loggedinUser, setLoggedinUser } = useContext(LoggedInUserContext);
  const authToken = loggedinUser.token;

  const handleLogout = async () => {
  
    try {
      await axios.post('http://localhost:9191/api/v1/logout', null, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      console.clear();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const userSidebarData = SidebarData[userRole] || [];


  const handleNotificationClick = () => {
    let notificationRoute = '/';
    if (userRole === 'patient') {
      notificationRoute = '/patient/consent';
    } else if (userRole === 'doctor') {
      notificationRoute = '/doctor/notifications';
    } else if (userRole === 'radiologist') {
      notificationRoute = '/radiologist/viewInvitations';
    }
    navigate(notificationRoute);
  };

  return (
    <>
      <IconContext.Provider value={{ color: '#000' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} style={{ height: '50px', alignContent: 'center' }} />
          </Link>
          <ListItem><img src={logo} alt='RadilogyPlus' style={{ height: '50px', width: 'auto' }} /></ListItem> {/* Use the imported logo */}
          <Box display="flex" alignItems="center" justifyContent="flex-end" className='box'>
            <IconButton>
            <NotificationsNoneIcon fontSize='large' onClick={() => handleNotificationClick()} />
            </IconButton>
            <IconButton>
              <AccountCircleOutlinedIcon fontSize='large' />
            </IconButton>
            <IconButton onClick={handleLogout}>
              <LogoutIcon fontSize='large' />
            </IconButton>
            <div className="user-label">
              <h3>{userRole.toUpperCase()}</h3>
            </div>
          </Box>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            {userSidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
                
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;