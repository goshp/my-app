import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import recycleLogo from '../assets/rcycle-combomarkremovebgpreview-1@2x.png';
import profileIcon from '../assets/avatar3@3x.png';
import badgeSilver from '../assets/image-910@2x.png';
import badgeBlack from '../assets/image-911@2x.png';
import badgeGreen from '../assets/image-912@2x.png';
import './BinsHeader.css';

const BinsHeader = () => {
  const navigate = useNavigate();
  const links = [
    { label: 'Scanned Items', path: '/scanned-items' },
    { label: 'Acceptable Items', path: '/item-categories' },
    { label: 'Service Areas', path: '/service-areas' },
    { label: 'Bins', path: '/bins-data' },
    { label: 'Employees', path: '/employees' },
  ];

  return (
    <Box className="bins-header">
      <img src={recycleLogo} alt="Recycle Logo" className="bins-logo" />
      
      <Box className="bins-nav-links">
        {links.map((link) => (
          <Typography
            key={link.label}
            className={`bins-nav-link ${link.label === 'Bins' ? 'active-link' : ''}`}
            onClick={() => navigate(link.path)}
          >
            {link.label}
          </Typography>
        ))}
      </Box>

      <Box className="bins-badge-icons">
        <div className="badge">
          <img src={badgeSilver} alt="Silver Badge" className="badge-icon" />
          <span>332</span>
        </div>
        <div className="badge">
          <img src={badgeBlack} alt="Black Badge" className="badge-icon" />
          <span>493</span>
        </div>
        <div className="badge">
          <img src={badgeGreen} alt="Green Badge" className="badge-icon" />
          <span>2,515</span>
        </div>
      </Box>

      <IconButton>
        <img src={profileIcon} alt="Profile" className="bins-profile-icon" />
      </IconButton>
    </Box>
  );
};

export default BinsHeader;
