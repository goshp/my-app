import React, { useState } from 'react';
import { Modal, Box, Typography, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
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
                    {/* Item Category - Half Width */}
                    <FormControl variant="outlined" className="form-control-half">
                        <InputLabel>Item Category</InputLabel>
                        <Select
                            name="itemCategory"
                            value={formData.itemCategory}
                            onChange={handleInputChange}
                            label="Item Category"
                        >
                            <MenuItem value="Battery">Battery</MenuItem>
                            <MenuItem value="Paper">Paper</MenuItem>
                            <MenuItem value="Plastic">Plastic</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Active Status - Half Width */}
                    <FormControl variant="outlined" className="form-control-half">
                        <InputLabel>Active Status</InputLabel>
                        <Select
                            name="activeStatus"
                            value={formData.activeStatus}
                            onChange={handleInputChange}
                            label="Active Status"
                        >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Inactive">Inactive</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Category Type - Full Width */}
                    <FormControl variant="outlined" className="form-control-full">
                        <InputLabel>Category Type</InputLabel>
                        <Select
                            name="categoryType"
                            value={formData.categoryType}
                            onChange={handleInputChange}
                            label="Category Type"
                        >
                            <MenuItem value="Recyclable">Recyclable</MenuItem>
                            <MenuItem value="Non-Recyclable">Non-Recyclable</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {/* Footer with Cancel and Update Buttons */}
                <Box className="modal-footer">
                    <Button onClick={onClose} className="cancel-button">Cancel</Button>
                    <Button onClick={handleSave} className="update-button">Update</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddItemCatModal;
