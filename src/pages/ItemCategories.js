import React, { useState } from 'react';
import {
  Box, Typography, Select, MenuItem, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField,
  Tooltip
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import badgeIcon1 from '../assets/image-910@2x.png';
import badgeIcon2 from '../assets/image-911@2x.png';
import ItemCatHeader from '../components/ItemCatHeader';
import AddItemCatModal from '../components/AddItemCatModal';
import plasticBottlesImage from '../assets/avatar6@3x.png';
import fruitContainersImage from '../assets/avatar10@3x.png';
import './ItemCategories.css';

const initialData = [
  {
    id: 1,
    name: "Plastic Bottles",
    type: "Recyclable",
    description: "Spiral wound containers are included in a provincial recycling program...",
    rewards: { points: 10, tokens: 1 },
    image: plasticBottlesImage,
    acceptance: "Inactive"
  },
  {
    id: 2,
    name: "Plastic Fruit & Vegetable Containers",
    type: "Recyclable",
    description: "Using toiletry bottles when you travel allows you to bring all your favourite...",
    rewards: { points: 10, tokens: 1 },
    image: fruitContainersImage,
    acceptance: "Active"
  },
];

const ItemCategories = () => {
  const [sortOption, setSortOption] = useState("Default");
  const [page, setPage] = useState(1);
  const [data, setData] = useState(initialData);
  const [isModalOpen, setModalOpen] = useState(false);

  // New State Variables
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [jumpToPage, setJumpToPage] = useState("");
  
  const filteredBinsData = data;

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleSortChange = (event) => setSortOption(event.target.value);

  const handleSaveNewItem = (newItem) => {
    setData(prevData => [
      ...prevData,
      {
        id: prevData.length + 1,
        name: newItem.itemCategory,
        type: newItem.categoryType,
        description: "New item description...",
        rewards: { points: 10, tokens: 1 },
        image: "https://via.placeholder.com/40",
        acceptance: newItem.activeStatus
      }
    ]);
    handleCloseModal();
  };

  const handleDeleteItem = (id) => {
    setData(prevData => prevData.filter(item => item.id !== id));
  };

  // New Handlers for Pagination Controls
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);  // Reset to first page when rows per page changes
  };

  const handleJumpToPageChange = (event) => {
    setJumpToPage(event.target.value);
  };

  const handleJumpToPageSubmit = () => {
    const pageNumber = parseInt(jumpToPage, 10);
    if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= Math.ceil(filteredBinsData.length / rowsPerPage)) {
      setPage(pageNumber);
    }
  };

  return (
    <Box className="item-categories-page" p={3}>
      <ItemCatHeader />

      {/* Main Content Container */}
      <Box className="content-container">
        {/* Header Section Inside Container */}
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
          style={{ minHeight: '50px' }}
        >
          <Box flex="1 1 auto" minWidth="200px" mb={1}>
            <Typography variant="h5" component="h1" className="title">Item Categories</Typography>
            <Typography variant="body2" color="textSecondary">See all of your retail deals here.</Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="success"
              startIcon={<AddIcon />}
              onClick={handleOpenModal}
              className="add-new-button"
            >
              Add New
            </Button>
          </Box>
        </Box>

        {/* Sorting Dropdown */}
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Select
            value={sortOption}
            onChange={handleSortChange}
            displayEmpty
            variant="outlined"
            size="small"
            className="sort-select"
          >
            <MenuItem value="Default">Sort by: Default</MenuItem>
            <MenuItem value="A-Z">A - Z</MenuItem>
            <MenuItem value="Z-A">Z - A</MenuItem>
          </Select>
        </Box>

        {/* Table Section */}
        <TableContainer component={Paper} className="table-container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "20%" }}>Category Name</TableCell>
                <TableCell style={{ width: "15%" }}>Category Type</TableCell>
                <TableCell style={{ width: "30%" }}>Description</TableCell>
                <TableCell style={{ width: "15%" }}>Rewards</TableCell>
                <TableCell style={{ width: "10%" }} className="image-cell">Image</TableCell>
                <TableCell style={{ width: "10%" }}>Acceptance</TableCell>
                <TableCell style={{ width: "10%" }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell className="wrap-text description-cell">
                    <Tooltip title={item.description} arrow>
                      <span>{item.description}</span>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" gap={1} alignItems="center">
                      <Box className="reward-badge-container">
                        <span className="reward-number">{item.rewards.tokens}</span>
                        <img src={badgeIcon1} alt="Token Badge" className="reward-badge" />
                      </Box>
                      <Box className="reward-badge-container">
                        <span className="reward-number">{item.rewards.points}</span>
                        <img src={badgeIcon2} alt="Point Badge" className="reward-badge" />
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell className="image-cell">
                    <img src={item.image} alt={item.name} />
                  </TableCell>
                  <TableCell>{item.acceptance}</TableCell>
                  <TableCell>
                    <IconButton color="error" onClick={() => handleDeleteItem(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Section */}
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
      </Box>

      <AddItemCatModal open={isModalOpen} onClose={handleCloseModal} onSave={handleSaveNewItem} />
    </Box>
  );
};

export default ItemCategories;
