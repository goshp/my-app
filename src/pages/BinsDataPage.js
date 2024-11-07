import React, { useState } from 'react';
import {
  Box, Typography, Select, MenuItem, TextField, InputAdornment,
  IconButton, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Pagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BinsHeader from '../components/BinsHeader';
import BinEditModal from '../components/BinEditModal';
import './BinsDataPage.css';

const initialBinsData = [
  {
    id: 1,
    name: "Cafeteria Recycle",
    image: "https://via.placeholder.com/40",
    pickupTime: "12:00 PM",
    location: "Latitude: 43.941050718330... Longitude: -78.895894070...",
    status: "Active",
    collector: "Derick Williams",
    schedule: "Monday, Tuesday, Wednesday",
  },
  {
    id: 2,
    name: "Office Recycle",
    image: "https://via.placeholder.com/40",
    pickupTime: "09:30 AM",
    latitude: "44.941050718330",
    longitude: "-79.895894070",
    status: "Inactive",
    collector: "Shirley Chan",
    schedule: "Tuesday, Thursday",
  },
  {
    id: 3,
    name: "Park Bin",
    image: "https://via.placeholder.com/40",
    pickupTime: "03:15 PM",
    latitude: "42.941050718330",
    longitude: "-77.895894070",
    status: "Active",
    collector: "Vivian Hickman",
    schedule: "Daily",
  },
  {
    id: 4,
    name: "Library Recycle",
    image: "https://via.placeholder.com/40",
    pickupTime: "11:00 AM",
    latitude: "45.941050718330",
    longitude: "-80.895894070",
    status: "Inactive",
    collector: "Andres Hurley",
    schedule: "Monday, Friday",
  },
];

const BinsDataPage = () => {
  const [binsData, setBinsData] = useState(initialBinsData); // State to manage bin items
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [jumpToPage, setJumpToPage] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedBin, setSelectedBin] = useState(null);

  const handleFilterChange = (e) => setFilter(e.target.value);
  const handleStatusChange = (e) => setStatusFilter(e.target.value);
  const handleSearchChange = (e) => setSearchText(e.target.value);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleJumpToPageChange = (event) => {
    setJumpToPage(event.target.value);
  };

  const handleJumpToPageSubmit = () => {
    const targetPage = parseInt(jumpToPage, 10);
    if (!isNaN(targetPage) && targetPage > 0 && targetPage <= 10) {
      setPage(targetPage);
    }
  };

  const handleEditClick = (bin) => {
    setSelectedBin(bin);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedBin(null);
  };

  // Delete bin function
  const handleDeleteClick = (binId) => {
    setBinsData(binsData.filter(bin => bin.id !== binId));
  };

  return (
    <Box className="bins-data-page">
      <BinsHeader />
      
      <Box className="bins-content">
        <Typography variant="h5" className="bins-title">Bins data</Typography>
        <Typography variant="body2" color="textSecondary" className="bins-subtitle">
          See all of your bin items here.
        </Typography>

        <Box className="bins-filters">
          <Box className="left-filters">
            <Select
              value={filter}
              onChange={handleFilterChange}
              displayEmpty
              variant="outlined"
              className="filter-dropdown"
            >
              <MenuItem value="">Show: All products</MenuItem>
              <MenuItem value="Type1">Type1</MenuItem>
              <MenuItem value="Type2">Type2</MenuItem>
            </Select>
            <Box className="sort-options">
              <Typography variant="body2" color="textSecondary">A - Z</Typography>
              <Typography variant="body2" color="textSecondary">Z - A</Typography>
            </Box>
          </Box>

          <Box className="right-filters">
            <TextField
              variant="outlined"
              size="small"
              placeholder="Bin Name"
              className="text-field"
            />
            <Select
              value={statusFilter}
              onChange={handleStatusChange}
              displayEmpty
              variant="outlined"
              className="status-filter"
            >
              <MenuItem value="">Select Status</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search"
              value={searchText}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setSearchText('')} edge="end">
                      <Typography color="primary" fontSize="small">Clear</Typography>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              className="text-field"
            />
          </Box>
        </Box>

        <TableContainer component={Paper} className="table-container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Pickup Time</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>MRF Collector</TableCell>
                <TableCell>Pickup Schedule</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {binsData.map((bin) => (
                <TableRow key={bin.id}>
                  <TableCell>{bin.name}</TableCell>
                  <TableCell>
                    <img src={bin.image} alt={bin.name} width={40} height={40} />
                  </TableCell>
                  <TableCell>{bin.pickupTime}</TableCell>
                  <TableCell>
                    <div className="location-cell">
                      {bin.location || `Latitude: ${bin.latitude}... Longitude: ${bin.longitude}...`}
                    </div>
                  </TableCell>
                  <TableCell>{bin.status}</TableCell>
                  <TableCell>{bin.collector}</TableCell>
                  <TableCell>{bin.schedule}</TableCell>
                  <TableCell>
                    <div className="action-icons">
                      <IconButton color="primary" onClick={() => handleEditClick(bin)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeleteClick(bin.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box className="bins-pagination">
          <Typography variant="body2">1-10 of {binsData.length}</Typography>
          <Pagination
            count={10}
            page={page}
            onChange={(e, newPage) => setPage(newPage)}
            color="primary"
            showFirstButton
            showLastButton
          />
          
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body2">Rows per page:</Typography>
            <Select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              variant="outlined"
              size="small"
              className="rows-per-page"
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
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
      </Box>

      {selectedBin && (
        <BinEditModal
          open={openModal}
          binData={selectedBin}
          onClose={handleModalClose}
          onSave={(updatedBin) => {
            setOpenModal(false);
          }}
        />
      )}
    </Box>
  );
};

export default BinsDataPage;
