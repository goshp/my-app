import React, { useState } from 'react';
import recycleLogo from '../assets/rcycle-combomarkremovebgpreview-1@2x.png';
import badgeIcon1 from '../assets/image-92@2x.png';
import badgeIcon2 from '../assets/image-91@2x.png';
import badgeIcon3 from '../assets/image-93@2x.png';
import profileIcon from '../assets/avatar3@3x.png';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material'; // Removed Box
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleMenuClick = (option) => {
    handleClose();
    if (option === 'Profile') navigate('/profile');
    else if (option === 'Logout') navigate('/logout');
  };

  const links = [
    { label: 'Scanned Items', path: '/scanned-items' },
    { label: 'Acceptable Items', path: '/item-categories' },
    { label: 'Service Areas', path: '/service-areas' },
    { label: 'Bins', path: '/bins-data' },
    { label: 'Employees', path: '/employees' },
  ];

  return (
    <header className="header">
      <img src={recycleLogo} alt="Recycle Logo" className="logo" />
      <nav className="nav">
        {links.map((link) => (
          <Typography
            key={link.label}
            className={`nav-link ${link.label === 'Scanned Items' ? 'active-link' : ''}`}
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

        {/* Profile Icon with Dropdown */}
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
