import React, { useState } from 'react';
import { Modal, Box, Typography, Button, MenuItem, Select, FormControl } from '@mui/material';
import './AddItemCatModal.css';

const AddItemCatModal = ({ open, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        itemCategory: '',
        activeStatus: '',
        categoryType: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box className="modal-box">
                <Typography variant="h6" className="modal-title">Select Acceptable Category</Typography>
                
                <Box className="modal-form">
                    <Box className="form-column">
                        <Typography className="field-label">Item Category</Typography>
                        <FormControl variant="outlined" fullWidth>
                            <Select
                                name="itemCategory"
                                value={formData.itemCategory}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="Battery">Battery</MenuItem>
                                <MenuItem value="Paper">Paper</MenuItem>
                                <MenuItem value="Plastic">Plastic</MenuItem>
                            </Select>
                        </FormControl>

                        <Typography className="field-label">Category Type</Typography>
                        <FormControl variant="outlined" fullWidth>
                            <Select
                                name="categoryType"
                                value={formData.categoryType}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="Recyclable">Recyclable</MenuItem>
                                <MenuItem value="Non-Recyclable">Non-Recyclable</MenuItem>
                            </Select>
                        </FormControl>

                        <Button
                            onClick={onClose}
                            className="cancel-button"
                        >
                            Cancel
                        </Button>
                    </Box>

                    <Box className="form-column">
                        <Typography className="field-label">Active Status</Typography>
                        <FormControl variant="outlined" fullWidth>
                            <Select
                                name="activeStatus"
                                value={formData.activeStatus}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="Inactive">Inactive</MenuItem>
                            </Select>
                        </FormControl>

                        <Box className="button-container">
                            <Button
                                onClick={handleSave}
                                className="update-button"
                            >
                                Update
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddItemCatModal;
