import React, { useState } from 'react';
import Header from '../components/Header';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, FormControl, Select, MenuItem, TextField, InputAdornment } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import profileIcon from '../assets/avatar3@3x.png';
import './EmployeesPage.css';

const employeesData = [
  { id: 1, firstName: "Jason", lastName: "Charles", username: "jasong", email: "jason@rcycle.co" },
  { id: 2, firstName: "Charlie", lastName: "Mannish", username: "charlie", email: "jasonm@rcycle.co" },
  { id: 3, firstName: "Emerson", lastName: "Septimus", username: "Emerson887", email: "emerson@rcycle.co" },
  { id: 4, firstName: "Terry", lastName: "Bator", username: "Terry776", email: "terryb@rcycle.co" },
  { id: 5, firstName: "Cooper", lastName: "Franci", username: "Cooperopp", email: "cooperf@rcycle.co" },
];

const EmployeesPage = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchText("");
  };

  const filteredEmployees = employeesData.filter(
    (employee) =>
      employee.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
      employee.username.toLowerCase().includes(searchText.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="employees-page">
      <Header activePage="Employees" />

      <div className="employees-header">
        {/* Left Section: Title, Subtitle and Filter */}
        <div className="header-title">
          <h2>Employee Data</h2>
          <p>See all of your employee details here.</p>
          <FormControl variant="outlined" size="small" className="filter-select">
            <Select displayEmpty defaultValue="">
              <MenuItem value="">Show: All employees</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Right Section: Add New Button and Search Bar */}
        <div className="header-controls">
          <Button variant="contained" className="add-new-btn">
            + Add New
          </Button>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search"
            value={searchText}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {searchText && (
                    <IconButton onClick={handleClearSearch} edge="end">
                      <ClearIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
            className="search-field"
          />
        </div>
      </div>

      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell><img src={profileIcon} alt={employee.firstName} className="profile-pic" /></TableCell>
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>{employee.username}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EmployeesPage;
