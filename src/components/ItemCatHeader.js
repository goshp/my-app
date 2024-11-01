import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import companyLogo from '../assets/rcycle-combomarkremovebgpreview-1@2x.png';
import badgeSilver from '../assets/image-910@2x.png';
import badgeBlack from '../assets/image-911@2x.png';
import badgeGreen from '../assets/image-912@2x.png';
import profileIcon from '../assets/avatar3@3x.png';
import './ItemCatHeader.css';

const ItemCatHeader = () => {
  const navigate = useNavigate();

  const links = [
    { label: 'Scanned Items', path: '/scanned-items' },
    { label: 'Acceptable Items', path: '/item-categories' },
    { label: 'Service Areas', path: '/service-areas' },
    { label: 'Bins', path: '/bins' },
    { label: 'Employees', path: '/employees' },
  ];

  return (
    <Box className="item-cat-header">
      <img src={companyLogo} alt="Company Logo" className="company-logo" />

      {/* Navigation Links */}
      <Box className="nav-links">
        {links.map((link) => (
          <Typography
            key={link.label}
            className={`nav-link ${link.label === 'Acceptable Items' ? 'active-link' : ''}`}
            onClick={() => navigate(link.path)}
          >
            {link.label}
          </Typography>
        ))}
      </Box>

      {/* Badge Icons with Blinking Effect */}
      <Box className="badge-icons">
        <div className="badge">
          <img src={badgeSilver} alt="Silver Badge" className= "ItemCatblink" />
          <span>332</span>
        </div>
        <div className="badge">
          <img src={badgeBlack} alt="Black Badge" className= "ItemCatblink"/>
          <span>493</span>
        </div>
        <div className="badge">
          <img src={badgeGreen} alt="Green Badge" className= "ItemCatblink" />
          <span>2,515</span>
        </div>
      </Box>

      {/* Profile Icon */}
      <img src={profileIcon} alt="Profile" className="profile-icon" />
    </Box>
  );
};

export default ItemCatHeader;
