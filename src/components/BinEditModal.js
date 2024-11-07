import React, { useState } from 'react';
import {
    Box, Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Typography, IconButton, MenuItem  // Add TextField and MenuItem here
  } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, file }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Edit Bin
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" className="bin-edit-form" noValidate autoComplete="off">
          <Box display="flex" gap={3}>
            {/* Left Column */}
            <Box flex={1} display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Bin Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                select
                fullWidth
              >
                <MenuItem value="Cafeteria Recycle">Cafeteria Recycle</MenuItem>
                <MenuItem value="Office Recycle">Office Recycle</MenuItem>
              </TextField>
              <TextField
                label="Bin Longitude"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Pickup Schedule"
                name="schedule"
                value={formData.schedule}
                onChange={handleChange}
                select
                fullWidth
              >
                <MenuItem value="Daily">Daily</MenuItem>
                <MenuItem value="Alternative days">Alternative days</MenuItem>
                <MenuItem value="Weekly">Weekly</MenuItem>
              </TextField>

              {/* File Upload */}
              <Box className="file-upload">
                {formData.file ? (
                  <Box display="flex" alignItems="center" gap={2}>
                    <img
                      src={URL.createObjectURL(formData.file)}
                      alt="Uploaded"
                      width={40}
                      height={40}
                      style={{ borderRadius: 4 }}
                    />
                    <Typography variant="body2">{formData.file.name}</Typography>
                    <Typography variant="caption">{(formData.file.size / 1024).toFixed(2)} KB</Typography>
                  </Box>
                ) : (
                  <Button variant="outlined" component="label" className="upload-btn">
                    Upload File
                    <input type="file" hidden onChange={handleFileChange} />
                  </Button>
                )}
              </Box>
            </Box>

            {/* Right Column */}
            <Box flex={1} display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Bin Latitude"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Bin Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                select
                fullWidth
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </TextField>
              <TextField
                label="Pickup Time"
                name="pickupTime"
                type="time"  // Only the native HTML time input, no custom icon
                value={formData.pickupTime}
                onChange={handleChange}
                fullWidth
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" className="cancel-btn" fullWidth>
          Cancel
        </Button>
        <Button onClick={handleSave} color="success" variant="contained" className="save-btn" fullWidth>
          Update Bin
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BinEditModal;
