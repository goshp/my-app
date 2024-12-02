import React, { useState } from 'react';
import {
  Box, Typography, Select, MenuItem, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField,
  Tooltip, TableFooter,
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

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [jumpToPage, setJumpToPage] = useState("");

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortOption(value);

    let sortedData = [...data];
    if (value === "A-Z") {
      sortedData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (value === "Z-A") {
      sortedData.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      sortedData = initialData;
    }

    setData(sortedData);
  };

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

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleJumpToPageChange = (event) => {
    setJumpToPage(event.target.value);
  };

  const handleJumpToPageSubmit = () => {
    const pageNumber = parseInt(jumpToPage, 10);
    if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= Math.ceil(data.length / rowsPerPage)) {
      setPage(pageNumber);
    }
  };

  return (
    <Box className="item-categories-page" p={8}>
      <ItemCatHeader />
      
      <Box mb={3} />

      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={7}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
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
                {/* Sort Dropdown */}
                <Box display="flex" alignItems="center" gap={2} mt={2}>
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

                  <Box display="flex" flexDirection="column" ml={2}>
                  <Typography>A - Z</Typography>
                  <Typography>Z - A</Typography>
                </Box>
                </Box>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ width: "20%" }}>Category Name</TableCell>
              <TableCell style={{ width: "15%" }}>Category Type</TableCell>
              <TableCell style={{ width: "30%" }}>Description</TableCell>
              <TableCell style={{ width: "15%" }}>Rewards</TableCell>
              <TableCell style={{ width: "10%" }}>Image</TableCell>
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
                  <IconButton onClick={() => handleDeleteItem(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="pagination-row">
              <TableCell colSpan={7}>
                <Box display="flex" justifyContent="space-between" alignItems="center" p={1}>
                  <Typography variant="body2">1-10 of {data.length}</Typography>
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

      <AddItemCatModal open={isModalOpen} onClose={handleCloseModal} onSave={handleSaveNewItem} />
    </Box>
  );
};

export default ItemCategories;
