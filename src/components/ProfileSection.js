import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Avatar,
  IconButton,
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const ProfileSection = ({ title, subtitle, fields, uploadEnabled, sectionType, onSave, onCancel }) => {
  const [formData, setFormData] = useState(() =>
    fields.reduce((acc, field) => ({ ...acc, [field.name]: field.defaultValue || '' }), {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      profileImage: URL.createObjectURL(file),
      profileImageName: file ? file.name : '',
    }));
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3, borderRadius: 2, boxShadow: 1, bgcolor: 'background.paper', mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary" mb={3}>
        {subtitle}
      </Typography>

      {/* Layout based on sectionType */}
      {sectionType === 'personal' ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {/* Upload Container for Personal Info */}
          {uploadEnabled && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '1px dashed #ced4da',
                padding: 3,
                borderRadius: 2,
                textAlign: 'center',
                mb: 2,
              }}
            >
              <Avatar
                src={formData.profileImage || 'https://via.placeholder.com/100'}
                alt="Profile"
                sx={{ width: 80, height: 80, mb: 1 }}
              />
              <input
                accept="image/*"
                type="file"
                id="upload-photo"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />
              <label htmlFor="upload-photo">
                <IconButton component="span">
                  <PhotoCameraIcon fontSize="large" />
                </IconButton>
              </label>
              <Typography variant="caption" color="textSecondary">
                Click to upload or drag and drop<br />
                SVG, PNG, JPG or GIF (max. 800x400px)
              </Typography>
            </Box>
          )}

          {/* Form Fields for Personal Info */}
          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: '1fr 1fr' }}>
            {fields.map((field) => (
              <FormControl key={field.name} fullWidth>
                {field.type === 'select' ? (
                  <>
                    <InputLabel>{field.label}</InputLabel>
                    <Select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      label={field.label}
                    >
                      {field.options.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                ) : (
                  <TextField
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    value={formData[field.name]}
                    onChange={handleChange}
                    fullWidth
                  />
                )}
              </FormControl>
            ))}
          </Box>
        </Box>
      ) : sectionType === 'contact' ? (
        // Contact Info Layout
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: '1fr 1fr' }}>
          {fields.map((field) => (
            <FormControl key={field.name} fullWidth>
              {field.type === 'select' ? (
                <>
                  <InputLabel>{field.label}</InputLabel>
                  <Select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    label={field.label}
                  >
                    {field.options.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              ) : (
                <TextField
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  value={formData[field.name]}
                  onChange={handleChange}
                  fullWidth
                />
              )}
            </FormControl>
          ))}
        </Box>
      ) : (
        // Company Info Layout
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'start',
          }}
        >
          {/* Form Fields for Company Info */}
          {fields.map((field) => (
            <FormControl key={field.name} fullWidth>
              {field.type === 'select' ? (
                <>
                  <InputLabel>{field.label}</InputLabel>
                  <Select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    label={field.label}
                  >
                    {field.options.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              ) : (
                <TextField
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  value={formData[field.name]}
                  onChange={handleChange}
                  fullWidth
                />
              )}
            </FormControl>
          ))}

          {/* Upload Container for Company Info */}
          {uploadEnabled && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '1px dashed #ced4da',
                padding: 3,
                borderRadius: 2,
                textAlign: 'center',
                width: '100%',
                maxWidth: 300,
                mt: 2,
              }}
            >
              <Avatar
                src={formData.profileImage || 'https://via.placeholder.com/100'}
                alt="Company Logo"
                sx={{ width: 50, height: 50, mb: 1 }}
              />
              <Typography variant="body2" color="textSecondary">
                {formData.profileImageName || 'Document.jpg'}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                4.8 Mb
              </Typography>
            </Box>
          )}
        </Box>
      )}

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button onClick={onCancel} variant="outlined" sx={{ mr: 2 }}>
          Cancel
        </Button>
        <Button onClick={() => onSave(formData)} variant="contained" color="success">
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileSection;
