import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import StatusDropdown from './StatusDropdown';
import badge1 from '../assets/image-910@2x.png';
import badge2 from '../assets/image-911@2x.png';
import './ItemsTable.css';

const ItemsTable = ({ title, date, data, onEdit }) => {
  const [statuses, setStatuses] = useState(data.map((item) => item.status));

  const handleStatusChange = (index, newStatus) => {
    const updatedStatuses = [...statuses];
    updatedStatuses[index] = newStatus;
    setStatuses(updatedStatuses);
  };

  return (
    <TableContainer component={Paper} className="table-container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={10} style={{ textAlign: 'left', paddingBottom: '4px' }}>
              <span style={{ fontSize: '1.25em', fontWeight: 'bold' }}>{title}</span>
              <span style={{ fontSize: '0.875em', color: '#888', marginLeft: '10px' }}>{date}</span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Item Category</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Dims</TableCell>
            <TableCell>Parts</TableCell>
            <TableCell>Rewards</TableCell>
            <TableCell>Date/Time</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell><img src="battery-icon.png" alt={row.item} style={{ width: 40 }} /></TableCell>
              <TableCell>{row.item}</TableCell>
              <TableCell>
                <StatusDropdown
                  status={statuses[index]}
                  setStatus={(newStatus) => handleStatusChange(index, newStatus)}
                />
              </TableCell>
              <TableCell>{row.brand}</TableCell>
              <TableCell>{row.dims}</TableCell>
              <TableCell>{row.parts}</TableCell>
              <TableCell>
                <div className="rewards-container">
                  {/* Silver Badge */}
                  <div className="reward-item">
                    <span className="reward-number">1</span>
                    <img src={badge1} alt="Silver Badge" className="reward-icon blinking" />
                  </div>

                  {/* Green Badge */}
                  <div className="reward-item">
                    <span className="reward-number">10</span>
                    <img src={badge2} alt="Green Badge" className="reward-icon blinking" />
                  </div>
                </div>
              </TableCell>

              <TableCell>{row.date}</TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(row)}><EditIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemsTable;
