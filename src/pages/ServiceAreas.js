import React, { useState } from 'react';
import { Box, Typography, Button, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ServAreaHeader from '../components/ServAreaHeader';
import AddServiceAreaModal from '../components/AddServiceAreaModal';
import './ServiceAreas.css';

import oshawaLogo from '../assets/oshawa_Logo.png';
import ajaxLogo from '../assets/logo-ajax-png-1.png';
import scugogLogo from '../assets/Township-of-Scugog-Logo.png';
import claringtonLogo from '../assets/clarington_logo.png';

const initialServiceAreasData = [
  { id: 1, name: "Ajax", image: ajaxLogo, postalCode: "K0E 0B2", pickupDay: "Wednesday", pickupTime: "08:30 PM", status: "Active" },
  { id: 2, name: "Oshawa", image: oshawaLogo, postalCode: "K0A 0A7", pickupDay: "Thursday", pickupTime: "06:20 PM", status: "Active" },
  { id: 3, name: "Scugog", image: scugogLogo, postalCode: "K0E 0B2", pickupDay: "Wednesday", pickupTime: "08:30 PM", status: "Active" },
  { id: 4, name: "Clarington", image: claringtonLogo, postalCode: "K0A 0A7", pickupDay: "Thursday", pickupTime: "06:20 PM", status: "Active" },
];

const ServiceAreas = () => {
  const [sortOption, setSortOption] = useState("Default");
  const [page, setPage] = useState(1);
  const [serviceAreas, setServiceAreas] = useState(initialServiceAreasData);
  const [isModalOpen, setModalOpen] = useState(false);

  // Sorting handler
  const handleSortChange = (sortValue) => {
    setSortOption(sortValue);
    let sortedData;

    if (sortValue === "A-Z") {
      sortedData = [...serviceAreas].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === "Z-A") {
      sortedData = [...serviceAreas].sort((a, b) => b.name.localeCompare(a.name));
    } else {
      sortedData = initialServiceAreasData; // Reset to default
    }

    setServiceAreas(sortedData);
  };

  // Modal handlers
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  // Handler for saving a new service area
  const handleSaveServiceArea = (newArea) => {
    setServiceAreas((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: newArea.name,
        image: newArea.image,
        postalCode: newArea.postalCode,
        pickupDay: newArea.pickupDay,
        pickupTime: newArea.pickupTime,
        status: newArea.status,
      },
    ]);
  };

  // Handler for changing status in the dropdown
  const handleStatusChange = (id, newStatus) => {
    setServiceAreas((prev) =>
      prev.map((area) =>
        area.id === id ? { ...area, status: newStatus } : area
      )
    );
  };

  // Handler for deleting a service area
  const handleDelete = (id) => {
    setServiceAreas((prev) => prev.filter((area) => area.id !== id));
  };

  return (
    <Box className="service-areas-page">
      <ServAreaHeader />

      {/* Title and Subtitle */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          <Typography variant="h5" component="h1" className="service-area-title">Service Area</Typography>
          <Typography variant="body2" color="textSecondary" className="service-area-subtitle">
            See all of your Service Area here.
          </Typography>
        </Box>

        <Box display="flex" gap={2}>
          <input
            accept=".xlsx, .xls"
            type="file"
            id="upload-excel"
            style={{ display: 'none' }}
          />
          <label htmlFor="upload-excel">
            <Button variant="outlined" color="primary" component="span">Add by Excel</Button>
          </label>

          <Button variant="contained" color="success" startIcon={<AddIcon />} onClick={handleOpenModal}>Add New</Button>
        </Box>
      </Box>

      {/* Filter Dropdown with Sort Options */}
      <Box display="flex" alignItems="center" gap={2} mt={2} mb={2} className="filter-sort-controls">
        {/* Dropdown for Sorting and Filter */}
        <Select
          value={sortOption}
          onChange={(e) => handleSortChange(e.target.value)}
          displayEmpty
          variant="outlined"
          size="small"
          style={{ minWidth: 150 }}
        >
          <MenuItem value="Default">Show: All Products</MenuItem>
          <MenuItem value="A-Z">Sort by: A - Z</MenuItem>
          <MenuItem value="Z-A">Sort by: Z - A</MenuItem>
        </Select>

        {/* Vertical Sorting Options */}
        <Box display="flex" flexDirection="column" ml={2}>
          <Typography>
            A - Z
          </Typography>
          <Typography>
            Z - A
          </Typography>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Postal Code</TableCell>
              <TableCell>Pickup Day</TableCell>
              <TableCell>Pickup Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {serviceAreas.map((area) => (
              <TableRow key={area.id}>
                <TableCell>{area.name}</TableCell>
                <TableCell><img src={area.image} alt={area.name} width={40} height={40} /></TableCell>
                <TableCell>{area.postalCode}</TableCell>
                <TableCell>{area.pickupDay}</TableCell>
                <TableCell>{area.pickupTime}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1} className="status-cell">
                    <Select
                      value={area.status}
                      size="small"
                      onChange={(e) => handleStatusChange(area.id, e.target.value)}
                      className="status-select"
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                    </Select>
                    <span className={`status-dot ${area.status.toLowerCase()}`}></span>
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton color="primary"><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(area.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <Typography variant="body2">1-10 of 559</Typography>
        <Pagination
          count={10}
          page={page}
          onChange={(e, newPage) => setPage(newPage)}
          color="primary"
          showFirstButton
          showLastButton
        />
        <TextField
          variant="outlined"
          size="small"
          placeholder="Rows per page"
          className="rows-per-page"
        />
        <TextField
          variant="outlined"
          size="small"
          placeholder="Jump to"
          className="jump-to-page"
        />
      </Box>

      <AddServiceAreaModal open={isModalOpen} onClose={handleCloseModal} onSave={handleSaveServiceArea} />
    </Box>
  );
};

export default ServiceAreas;
