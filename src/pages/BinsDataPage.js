import React, { useState } from 'react';
import {
  Box, Typography, Select, MenuItem, TextField, InputAdornment,
  IconButton, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Pagination, TableFooter
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BinsHeader from '../components/BinsHeader';
import BinEditModal from '../components/BinEditModal';
import './BinsDataPage.css';

import CoffeeImage from '../assets/Coffe.jpg';
import SuppliesImage from '../assets/supplies-stationery.png';

const initialBinsData = [
  {
    id: 1,
    name: "Cafeteria Recycle",
    image: CoffeeImage,
    pickupTime: "10:30 AM",
    location: "Latitude: 43.941050718330... Longitude: -78.895894070...",
    status: "Active",
    collector: "Derick Williams",
    schedule: "Monday, Tuesday, Wednesday",
  },
  {
    id: 2,
    name: "Office Recycling",
    image: SuppliesImage,
    pickupTime: "10:30 AM",
    location: "Latitude: 43.941050718330... Longitude: -78.895894070...",
    status: "Active",
    collector: "William Harris",
    schedule: "Monday, Tuesday, Wednesday",
  },
  {
    id: 3,
    name: "Cafeteria Recycle",
    image: CoffeeImage,
    pickupTime: "10:30 AM",
    location: "Latitude: 43.741050718330... Longitude: -78.895894070...",
    status: "Active",
    collector: "Trooswell Davis",
    schedule: "Monday, Tuesday, Wednesday",
  },
  // Add more bin data as needed
];

const BinsDataPage = () => {
  const [binsData, setBinsData] = useState(initialBinsData);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchText, setSearchText] = useState('');
  const [binNameFilter, setBinNameFilter] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [jumpToPage, setJumpToPage] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedBin, setSelectedBin] = useState(null);

  const handleFilterChange = (e) => {
    const sortOption = e.target.value;
    setFilter(sortOption);

    let sortedData = [...binsData];
    if (sortOption === "A-Z") {
      sortedData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "Z-A") {
      sortedData.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      sortedData = initialBinsData;
    }

    setBinsData(sortedData);
  };

  const handleStatusFilterChange = (e) => setStatusFilter(e.target.value);
  const handleSearchChange = (e) => setSearchText(e.target.value);
  const handleBinNameChange = (e) => setBinNameFilter(e.target.value);

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

  const handleStatusChange = (binId, newStatus) => {
    setBinsData((prevData) =>
      prevData.map((bin) =>
        bin.id === binId ? { ...bin, status: newStatus } : bin
      )
    );
  };

  const handleDeleteClick = (binId) => {
    setBinsData(binsData.filter(bin => bin.id !== binId));
  };

  const filteredBinsData = binsData.filter((bin) => {
    const matchesBinName = bin.name.toLowerCase().includes(binNameFilter.toLowerCase());
    const matchesStatus = statusFilter ? bin.status === statusFilter : true;
    const matchesGeneralSearch = searchText.toLowerCase();

    const matchesSearch = (
      bin.name.toLowerCase().includes(matchesGeneralSearch) ||
      bin.status.toLowerCase().includes(matchesGeneralSearch) ||
      bin.collector.toLowerCase().includes(matchesGeneralSearch) ||
      bin.schedule.toLowerCase().includes(matchesGeneralSearch) ||
      (bin.location ? bin.location.toLowerCase().includes(matchesGeneralSearch) : false)
    );

    return matchesBinName && matchesStatus && matchesSearch;
  });

  return (
    <Box className="bins-data-page">
      <BinsHeader />

      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            {/* First Row: Filter, Sort, and Search Controls */}
            <TableRow className="first-row">
              <TableCell colSpan={8}>
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
                      <MenuItem value="A-Z">A - Z</MenuItem>
                      <MenuItem value="Z-A">Z - A</MenuItem>
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
                      value={binNameFilter}
                      onChange={handleBinNameChange}
                    />

                    <Box display="flex" alignItems="center" className="status-filter-container">
                      <Select
                        value={statusFilter}
                        onChange={handleStatusFilterChange}
                        displayEmpty
                        variant="outlined"
                        className="status-filter"
                      >
                        <MenuItem value="">Select Status</MenuItem>
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                      </Select>
                    </Box>

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
              </TableCell>
            </TableRow>

            {/* Second Row: Column Headers */}
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Pickup Time</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>MRF Collector</TableCell>
              <TableCell>Pickup Schedule</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredBinsData.map((bin) => (
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
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Select
                      value={bin.status}
                      onChange={(e) => handleStatusChange(bin.id, e.target.value)}
                      displayEmpty
                      variant="outlined"
                      size="small"
                      style={{ minWidth: 100 }}
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                    </Select>
                    <span className={`status-dot ${bin.status === 'Active' ? 'active-dot' : 'inactive-dot'}`}></span>
                  </Box>
                </TableCell>
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

          {/* Last Row: Pagination */}
          <TableFooter>
            <TableRow>
              <TableCell colSpan={8}>
                <Box className="bins-pagination">
                  <Typography variant="body2">1-10 of {filteredBinsData.length}</Typography>
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
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={10}>10</MenuItem>
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
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

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
