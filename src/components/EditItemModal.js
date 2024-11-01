import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import './EditItemModal.css';

const EditItemModal = ({ open, onClose, item = {}, onSave }) => {
  const [editedItem, setEditedItem] = useState(item || {});
  const [image, setImage] = useState(null);

  useEffect(() => {
    // Update editedItem only if item is defined
    if (item) {
      setEditedItem(item);
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSave = () => {
    onSave(editedItem);
    onClose();
  };

  if (!item) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-box">
        <Typography variant="h6" className="modal-title">Edit Item</Typography>
        
        <div className="modal-form">
          <div className="form-column">
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Item Category</InputLabel>
              <Select
                name="item"
                value={editedItem.item || ''}
                onChange={handleChange}
                label="Item Category"
              >
                <MenuItem value="Battery">Battery</MenuItem>
                <MenuItem value="Paper">Paper</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Part</InputLabel>
              <Select
                name="parts"
                value={editedItem.parts || ''}
                onChange={handleChange}
                label="Part"
              >
                <MenuItem value="Label Part">Label Part</MenuItem>
                <MenuItem value="Tag">Tag</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Approval Status</InputLabel>
              <Select
                name="status"
                value={editedItem.status || ''}
                onChange={handleChange}
                label="Approval Status"
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="form-column">
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Brand Name</InputLabel>
              <Select
                name="brand"
                value={editedItem.brand || ''}
                onChange={handleChange}
                label="Brand Name"
              >
                <MenuItem value="Apple">Apple</MenuItem>
                <MenuItem value="Samsung">Samsung</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Dimensions</InputLabel>
              <Select
                name="dims"
                value={editedItem.dims || ''}
                onChange={handleChange}
                label="Dimensions"
              >
                <MenuItem value="12 oz PET">12 oz PET</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="image-upload">
          <input
            accept="image/*"
            type="file"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <Button variant="outlined" component="span">
              Upload Image
            </Button>
          </label>
          {image && (
            <Typography variant="body2" color="textSecondary">
              {image.name} - {(image.size / 1024).toFixed(2)} MB
            </Typography>
          )}
        </div>

        <div className="modal-footer">
          <Button onClick={onClose} variant="outlined" className="cancel-button">Cancel</Button>
          <Button onClick={handleSave} variant="contained" className="update-button">Update</Button>
        </div>
      </Box>
    </Modal>
  );
};

export default EditItemModal;
