import React, { useState } from 'react';
import { Box, Typography, Select, MenuItem, TextField, InputAdornment, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BinsHeader from '../components/BinsHeader';
import './BinsDataPage.css';

const sampleBinsData = [
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
];

const BinsDataPage = () => {
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);

  const handleFilterChange = (e) => setFilter(e.target.value);
  const handleStatusChange = (e) => setStatusFilter(e.target.value);
  const handleSearchChange = (e) => setSearchText(e.target.value);

  return (
    <Box className="bins-data-page">
      <BinsHeader />
      
      <Box className="bins-content">
        <Typography variant="h5" className="bins-title">Bins data</Typography>
        <Typography variant="body2" color="textSecondary" className="bins-subtitle">
          See all of your bin items here.
        </Typography>

        {/* Filters Section */}
        <Box className="bins-filters">
          {/* Left Section: Show dropdown and Sort Options */}
          <Box display="flex" alignItems="center" gap={2}>
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

          {/* Right Section: Bin Name, Status, Search */}
          <Box display="flex" alignItems="center" gap={2}>
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
              className="filter-dropdown"
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

        {/* Bins Table */}
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
              {sampleBinsData.map((bin) => (
                <TableRow key={bin.id}>
                  <TableCell>{bin.name}</TableCell>
                  <TableCell>
                    <img src={bin.image} alt={bin.name} width={40} height={40} />
                  </TableCell>
                  <TableCell>{bin.pickupTime}</TableCell>
                  <TableCell>{bin.location}</TableCell>
                  <TableCell>{bin.status}</TableCell>
                  <TableCell>{bin.collector}</TableCell>
                  <TableCell>{bin.schedule}</TableCell>
                  <TableCell>
                    <IconButton color="primary"><EditIcon /></IconButton>
                    <IconButton color="error"><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Section */}
        <Box className="bins-pagination">
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
      </Box>
    </Box>
  );
};

export default BinsDataPage;
