import React from 'react';
import { Select, MenuItem, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './Filters.css';

const Filters = ({ brand, setBrand, dimension, setDimension, part, setPart, searchTerm, setSearchTerm }) => (
  <div className="filters">
    <Select
      value={brand}
      onChange={(e) => setBrand(e.target.value)}
      className="filter-select"
      displayEmpty
    >
      <MenuItem value="">Select brand</MenuItem>
      <MenuItem value="Apple">Apple</MenuItem>
      <MenuItem value="Samsung">Samsung</MenuItem>
    </Select>

    <Select
      value={dimension}
      onChange={(e) => setDimension(e.target.value)}
      className="filter-select"
      displayEmpty
    >
      <MenuItem value="">Dimensions</MenuItem>
      <MenuItem value="Small">Small</MenuItem>
      <MenuItem value="Large">Large</MenuItem>
    </Select>

    <Select
      value={part}
      onChange={(e) => setPart(e.target.value)}
      className="filter-select"
      displayEmpty
    >
      <MenuItem value="">Parts</MenuItem>
      <MenuItem value="Label">Label, Tag</MenuItem>
      <MenuItem value="Tag">Tag</MenuItem>
    </Select>

    <TextField
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search"
      className="search-bar"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon className="search-icon" />
          </InputAdornment>
        ),
      }}
      variant="outlined"
    />
  </div>
);

export default Filters;
