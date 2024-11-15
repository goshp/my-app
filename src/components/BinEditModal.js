import React, { useState } from 'react';
import { Modal, Box, Typography, Button, MenuItem, Select, TextField, FormControl } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './BinEditModal.css';

const BinEditModal = ({ open, onClose, binData, onSave }) => {
  const [formData, setFormData] = useState({
    name: binData.name || '',
    latitude: binData.latitude || '',
    longitude: binData.longitude || '',
    status: binData.status || 'Active',
    schedule: binData.schedule || 'Alternative days',
    pickupTime: binData.pickupTime || '09:00',
    file: binData.file || null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevData => ({ ...prevData, image: file }));
    }
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-box">
        <Typography variant="h6" className="modal-title">Edit Bin</Typography>
        
        <Box className="modal-form">
          <Box className="form-column">
            <Box className="form-item">
              <Typography variant="body2" className="field-label">Bin Name</Typography>
              <TextField
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                select
                fullWidth
                variant="outlined"
              >
                <MenuItem value="Cafeteria Recycle">Cafeteria Recycle</MenuItem>
                <MenuItem value="Office Recycle">Office Recycle</MenuItem>
              </TextField>
            </Box>
            
            <Box className="form-item">
              <Typography variant="body2" className="field-label">Bin Longitude</Typography>
              <TextField
                name="longitude"
                value={formData.longitude}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
            </Box>

            <Box className="form-item">
              <Typography className="field-label">Pickup Schedule</Typography>
              <FormControl fullWidth variant="outlined">
                <Select
                  name="schedule"
                  value={formData.schedule}
                  onChange={handleInputChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>Select Pickup Day</MenuItem>
                  <MenuItem value="Monday">Monday</MenuItem>
                  <MenuItem value="Tuesday">Tuesday</MenuItem>
                  <MenuItem value="Wednesday">Wednesday</MenuItem>
                  <MenuItem value="Thursday">Thursday</MenuItem>
                  <MenuItem value="Friday">Friday</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box className="form-item image-upload">
              <label htmlFor="image-upload" className="image-upload-label">
                <CloudUploadIcon style={{ marginRight: '8px' }} />
                Upload Image
              </label>
              <input type="file" accept="image/*" id="image-upload" onChange={handleImageUpload} style={{ display: 'none' }} />
              {formData.image && (
                <Typography className="image-upload-info">
                  {formData.image.name} - {(formData.image.size / 1024).toFixed(2)} KB
                </Typography>
              )}
            </Box>
          </Box>

          <Box className="form-column">
            <Box className="form-item">
              <Typography variant="body2" className="field-label">Bin Latitude</Typography>
              <TextField
                name="latitude"
                value={formData.latitude}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
            </Box>
            <Box className="form-item">
              <Typography variant="body2" className="field-label">Bin Status</Typography>
              <TextField
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                select
                fullWidth
                variant="outlined"
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </TextField>
            </Box>
            <Box className="form-item">
              <Typography className="field-label">Pickup Time</Typography>
              <TextField
                name="pickupTime"
                type="time"
                variant="outlined"
                fullWidth
                value={formData.pickupTime}
                onChange={handleInputChange}
              />
            </Box>
          </Box>
        </Box>

        <Box className="modal-footer">
          <Button onClick={onClose} className="cancel-button" fullWidth>Cancel</Button>
          <Button onClick={handleSave} className="save-button" fullWidth>Update Bin</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default BinEditModal;
