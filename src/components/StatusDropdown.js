import React from 'react';
import { MenuItem, Select } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import './StatusDropdown.css';

const StatusDropdown = ({ status, setStatus }) => {
  // Function to determine the color based on the status
  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "green";
      case "Pending":
        return "orange";
      case "Rejected":
        return "red";
      default:
        return "gray"; // Default color if status is not recognized
    }
  };

  return (
    <div className="status-dropdown-container">
      <Select
        value={status} // Current selected status
        onChange={(e) => setStatus(e.target.value)} // Handle status change
        variant="outlined"
        className="status-dropdown" // Custom styling class
      >
        <MenuItem value="Approved">Approved</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="Rejected">Rejected</MenuItem>
      </Select>
      <FiberManualRecordIcon 
        style={{ color: getStatusColor(status) }} // Dot color based on status
        className="status-dot" // Custom styling class
      />
    </div>
  );
};

export default StatusDropdown;
