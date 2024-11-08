import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import companyLogo from '../assets/rcycle-combomarkremovebgpreview-1@2x.png';
import badge1 from '../assets/image-910@2x.png';
import badge2 from '../assets/image-911@2x.png';
import profIcon from '../assets/avatar3@3x.png';
import './ProfileHeader.css';

const ProfileHeader = () => {
  const navigate = useNavigate();

  const links = [
    { label: 'Scanned Items', path: '/scanned-items' },
    { label: 'Item Categories', path: '/item-categories' },
    { label: 'Service Areas', path: '/service-areas' },
    { label: 'Bins', path: '/bins-data' },
    { label: 'Users', path: '/users' },
    { label: 'Transactions', path: '/transactions' },
    { label: 'E-store', path: '/e-store' },
    { label: 'Vendors', path: '/vendors' },
    { label: 'Tokens', path: '/tokens' },
  ];

  return (
    <Box className="profile-header">
      <img src={companyLogo} alt="Company Logo" className="company-logo" />

      {/* Navigation Links */}
      <Box className="nav-links">
        {links.map((link) => (
          <Typography
            key={link.label}
            className="nav-link"
            onClick={() => navigate(link.path)} // Navigate to route on click
          >
            {link.label}
          </Typography>
        ))}
      </Box>

      {/* Badge Icons */}
      <Box className="badge-icons">
        <div className="badge">
          <img src={badge1} alt="Silver Badge" className="badgeblink"  />
          <span>423</span>
        </div>
        <div className="badge">
          <img src={badge2} alt="Gold Badge" className=" badgeblink" /> {/* Blinking effect here */}
          <span>345</span>
        </div>
        <div className="badge">
          <img src={badge1} alt="Green Badge" className="badgeblink" /> {/* Blinking effect here */}
          <span>1,515</span>
        </div>
        <img src={profIcon} alt="Profile" className="prof-icon" />
       
      </Box>
    </Box>
  );
};

export default ProfileHeader;
