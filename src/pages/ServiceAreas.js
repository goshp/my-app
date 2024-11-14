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
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page
  const [jumpToPage, setJumpToPage] = useState(''); // Jump to page input
  const [serviceAreas, setServiceAreas] = useState(initialServiceAreasData);
  const [isModalOpen, setModalOpen] = useState(false);

  const filteredBinsData = serviceAreas; // Placeholder for filtered data, can modify this as needed

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

  // Pagination handlers
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1); // Reset to the first page
  };

  const handleJumpToPageChange = (event) => {
    setJumpToPage(event.target.value);
  };

  const handleJumpToPageSubmit = () => {
    const pageNumber = parseInt(jumpToPage, 10);
    if (pageNumber >= 1 && pageNumber <= Math.ceil(filteredBinsData.length / rowsPerPage)) {
      setPage(pageNumber);
    }
    setJumpToPage(''); // Clear the input
  };

  return (
    <Box className="service-areas-page">
      <ServAreaHeader />

      {/* Title and Action Buttons */}
      <Box display="flex" justifyContent="space-between" alignItems="center" className="service-areas-header">
        <Box>
          <Typography variant="h5" component="h1" className="service-area-title">
            Service Area
          </Typography>
          <Typography variant="body2" color="textSecondary" className="service-area-subtitle">
            See all of your Service Area here.
          </Typography>
        </Box>

        <Box display="flex" gap={2} className="action-buttons">
          <input accept=".xlsx, .xls" type="file" id="upload-excel" style={{ display: 'none' }} />
          <label htmlFor="upload-excel">
            <Button variant="outlined" className="excel-button" color="primary" component="span">
              Add by Excel
            </Button>
          </label>

          <Button variant="contained" className="add-new-button" startIcon={<AddIcon />} onClick={handleOpenModal}>
            Add New
          </Button>
        </Box>
      </Box>

      {/* Filter and Sort Controls */}
      <Box display="flex" alignItems="center" gap={2} mt={2} mb={2} className="sort-controls">
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

        <Box display="flex" flexDirection="column" ml={2}>
          <Typography>A - Z</Typography>
          <Typography>Z - A</Typography>
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
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBinsData.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((area) => (
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
      <Box display="flex" justifyContent="space-between" alignItems="center" className="bins-pagination">
        <Typography variant="body2">1-10 of {filteredBinsData.length}</Typography>
        <Pagination count={10} 
        page={page} onChange={(e, newPage) => setPage(newPage)} color="primary" 
        showFirstButton showLastButton />

        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body2">Rows per page:</Typography>
          <Select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            variant="outlined"
            size="small"
            className="rows-per-page"
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body2">Jump to:</Typography>
          <TextField
            variant="outlined"
            size="small"
            value={jumpToPage}
            onChange={handleJumpToPageChange}
            onBlur={handleJumpToPageSubmit}
            className="jump-to-page"
            placeholder="Page"
          />
        </Box>
      </Box>

      <AddServiceAreaModal open={isModalOpen} onClose={handleCloseModal} onSave={handleSaveServiceArea} />
    </Box>
  );
};

export default ServiceAreas;
