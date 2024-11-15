import React, { useState } from 'react';
import { Box, Typography, Button, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, Paper, IconButton, TextField } from '@mui/material';
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
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [jumpToPage, setJumpToPage] = useState('');
  const [serviceAreas, setServiceAreas] = useState(initialServiceAreasData);
  const [isModalOpen, setModalOpen] = useState(false);

  const filteredBinsData = serviceAreas;

  const handleSortChange = (sortValue) => {
    setSortOption(sortValue);
    let sortedData;

    if (sortValue === "A-Z") {
      sortedData = [...serviceAreas].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === "Z-A") {
      sortedData = [...serviceAreas].sort((a, b) => b.name.localeCompare(a.name));
    } else {
      sortedData = initialServiceAreasData;
    }

    setServiceAreas(sortedData);
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

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

  const handleStatusChange = (id, newStatus) => {
    setServiceAreas((prev) =>
      prev.map((area) =>
        area.id === id ? { ...area, status: newStatus } : area
      )
    );
  };

  const handleDelete = (id) => {
    setServiceAreas((prev) => prev.filter((area) => area.id !== id));
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleJumpToPageChange = (event) => {
    setJumpToPage(event.target.value);
  };

  const handleJumpToPageSubmit = () => {
    const pageNumber = parseInt(jumpToPage, 10);
    if (pageNumber >= 1 && pageNumber <= Math.ceil(filteredBinsData.length / rowsPerPage)) {
      setPage(pageNumber);
    }
    setJumpToPage('');
  };

  return (
    <Box className="service-areas-page" sx={{ paddingTop: '64px' }}> {/* Adjust this value if needed */}
      <ServAreaHeader />

      <TableContainer component={Paper} className="table-container" sx={{ marginTop: '20px' }}> {/* Adding top margin */}
        <Table>
          <TableHead>
            {/* First Row: Filter, Sort, and Action Buttons */}
            <TableRow>
              <TableCell colSpan={7}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h5" component="h1" className="service-area-title">Service Area</Typography>
                    <Typography variant="body2" color="textSecondary">See all of your Service Area here.</Typography>
                  </Box>
                  <Box display="flex" gap={2} className="action-buttons">
                    <input accept=".xlsx, .xls" type="file" id="upload-excel" style={{ display: 'none' }} />
                    <label htmlFor="upload-excel">
                      <Button
                        variant="outlined"
                        component="span"
                        style={{ color: "#000000", borderColor: "#d3d3d3" }} // Black text and light grey border
                      >
                        Add by Excel
                      </Button>
                    </label>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenModal}
                        className="add-new-button" style={{ backgroundColor: "#90ee90", color: "#ffffff" }}
                    >
                        Add New
                    </Button>
                  </Box>
                </Box>

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
              </TableCell>
            </TableRow>

            {/* Second Row: Table Headers */}
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
                <TableCell style={{ overflow: 'visible', padding: '4px 8px' }}>
                    <Box display="flex" alignItems="center" justifyContent="flex-start">
                        <img src={area.image} alt={area.name} width={40} height={40} />
                    </Box>
                </TableCell>
                <TableCell>{area.postalCode}</TableCell>
                <TableCell>{area.pickupDay}</TableCell>
                <TableCell>{area.pickupTime}</TableCell>
                <TableCell>
                  <Select
                    value={area.status}
                    size="small"
                    onChange={(e) => handleStatusChange(area.id, e.target.value)}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <IconButton color="primary"><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(area.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          {/* Last Row: Pagination */}
          <TableFooter>
            <TableRow>
              <TableCell colSpan={7}>
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ paddingY: '16px' }}> {/* Adjust padding here if needed */}
                  <Typography variant="body2">1-10 of {filteredBinsData.length}</Typography>
                  <Pagination count={10} page={page} onChange={(e, newPage) => setPage(newPage)} color="primary" showFirstButton showLastButton />
                  <Box display="flex" alignItems="center">
                    <Typography variant="body2">Rows per page:</Typography>
                    <Select
                      value={rowsPerPage}
                      onChange={handleRowsPerPageChange}
                      variant="outlined"
                      size="small"
                      style={{ marginLeft: '8px' }}
                    >
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                    </Select>
                    <Typography variant="body2" style={{ marginLeft: '16px' }}>Jump to:</Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={jumpToPage}
                      onChange={handleJumpToPageChange}
                      onBlur={handleJumpToPageSubmit}
                      placeholder="Page"
                      style={{ marginLeft: '8px' }}
                    />
                  </Box>
                </Box>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <AddServiceAreaModal open={isModalOpen} onClose={handleCloseModal} onSave={handleSaveServiceArea} />
    </Box>
  );
};

export default ServiceAreas;
