import React, { useState } from 'react';
import { Modal, Box, Typography, Button, MenuItem, Select, TextField, FormControl } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './AddServiceAreaModal.css';

const AddServiceAreaModal = ({ open, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        postalCode: '',
        pickupDay: '',
        pickupTime: '',
        image: null
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
                <Typography variant="h6" className="modal-title">Create Community</Typography>
                
                <Box className="modal-form">
                    <Box className="form-column">
                        <Box className="form-item">
                            <Typography className="field-label">Name</Typography>
                            <TextField
                                name="name"
                                variant="outlined"
                                fullWidth
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </Box>

                        <Box className="form-item">
                            <Typography className="field-label">Pickup Day</Typography>
                            <FormControl fullWidth variant="outlined">
                                <Select
                                    name="pickupDay"
                                    value={formData.pickupDay}
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
                            <Typography className="field-label">Postal Code</Typography>
                            <TextField
                                name="postalCode"
                                variant="outlined"
                                fullWidth
                                value={formData.postalCode}
                                onChange={handleInputChange}
                            />
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
                    <Button onClick={handleSave} className="save-button" fullWidth>Save</Button>
                </Box>

            </Box>
        </Modal>
    );
};

export default AddServiceAreaModal;
