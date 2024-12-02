import React from 'react';
import { MenuItem, Select } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import './StatusDropdown.css';

const StatusDropdown = ({ status, setStatus }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "green";
      case "Pending":
        return "orange";
      case "Rejected":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <div className="status-dropdown-container">
      <Select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        variant="outlined"
        className="status-dropdown"
      >
        <MenuItem value="Approved">Approved</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="Rejected">Rejected</MenuItem>
      </Select>
      <FiberManualRecordIcon 
        style={{ color: getStatusColor(status) }}
        className="status-dot"
      />
    </div>
  );
};

export default StatusDropdown;
