import React, { useState, useEffect, useCallback } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, FormControl, Select, MenuItem, TextField, InputAdornment, Typography, Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import StatusDropdown from './StatusDropdown';
import badge1 from '../assets/image-910@2x.png';
import badge2 from '../assets/image-911@2x.png';
import './ItemsTable.css';

const ItemsTable = ({ title, subtitle, date, data, onEdit, showFilters }) => {
  const [statuses, setStatuses] = useState(data.map((item) => item.status));
  const [filteredData, setFilteredData] = useState(data);
  const [sortOption, setSortOption] = useState("Default");
  const [brandFilter, setBrandFilter] = useState('');
  const [dimensionFilter, setDimensionFilter] = useState('');
  const [partFilter, setPartFilter] = useState('');
  const [searchText, setSearchText] = useState('');

  const applyFilters = useCallback(() => {
    let filteredItems = [...data];

    // Sort items when selected
    if (sortOption !== "Default") {
      filteredItems.sort((a, b) =>
        sortOption === "A-Z" ? a.item.localeCompare(b.item) : b.item.localeCompare(a.item)
      );
    }

    // Apply Brand Filter
    if (brandFilter) filteredItems = filteredItems.filter((item) => 
      item.brand === brandFilter);

    // Apply Dimension Filter
    if (dimensionFilter) filteredItems = filteredItems.filter((item) => 
      item.dims === dimensionFilter);

    // Apply Part Filter
    if (partFilter) filteredItems = filteredItems.filter((item) =>
      Array.isArray(item.parts) && item.parts.includes(partFilter)
    );

    // Apply Search Filter
    if (searchText) {
      const lowerSearchText = searchText.toLowerCase();
      filteredItems = filteredItems.filter((item) =>
        item.item.toLowerCase().includes(lowerSearchText) ||
        item.brand.toLowerCase().includes(lowerSearchText) ||
        item.dims.toLowerCase().includes(lowerSearchText) ||
        (Array.isArray(item.parts) && item.parts.some(part =>
          typeof part === 'string' && part.toLowerCase().includes(lowerSearchText)
        ))
      );
    }

    setFilteredData(filteredItems);
  }, [data, sortOption, brandFilter, dimensionFilter, partFilter, searchText]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleSortChange = (event) => setSortOption(event.target.value);
  const handleStatusChange = (index, newStatus) => {
    const updatedStatuses = [...statuses];
    updatedStatuses[index] = newStatus;
    setStatuses(updatedStatuses);
  };

  const handleSearchChange = (e) => setSearchText(e.target.value);

  useEffect(() => {
    const delayDebounce = setTimeout(() => applyFilters(), 300);
    return () => clearTimeout(delayDebounce);
  }, [searchText, applyFilters]);

  return (
    <TableContainer component={Paper} className="table-container">
      <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <h2 style={{ margin: 0 }}>{title}</h2>
          <p style={{ fontSize: '0.875em', color: '#888', marginTop: '4px' }}>{subtitle}</p>
          {date && <p style={{ fontSize: '0.875em', color: '#666', marginTop: '4px' }}>{date}</p>}
        </div>

        {showFilters && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
            <Box position="relative" display="flex" alignItems="center">
              <FormControl variant="outlined" size="small" data-testid="sort-select">
                <Select
                  value={sortOption}
                  onChange={handleSortChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Sort options' }}
                >
                  <MenuItem value="Default">Sort by: Default</MenuItem>
                  <MenuItem value="A-Z">A - Z</MenuItem>
                  <MenuItem value="Z-A">Z - A</MenuItem>
                </Select>
              </FormControl>
              
              <Typography
                variant="body2"
                style={{
                  color: '#888',
                  position: 'absolute',
                  right: '-40px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              >
                A - Z <br /> Z - A
              </Typography>
            </Box>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FormControl variant="outlined" size="small">
                <Select
                  value={brandFilter}
                  onChange={(e) => setBrandFilter(e.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Brand filter' }}
                >
                  <MenuItem value="">Select Brand</MenuItem>
                  <MenuItem value="Apple">Apple</MenuItem>
                  <MenuItem value="Starbucks">Starbucks</MenuItem>
                </Select>
              </FormControl>

              <FormControl variant="outlined" size="small">
                <Select
                  value={dimensionFilter}
                  onChange={(e) => setDimensionFilter(e.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Dimensions filter' }}
                >
                  <MenuItem value="">Dimensions</MenuItem>
                  <MenuItem value="12 oz PET">12 oz PET</MenuItem>
                </Select>
              </FormControl>

              <FormControl variant="outlined" size="small">
                <Select
                  value={partFilter}
                  onChange={(e) => setPartFilter(e.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Parts filter' }}
                >
                  <MenuItem value="">Parts</MenuItem>
                  <MenuItem value="Label">Label</MenuItem>
                  <MenuItem value="Tag">Tag</MenuItem>
                </Select>
              </FormControl>

              <TextField
                variant="outlined"
                size="small"
                placeholder="Search"
                value={searchText}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
        )}
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Item Category</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Dims</TableCell>
            <TableCell>Parts</TableCell>
            <TableCell>Rewards</TableCell>
            <TableCell>Date/Time</TableCell>
            <TableCell>Location</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.length ? (
            filteredData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <img src={row.image} alt={row.item} style={{ width: 40, height: 40 }} />
                </TableCell>
                <TableCell>{row.item}</TableCell>
                <TableCell>
                  <StatusDropdown
                    status={statuses[index]}
                    setStatus={(newStatus) => handleStatusChange(index, newStatus)}
                  />
                </TableCell>
                <TableCell>{row.brand}</TableCell>
                <TableCell>{row.dims}</TableCell>
                <TableCell>{row.parts}</TableCell>
                <TableCell>
                  <div className="rewards-container">
                    <div className="reward-item">
                      <span className="reward-number">1</span>
                      <img src={badge1} alt="Silver Badge" className="reward-icon" />
                    </div>
                    <div className="reward-item">
                      <span className="reward-number">10</span>
                      <img src={badge2} alt="Green Badge" className="reward-icon" />
                    </div>
                  </div>
                </TableCell>

                <TableCell>{row.date}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>
                  <IconButton onClick={() => onEdit(row)} data-testid="edit-button">
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={10} align="center">
                No items match your filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemsTable;
