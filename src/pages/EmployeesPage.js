import React, { useState } from 'react';
import Header from '../components/Header';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Button, FormControl, Select, MenuItem, TextField, InputAdornment,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import profileIcon from '../assets/avatar3@3x.png';
import AddEmployeeModal from '../components/AddEmployeeModal';
import './EmployeesPage.css';

const initialEmployeesData = [
  { id: 1, firstName: "Jason", lastName: "Charles", username: "jasong", email: "jason@rcycle.co" },
  { id: 2, firstName: "Charlie", lastName: "Mannish", username: "charlie", email: "jasonm@rcycle.co" },
  { id: 3, firstName: "Emerson", lastName: "Septimus", username: "Emerson887", email: "emerson@rcycle.co" },
  { id: 4, firstName: "Terry", lastName: "Bator", username: "Terry776", email: "terryb@rcycle.co" },
  { id: 5, firstName: "Cooper", lastName: "Franci", username: "Cooperopp", email: "cooperf@rcycle.co" },
];

const EmployeesPage = () => {
  const [employees, setEmployees] = useState(initialEmployeesData);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSortChange = (event) => {
    const order = event.target.value;
    setSortOrder(order);
    sortEmployees(order);
  };

  const sortEmployees = (order) => {
    const sortedEmployees = [...employees].sort((a, b) => {
      const key = 'firstName';
      if (order === "A-Z") {
        return a[key].localeCompare(b[key]);
      } else if (order === "Z-A") {
        return b[key].localeCompare(a[key]);
      }
      return 0;
    });
    setEmployees(sortedEmployees);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchText("");
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAddEmployee = (newEmployee) => {
    setEmployees((prevEmployees) => [
      ...prevEmployees,
      {
        id: prevEmployees.length + 1,
        ...newEmployee,
      },
    ]);
    handleCloseModal();
  };

  const handleDeleteEmployee = (id) => {
    setEmployees((prevEmployees) => prevEmployees.filter(employee => employee.id !== id));
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
      employee.username.toLowerCase().includes(searchText.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="employees-page">
      <Header activePage="Employees" />

      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            {/* First row with header controls inside the table */}
            <TableRow>
              <TableCell colSpan={6}>
                <div className="employees-header">
                  <div className="header-title">
                    <h2>Employee Data</h2>
                    <p>See all of your employee details here.</p>
                    <FormControl variant="outlined" size="small" className="filter-select">
                      <Select displayEmpty value={sortOrder} onChange={handleSortChange}>
                        <MenuItem value="">Show: Default Order</MenuItem>
                        <MenuItem value="A-Z">A - Z</MenuItem>
                        <MenuItem value="Z-A">Z - A</MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                  <div className="header-controls" >
                    <Button variant="contained" className="add-new-btn" onClick={handleOpenModal}>
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
              </TableCell>
            </TableRow>

            {/* Second row with column titles */}
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell></TableCell>
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
                  <IconButton onClick={() => handleDeleteEmployee(employee.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddEmployeeModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddEmployee}
      />
    </div>
  );
};

export default EmployeesPage;
