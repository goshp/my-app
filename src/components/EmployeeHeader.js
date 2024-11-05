// src/components/Navbar.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faDotCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import './EmployeeHeader.css';
import logo from '../assets/logo.png';

const EmployeeHeader = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Company Logo" className="logo" />
        <span className="nav-item">Scanned Items</span>
        <span className="nav-item">Acceptable Items</span>
        <span className="nav-item">Service Areas</span>
        <span className="nav-item">Bins</span>
        <span className="nav-item employees">Employees</span>
      </div>
      <div className="navbar-right">
        <div className="badge">
          <FontAwesomeIcon icon={faCircle} className="badge-icon gray" />
          <span>332</span>
        </div>
        <div className="badge">
          <FontAwesomeIcon icon={faDotCircle} className="badge-icon black" />
          <span>493</span>
        </div>
        <div className="badge">
          <FontAwesomeIcon icon={faCheckCircle} className="badge-icon green" />
          <span>2,515</span>
        </div>
        <img
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="User Profile"
          className="profile-picture"
        />
      </div>
    </nav>
  );
};

export default EmployeeHeader;
