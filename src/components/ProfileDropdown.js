import React, { useState } from 'react';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import profileIcon from './assets/avatar3@3x.png';

const ProfileDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (option) => {
    handleClose();
    try {
      if (option === 'Profile') {
        navigate('/profile');
      } else if (option === 'Logout') {
        navigate('/logout');
      }
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };  

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <Avatar src={profileIcon} alt="Profile" />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleMenuClick('Profile')}>Profile</MenuItem>
        <MenuItem onClick={() => handleMenuClick('Logout')}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileDropdown;
