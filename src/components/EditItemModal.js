import React, { useState, useEffect } from 'react';
import {
  Box, Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Typography, IconButton, MenuItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
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
        <Box component="form" className="item-edit-form" noValidate autoComplete="off">
          <Box display="flex" gap={2} flexWrap="wrap">
            <Box flexBasis="48%">
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
            </Box>
            <Box flexBasis="48%">
              <TextField
                label="Brand Name"
                name="brandName"
                value={formData.brandName}
                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                fullWidth
              />
            </Box>

            <Box flexBasis="48%">
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
            </Box>
            <Box flexBasis="48%">
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

            <Box flexBasis="48%">
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
            </Box>

            {/* Upload Image Section */}
            <Box flexBasis="48%" display="flex" flexDirection="column" alignItems="center" gap={1}>
              {formData.file ? (
                <Box display="flex" alignItems="center" gap={1} mt={2}>
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
                <Button variant="outlined" component="label" className="upload-btn" fullWidth>
                  Upload Image
                  <input type="file" hidden onChange={handleFileChange} />
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" className="cancel-btn">
          Cancel
        </Button>
        <Button onClick={handleSave} color="success" variant="contained" className="save-btn">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditItemModal;
