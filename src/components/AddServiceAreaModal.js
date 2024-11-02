import React, { useState } from 'react';
import { Modal, Box, Typography, Button, MenuItem, Select, TextField, FormControl } from '@mui/material'; // <-- Added FormControl here
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
                    <TextField
                        label="Name"
                        name="name"
                        variant="outlined"
                        fullWidth
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                    <TextField
                        label="Postal Code"
                        name="postalCode"
                        variant="outlined"
                        fullWidth
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                    <FormControl variant="outlined" className="form-control">
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
                    <TextField
                        label="Pickup Time"
                        name="pickupTime"
                        type="time"
                        variant="outlined"
                        fullWidth
                        value={formData.pickupTime}
                        onChange={handleInputChange}
                        className="form-control"
                    />

                    {/* Image Upload */}
                    <Box className="form-control-full image-upload">
                        <input type="file" accept="image/*" id="image-upload" onChange={handleImageUpload} />
                        <label htmlFor="image-upload">Upload Image</label>
                        {formData.image && (
                            <Typography className="image-upload-info">
                                {formData.image.name} - {(formData.image.size / 1024).toFixed(2)} KB
                            </Typography>
                        )}
                    </Box>
                </Box>

                {/* Footer with buttons */}
                <Box className="modal-footer">
                    <Button onClick={onClose} className="cancel-button">Cancel</Button>
                    <Button onClick={handleSave} className="save-button">Save</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddServiceAreaModal;
