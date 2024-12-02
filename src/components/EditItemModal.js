import React, { useState, useEffect } from 'react';
import {
  Box, Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Typography, IconButton, MenuItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './EditItemModal.css';

const EditItemModal = ({ open, onClose, itemData = {}, onSave }) => {
  const [formData, setFormData] = useState({
    category: itemData?.category || '',
    brandName: itemData?.brandName || '',
    part: itemData?.part || '',
    dimensions: itemData?.dimensions || '',
    status: itemData?.status || 'Pending',
    file: itemData?.file || null,
  });

  useEffect(() => {
    if (open && itemData) {
      setFormData({
        category: itemData.category || '',
        brandName: itemData.brandName || '',
        part: itemData.part || '',
        dimensions: itemData.dimensions || '',
        status: itemData.status || 'Pending',
        file: itemData.file || null,
      });
    }
  }, [itemData, open]);

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
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Edit Item
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
        <Box display="flex" gap={3} className="item-edit-form">
          {/* Left Column */}
          <Box flex={1} display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Item Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              select
              fullWidth
            >
              <MenuItem value="Paper">Paper</MenuItem>
              <MenuItem value="Plastic">Plastic</MenuItem>
            </TextField>

            <TextField
              label="Part"
              name="part"
              value={formData.part}
              onChange={handleChange}
              select
              fullWidth
            >
              <MenuItem value="Label Part">Label Part</MenuItem>
              <MenuItem value="Bottle Part">Bottle Part</MenuItem>
            </TextField>

            <TextField
              label="Approval Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              select
              fullWidth
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </TextField>

            {/* Upload Image Section */}
            <Box display="flex" flexDirection="column" alignItems="center" gap={1} mt={2}>
              {formData.file ? (
                <Box display="flex" alignItems="center" gap={1}>
                  <img
                    src={URL.createObjectURL(formData.file)}
                    alt="Uploaded"
                    width={40}
                    height={40}
                    style={{ borderRadius: 4 }}
                  />
                  <Box>
                    <Typography variant="body2">{formData.file.name}</Typography>
                    <Typography variant="caption">{(formData.file.size / 1024).toFixed(2)} KB</Typography>
                  </Box>
                </Box>
              ) : (
                <IconButton color="primary" component="label">
                  <CloudUploadIcon fontSize="large" />
                  <input type="file" hidden onChange={handleFileChange} />
                </IconButton>
              )}
            </Box>
          </Box>

          {/* Right Column */}
          <Box flex={1} display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Brand Name"
              name="brandName"
              value={formData.brandName}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Dimensions"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleChange}
              select
              fullWidth
            >
              <MenuItem value="12 oz PET">12 oz PET</MenuItem>
              <MenuItem value="16 oz PET">16 oz PET</MenuItem>
            </TextField>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions className="modal-footer">
        <Button onClick={onClose} className="cancel-button">Cancel</Button>
        <Button onClick={handleSave} className="save-button">Update Bin</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditItemModal;
