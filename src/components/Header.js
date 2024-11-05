import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import recycleLogo from '../assets/rcycle-combomarkremovebgpreview-1@2x.png';
import badgeIcon1 from '../assets/image-92@2x.png';
import badgeIcon2 from '../assets/image-91@2x.png';
import badgeIcon3 from '../assets/image-93@2x.png';
import profileIcon from '../assets/avatar3@3x.png';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import './Header.css';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleMenuClick = (option) => {
    handleClose();
    if (option === 'Profile') {
      navigate('/profile');
    } else if (option === 'Logout') {
      // Clear user session (remove token from local storage)
      localStorage.removeItem('authToken');
      
      // Redirect to login page and replace history to prevent going back
      navigate('/', { replace: true });
    }
  };  

  const links = [
    { label: 'Scanned Items', path: '/scanned-items' },
    { label: 'Acceptable Items', path: '/item-categories' },
    { label: 'Service Areas', path: '/service-areas' },
    { label: 'Bins', path: '/bins-data' },
    { label: 'Employees', path: '/employees-data' },
  ];

  return (
    <header className="header">
      <img src={recycleLogo} alt="Recycle Logo" className="logo" />
      <nav className="nav">
        {links.map((link) => (
          <Typography
            key={link.label}
            className={`nav-link ${location.pathname === link.path ? 'active-link' : ''}`}
            onClick={() => navigate(link.path)}
          >
            {link.label}
          </Typography>
        ))}
      </nav>

      <div className="header-icons">
        <div className="badge-container">
          <img src={badgeIcon1} alt="Badge Icon 1" className="badge-icon scanblink" />
          <span className="badge-number">99+</span>
        </div>
        <div className="badge-container">
          <img src={badgeIcon2} alt="Badge Icon 2" className="badge-icon scanblink" />
          <span className="badge-number">99+</span>
        </div>
        <div className="badge-container">
          <img src={badgeIcon3} alt="Badge Icon 3" className="badge-icon scanblink" />
          <span className="badge-number">99+</span>
        </div>

        <IconButton onClick={handleOpen}>
          <img src={profileIcon} alt="Profile" className="profile-icon" />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={() => handleMenuClick('Profile')}>Profile</MenuItem>
          <MenuItem onClick={() => handleMenuClick('Logout')}>Logout</MenuItem>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
