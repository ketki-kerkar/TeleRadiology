import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { Box, IconButton, ListItem } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { SidebarData } from './SidebarData';
import logo from '../Images/Logo.jpeg'; // Import the logo

function Navbar({ userRole }) {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const userSidebarData = SidebarData[userRole] || [];

  return (
    <>
      <IconContext.Provider value={{ color: '#000' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} style={{height:'50px',alignContent:'center'}}/>
          </Link>
          <ListItem><img src={logo} alt='RadilogyPlus' style={{height:'50px', width:'auto'}} /></ListItem> {/* Use the imported logo */}
          <Box display="flex" alignItems="center" justifyContent="flex-end" className='box'>
            <IconButton>
              <NotificationsNoneIcon fontSize='large' />
            </IconButton>
            <IconButton>
              <AccountCircleOutlinedIcon fontSize='large' />
            </IconButton>
            <div className="user-label">
              <h3>{userRole.toUpperCase()}</h3>
            </div>
          </Box>
        </div>
        
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to="#" className='menu-bars' align='right'>
                x
              </Link>
            </li>
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
